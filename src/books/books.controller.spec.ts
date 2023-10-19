import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { getModelToken } from '@nestjs/mongoose';
// import { ModuleRef } from '@nestjs/core';
import { CreateBooksDto } from './interfaces/dto/create-books';

describe('BooksController', () => {
  let controller: BooksController;
  let service: BooksService;

  const createBookDto: CreateBooksDto = {
    title: 'Book1',
    description: 'Descr 1',
  };

  const mockBook = {
    title: 'Book1',
    description: 'Descr 1',
    _id: '1',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        {
          provide: BooksService,
          useValue: {
            getAll: jest.fn().mockResolvedValue([
              {
                title: 'Book1',
                description: 'Descr 1',
              },
              {
                title: 'Book2',
                description: 'Descr 2',
              },
              {
                title: 'Book3',
                description: 'Descr 3',
              },
            ]),

            create: jest.fn().mockResolvedValue(createBookDto),
          },
        },
      ],
    }).compile();

    controller = module.get<BooksController>(BooksController);
    service = module.get<BooksService>(BooksService);
    // console.log('==== 111111111111111111 ===');

  });

  describe('getAll()', () => {
    it('should return an array of books', async () => {
      // const aaa = controller.getAll();
      // console.log('aaa', aaa);
      // expect(controller.getAll()).toEqual([
        
      expect(controller.getAll()).resolves.toEqual([
        {
          title: 'Book1',
          description: 'Descr 1',
        },
        {
          title: 'Book2',
          description: 'Descr 2',
        },
        {
          title: 'Book3',
          description: 'Descr 3',
        },
      ]);
      
      expect(service.getAll).toHaveBeenCalled();
    });
  });




})
