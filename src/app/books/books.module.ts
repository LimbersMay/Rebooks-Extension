import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from './books-routing.module';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { LayoutPageComponent } from '../shared/layouts/layout-page/layout-page.component';
import { CardComponent } from './components/card/card.component';
import {PrimeNgModule} from "../prime-ng/prime-ng.module";
import { NewBookPageComponent } from './pages/new-book-page/new-book-page.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ConfigPageComponent } from './pages/config-page/config-page.component';
import {Ripple} from "primeng/ripple";
import {TranslocoPipe} from "@jsverse/transloco";

@NgModule({
  declarations: [
    ListPageComponent,
    LayoutPageComponent,
    CardComponent,
    NewBookPageComponent,
    ConfigPageComponent
  ],
    imports: [
        CommonModule,
        BooksRoutingModule,
        PrimeNgModule,
        FormsModule,
        ReactiveFormsModule,
        TranslocoPipe,
        Ripple,
        TranslocoPipe
    ]
})
export class BooksModule { }
