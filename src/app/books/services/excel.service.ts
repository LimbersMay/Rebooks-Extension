import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { Book } from '../interfaces/book.interface';
import { saveAs } from 'file-saver-es';

@Injectable({
  providedIn: 'root',
})
export class ExcelService {
  constructor() {}

  generateExcel(data: any[], fileName: string): void {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');

    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, `${fileName}.xlsx`);
  }

  getExcelData(file: ArrayBuffer): Book[] {
    const workbook = XLSX.read(file, { type: 'array' });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json<any>(worksheet, { header: 1 });

    const books: Book[] = [];
    data.slice(1).forEach((row: any[]) => {
      const book: Book = {
        id: row[0],
        title: row[1],
        author: row[2],
        totalPages: parseInt(row[3], 10),
        currentPage: parseInt(row[4], 10),
        imageUrl: row[5],
      };
      books.push(book);
    });

    return books;
  }
}
