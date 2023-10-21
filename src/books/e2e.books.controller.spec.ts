import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { getModelToken } from '@nestjs/mongoose';
import { CreateBooksDto } from './interfaces/dto/create-books';
import { INestApplication } from '@nestjs/common';
import { BooksModule } from './books.module';
// import { Book, BookDocument } from './schemas/books.schema';

describe('BooksController', () => {
  let app: INestApplication;
  let booksService: {
    getAll: () => [
      { title: 'Book1', description: 'Decriptiom book 1'},
      { title: 'Book2', description: 'Decriptiom book 2'}
    ],
    create: () => { title: 'Book1', description: 'Decriptiom book 1'},
    delete: () => { title: 'Book1', description: 'Decriptiom book 1'},
    update: () => { title: 'Book1', description: 'Decriptiom book 111'},
  }
  
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [BooksModule],
      providers: [BooksService],
    })
      .overrideProvider(BooksService)
      .useValue(booksService)
      .compile();

      app = moduleRef.createNestApplication();
    await app.init()
  });

  describe('getAll()', () => {
    it(`/GET books`, () => {
      return request(app.getHttpServer())
        .get('/books')
        .expect(200)
        .expect({
          data: booksService.getAll(),
        });
    });

    it(`/Post books`, () => {
      return request(app.getHttpServer())
        .post('/books')
        .expect(200)
        .expect({
          data: booksService.getAll(),
        });
    });

  });

  afterAll(async () => {
    // await app.close();
  });
})
