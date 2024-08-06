import { Component } from '@angular/core';
import {ExcelService} from "../../services/excel-service.service";
import {BooksService} from "../../services/books.service";
import {FileUploadEvent, UploadEvent} from "primeng/fileupload";


@Component({
  selector: 'app-config-page',
  templateUrl: './config-page.component.html',
  styles: ``
})
export class ConfigPageComponent {

  data = [
    { Name: 'John Doe', Age: 30, City: 'New York' },
    { Name: 'Jane Smith', Age: 25, City: 'San Francisco' },
    // Add more data as needed
  ];

  public file!: File

  constructor(
    private excelService: ExcelService,
    private booksService: BooksService
  ) {}

  exportToExcel(): void {
    console.log(this.booksService.searchBooks('').subscribe(data => this.excelService.generateExcel(data, 'books')));
  }

  async onUpload(event: FileUploadEvent): Promise<void> {
    this.file = event.files[0];

    const arrayBuffer = await this.file.arrayBuffer();
    const books = await this.excelService.getExcelData(arrayBuffer);

    console.log(books);
  }
}
