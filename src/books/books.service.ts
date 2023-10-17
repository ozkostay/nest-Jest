import { Injectable } from '@nestjs/common';
import { Model, Connection, HydratedDocument, QueryWithHelpers } from 'mongoose';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Book, BookDocument } from './schemas/books.schema';
import { CreateBooksDto } from './interfaces/dto/create-books';
import { UpdateBooksDto } from './interfaces/dto/update-books';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private BookModel: Model<BookDocument>,
    @InjectConnection() private connection: Connection,
  ) {}

  public getAll(): Promise<BookDocument[]> {
    return this.BookModel.find().exec();
  }

  public create(data: CreateBooksDto): Promise<BookDocument> {
    const book = new this.BookModel(data);
    return book.save();
  }

  public delete( id: string): Promise<BookDocument>{
    return this.BookModel.findOneAndRemove({ _id: id });
  }

  public update(id: string, data: UpdateBooksDto): Promise<BookDocument> {
    return this.BookModel.findOneAndUpdate(
        { _id: id },
        data,
    );
}
}
