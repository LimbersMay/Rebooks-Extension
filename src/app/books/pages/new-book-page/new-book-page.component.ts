import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BooksService} from "../../services/books.service";
import {switchMap} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";
import {Book} from "../../interfaces/book.interface";

@Component({
  selector: 'app-new-book-page',
  templateUrl: './new-book-page.component.html',
  styles: ``
})
export class NewBookPageComponent implements OnInit {

  public bookForm = new FormGroup({
    id: new FormControl<string>(''),
    title: new FormControl<string>(''),
    author: new FormControl<string>(''),
    totalPages: new FormControl<number>(0),
    currentPage: new FormControl<number>(0),
    imageUrl: new FormControl<string>(''),
  });

  public constructor(
    private router: Router,
    private booksService: BooksService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    if (!this.router.url.includes('edit')) return;

    this.activatedRoute.params
      .pipe(
        switchMap(({id}) => this.booksService.getBookById(id))
      ).subscribe(book => {
      if (!book) return this.router.navigateByUrl('/');

      return this.bookForm.reset(book);
    })
  }

  get currentBook(): Book {
    return this.bookForm.value as Book;
  }

  onSubmit() {
    if (this.currentBook.id) {
      this.booksService.updateBook(this.currentBook)
        .subscribe(() => {
          return this.router.navigateByUrl('/');
        });

      return;
    }

    return this.booksService.addBook(this.currentBook)
      .subscribe(() => this.router.navigateByUrl('/'));
  }
}
