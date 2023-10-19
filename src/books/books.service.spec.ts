import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { Model } from 'mongoose';
import { Book } from './schemas/books.schema';
import { getModelToken } from '@nestjs/mongoose';

const mockBook = {
  title: 'Book1',
  description: 'Description on Book1',
};



describe('BooksService', () => {
  let service: BooksService;
  let model: Model<Book>;

  const booksArray = [
    {
      title: 'Book1',
      description: 'Description on Book1',
    },
    {
      title: 'Book2',
      description: 'Description on Book2',
    },
  ];

  // ,
  //       {
  //         provide: getModelToken('Book'),
  //         useValue: {
  //           new: jest.fn().mockResolvedValue(mockBook),
  //           constructor: jest.fn().mockResolvedValue(mockBook),
  //           find: jest.fn(),
  //           create: jest.fn(),
  //           exec: jest.fn(),
  //         },
  //       },

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BooksService,
            {
              provide: getModelToken('Book'),
              useValue: {
                          constructor: jest.fn().mockResolvedValue(mockBook),
                          find: jest.fn(),
                          create: jest.fn(),
                          findOneAndRemove: jest.fn(),
                          findOneAndUpdate: jest.fn(),
                          exec: jest.fn(),
                        },
            }
          ]}).compile();

    service = module.get<BooksService>(BooksService);
    model = module.get<Model<Book>>(getModelToken('Book'));
  });

  // ============================================
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  
  // ============================================
  it('should return all Books', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(booksArray),
    } as any);
    const books = await service.getAll();
    expect(books).toEqual(booksArray);
  });

  // ============================================
  it('should insert a new book', async () => {
    jest.spyOn(model, 'create').mockImplementationOnce(() =>
      Promise.resolve({
        title: 'Book1',
        description: 'Description on Book1',
      } as any),
    );
    const newBook = await service.create({
      title: 'Book1',
      description: 'Description on Book1',
    });
    expect(newBook).toEqual(mockBook);
  });

  // ============================================
  it('should delete a book', async () => {
    // jest.spyOn(model, 'findOneAndRemove').mockImplementationOnce(() =>
    //   Promise.resolve({
    //     title: 'Book1',
    //     description: 'Description on Book1',
    //   } as any),
    // );
    // const deleteBook = await service.delete('1');
    const obj1 = {title: 'Book1', description: 'Description on Book1'};
    const obj2 = {title: 'Book1', description: 'Description on Book11'};
    // expect(deleteBook).toEqual(mockBook);
    expect(obj1).toEqual(obj2);
  });

  // ============================================

  // ============================================


});
