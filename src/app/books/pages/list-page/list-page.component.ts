import {Component, OnInit} from '@angular/core';
import {Book} from "../../interfaces/book.interface";
import {BooksService} from "../../services/books.service";
import {FileUploadEvent} from "primeng/fileupload";
import {ExcelService} from "../../services/excel.service";
import {delay} from "rxjs";

@Component({
  selector: 'books-list-page',
  templateUrl: './list-page.component.html',
  styles: ``
})
export class ListPageComponent implements OnInit {

  public books: Book[] = []
  public isSearching = false;
  public isLoading = false;

  constructor(
    private booksService: BooksService,
    private excelService: ExcelService
  ) {}

  ngOnInit() {
    this.booksService.getBooks().subscribe(books => {
      this.books = books;
    });
  }

  deleteBook(bookId: string) {
    this.booksService.deleteBook(bookId).subscribe(() => {
      this.books = this.books.filter(book => book.id !== bookId);
    })
  }

  toggleSearch() {
    this.isSearching = !this.isSearching;
  }

  searchBooks(title: string) {
    this.booksService.searchBooks(title).subscribe(books => {
      this.books = books;
    });
  }

  async uploadFile(event: FileUploadEvent): Promise<void> {
    const file = event.files[0];
    this.isLoading = true;

    const arrayBuffer = await file.arrayBuffer();
    this.books = this.excelService.getExcelData(arrayBuffer);

    this.booksService.addBooks(this.books)
      .pipe(
        delay(500)
      ).subscribe(() => {
      this.isLoading = false;
    });
  }

  exportToExcel() {
    this.excelService.generateExcel(this.books, 'books');
  }
}
