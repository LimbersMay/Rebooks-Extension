import { Injectable } from '@angular/core';
import * as ExcelJS from 'exceljs';
import { Book } from '../interfaces/book.interface';
import {saveAs} from "file-saver";

@Injectable({
  providedIn: 'root',
})
export class ExcelService {
  constructor() {}

  generateExcel(data: any[], fileName: string): void {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet 1');
    const headers = Object.keys(data[0]);
    worksheet.addRow(headers);
    data.forEach((item) => {
      const row: any[] = [];
      headers.forEach((header) => {
        row.push(item[header]);
      });
      worksheet.addRow(row);
    });
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, `${fileName}.xlsx`);
    });
  }

  async getExcelData(file: ArrayBuffer): Promise<Book[]> {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(file);
    const worksheet = workbook.getWorksheet(1);
    const books: Book[] = [];
    worksheet?.eachRow((row, rowNumber) => {
      if (rowNumber > 1) { // Skip header row
        const book: Book = {
          id: row.getCell(1).value as string,
          title: row.getCell(2).value as string,
          author: row.getCell(3).value as string,
          totalPages: row.getCell(4).value as number,
          currentPage: row.getCell(5).value as number,
          imageUrl: row.getCell(6).value as string,
        };
        books.push(book);
      }
    });

    return books;
  }
}
