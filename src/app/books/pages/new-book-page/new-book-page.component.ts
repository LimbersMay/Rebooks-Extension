import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BooksService} from "../../services/books.service";
import {switchMap} from "rxjs";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Book} from "../../interfaces/book.interface";

@Component({
  selector: 'app-new-book-page',
  templateUrl: './new-book-page.component.html',
  styles: ``
})
export class NewBookPageComponent implements OnInit {

  public bookForm = this.fb.group({
    id: [''],
    title: ['', Validators.required],
    author: ['', Validators.required],
    totalPages: [0, Validators.min(0)],
    currentPage: [0, Validators.min(0)],
    imageUrl: ['https://static.vecteezy.com/system/resources/thumbnails/022/014/063/small_2x/missing-picture-page-for-website-design-or-mobile-app-design-no-image-available-icon-vector.jpg'],
  }, {
    validators: [
      (formGroup: FormGroup) => {
        const totalPages = formGroup.get('totalPages') as FormControl;
        const currentPage = formGroup.get('currentPage') as FormControl;

        if (totalPages.value < currentPage.value) {
          currentPage.setErrors({invalidPage: true});
          return {invalidPage: true};
        }

        return null
      }
    ]
  });

  public autoFocus: boolean = false;

  public constructor(
    private router: Router,
    private booksService: BooksService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    if (!this.router.url.includes('edit')) {
      this.autoFocus = true;
      return;
    }

    this.activatedRoute.params
      .pipe(
        switchMap(({id}) => this.booksService.getBookById(id))
      ).subscribe(book => {
      if (!book) return this.router.navigateByUrl('/');

      return this.bookForm.reset(book);
    })
  }

  isValidField(field: keyof Book): boolean | null {
    return this.bookForm.controls[field].errors
      && this.bookForm.controls[field].touched;
  }

  getFieldError(field: keyof Book): string | null {
    if (!this.bookForm.controls[field] ) return null;

    const errors = this.bookForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'This field is required'
        case 'min':
          // 0 or greater number
          return `Minimum ${errors['min'].min} or greater`
        case 'max':
          return `Maximum ${errors['max'].max} or less`
        case 'invalidPage':
          return `Current page can't be greater than total pages`
      }
    }

    return null;
  }

  get currentBook(): Book {
    return this.bookForm.value as Book;
  }

  onSubmit() {

    if (this.bookForm.invalid) {
      this.bookForm.markAllAsTouched();
      return
    }

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
