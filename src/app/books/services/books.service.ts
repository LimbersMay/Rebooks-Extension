import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {Book} from "../interfaces/book.interface";

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor() {}

  public getBooks(): Observable<Book[]> {
    const books = JSON.parse(localStorage.getItem('books') || '[]');
    return of(books);
  }

  public getBookById(id: string): Observable<Book> {
    const books = JSON.parse(localStorage.getItem('books') || '[]');
    return of(books.find((book: Book) => book.id === id));
  }

  public updateBook(book: Book): Observable<boolean> {
    const books = JSON.parse(localStorage.getItem('books') || '[]');
    const bookIndex = books.findIndex((b: Book) => b.id === book.id);
    books[bookIndex] = book;
    localStorage.setItem('books', JSON.stringify(books));

    return of(true);
  }

  public addBook(book: Book): Observable<boolean> {
    const books = JSON.parse(localStorage.getItem('books') || '[]');
    book.id = Math.random().toString(36);
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
    return of(true);
  }

  public deleteBook(id: string): Observable<boolean> {
    const books = JSON.parse(localStorage.getItem('books') || '[]');
    const booksWithoutDeleted = books.filter((book: Book) => book.id !== id);
    localStorage.setItem('books', JSON.stringify(booksWithoutDeleted));
    return of(true);
  }

  public searchBooks(title: string): Observable<Book[]> {
    const books = JSON.parse(localStorage.getItem('books') || '[]');
    return of(books.filter((book: Book) => book.title.toLowerCase().includes(title.toLowerCase())));
  }

  public addBooks(books: Book[]): Observable<boolean> {
    localStorage.setItem('books', JSON.stringify(books));
    return of(true);
  }
}
