import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from './books-routing.module';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { LayoutPageComponent } from '../shared/layouts/layout-page/layout-page.component';
import { CardComponent } from './components/card/card.component';
import {PrimeNgModule} from "../prime-ng/prime-ng.module";

@NgModule({
  declarations: [
    ListPageComponent,
    LayoutPageComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    PrimeNgModule
  ]
})
export class BooksModule { }
