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
  let booksArray: any;

  beforeEach(async () => {
    
    booksArray = [
      {
        _id: '1',
        title: 'Book1',
        description: 'Description on Book1',
      },
      {
        _id: '2',
        title: 'Book2',
        description: 'Description on Book2',
      },
    ];

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
  it('should create update a book', async () => {
    const newData = {
      title: 'Book1',
      description: 'Description on Book 11111111111',
    };
    const updateBook = jest.fn((data) => service.create(data));
    console.log(updateBook( newData ));
    expect(updateBook).toBeCalled();
  });

  // ============================================
  it('should delete a book', async () => {
    const deleteBook = jest.fn((id) => service.delete(id));
    console.log(deleteBook('1'));
    expect(deleteBook).toBeCalled();
  });

  // ============================================
  it('should update a book', async () => {
    const data = {
      title: 'Book1',
      description: 'Description on Book 11111111111',
    };
    const updateBook = jest.fn((id, data) => service.update(id, data));
    console.log(updateBook('1', data));
    expect(updateBook).toBeCalled();
  });

});
