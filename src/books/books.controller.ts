import { Controller } from '@nestjs/common';
import { Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { BooksService } from './books.service';
import { BookDocument } from './schemas/books.schema';
import { CreateBooksDto } from './interfaces/dto/create-books';
import { UpdateBooksDto } from './interfaces/dto/update-books';
import { IParamId } from './interfaces/param-id';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}
  @Get()
  public getAll(): Promise<BookDocument []> {
    return this.booksService.getAll();
  }

  @Post()
  public create(@Body() body: CreateBooksDto): Promise<BookDocument> {
      return this.booksService.create(body);
  }

  @Delete(':id')
  public delete(@Param() { id }: IParamId): Promise<BookDocument> {
    return this.booksService.delete(id);
  }

  @Put(':id')
    public update(
        @Param() { id }: IParamId,
        @Body() body: UpdateBooksDto ):  Promise<BookDocument>  {
        return this.booksService.update(id, body);
    }

}
