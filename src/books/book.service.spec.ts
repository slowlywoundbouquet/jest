import { Test } from '@nestjs/testing';
import { BookService } from './book.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from '../schemas/book.schema';
import { INestApplication } from '@nestjs/common';
import { BookModule } from './book.module';
import * as request from 'supertest';

describe('Book', () => {
  let app: INestApplication;
  let bookService = { findAll: () => ['test'], create: f => f, findOne: id => id, update: f => f, delete: id=>id };
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        BookModule,
        MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
      ],
    }).overrideProvider(BookService)
      .useValue(bookService)
      .compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });
  it('/GET books', () => {
    return request(app.getHttpServer())
      .get('/books')
      .expect(200)
      .expect(
        bookService.findAll(),
      );
  });
  it('/POST books', (f) => {
    return request(app.getHttpServer())
      .get('books')
      .expect(200)
      .expect(
        bookService.create(f),
      );
  });
  it('/PUT books', (f) => {
    return request(app.getHttpServer())
      .get('books')
      .expect(200)
      .expect(
        bookService.update(f),
      );
  });
  it('/GET books', (id) => {
    return request(app.getHttpServer())
      .get('books/:id')
      .expect(200)
      .expect(
        bookService.findOne(id),
      );
  });
  it('/delete books', (id) => {
    return request(app.getHttpServer())
      .get('/books')
      .expect(200)
      .expect(
        bookService.delete(id),
      );
  });
  afterAll(async () => {
    await app.close();
  });

});
