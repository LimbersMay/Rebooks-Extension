import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Book} from "../../interfaces/book.interface";

@Component({
  selector: 'books-book-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit{
  @Input()
  public book!: Book;

  @Output()
  public onDeleteBook = new EventEmitter<string>();

  ngOnInit() {
    if (!this.book) throw Error('Book property is required')
  }

  onDelete() {
    this.onDeleteBook.emit(this.book.id);
  }
}
