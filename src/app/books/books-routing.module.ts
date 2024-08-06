import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LayoutPageComponent} from "../shared/layouts/layout-page/layout-page.component";
import {ListPageComponent} from "./pages/list-page/list-page.component";
import {NewBookPageComponent} from "./pages/new-book-page/new-book-page.component";
import {ConfigPageComponent} from "./pages/config-page/config-page.component";

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: 'list', component: ListPageComponent},
      { path: 'edit/:id', component: NewBookPageComponent },
      { path: 'new-book', component: NewBookPageComponent },
      { path: 'config', component: ConfigPageComponent },
      { path: '**', redirectTo: 'list'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule { }
