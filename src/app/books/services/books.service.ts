import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Book } from '../interfaces/book.interface';
import browser from 'webextension-polyfill';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor() {}

  public getBooks(): Observable<Book[]> {
    return from(browser.storage.sync.get('books').then(result => JSON.parse(result['books'] || '[]')));
  }

  public getBookById(id: string): Observable<Book> {
    return from(browser.storage.sync.get('books').then(result => {
      const books = JSON.parse(result['books'] || '[]');
      return books.find((book: Book) => book.id === id);
    }));
  }

  public updateBook(book: Book): Observable<boolean> {
    return from(browser.storage.sync.get('books').then(result => {
      const books = JSON.parse(result['books'] || '[]');
      const bookIndex = books.findIndex((b: Book) => b.id === book.id);
      books[bookIndex] = book;
      return browser.storage.sync.set({ books: JSON.stringify(books) }).then(() => true);
    }));
  }

  public addBook(book: Book): Observable<boolean> {
    return from(browser.storage.sync.get('books').then(result => {
      const books = JSON.parse(result['books'] || '[]');
      book.id = Math.random().toString(36);
      books.push(book);
      return browser.storage.sync.set({ books: JSON.stringify(books) }).then(() => true);
    }));
  }

  public deleteBook(id: string): Observable<boolean> {
    return from(browser.storage.sync.get('books').then(result => {
      const books = JSON.parse(result['books'] || '[]');
      const booksWithoutDeleted = books.filter((book: Book) => book.id !== id);
      return browser.storage.sync.set({ books: JSON.stringify(booksWithoutDeleted) }).then(() => true);
    }));
  }

  public searchBooks(title: string): Observable<Book[]> {
    return from(browser.storage.sync.get('books').then(result => {
      const books = JSON.parse(result['books'] || '[]');
      return books.filter((book: Book) => book.title.toLowerCase().includes(title.toLowerCase()));
    }));
  }

  public addBooks(books: Book[]): Observable<boolean> {
    return from(browser.storage.sync.set({ books: JSON.stringify(books) }).then(() => true));
  }
}
