import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CardModule} from "primeng/card";
import {ButtonModule} from "primeng/button";
import {PanelModule} from "primeng/panel";
import {ProgressBarModule} from "primeng/progressbar";
import {AvatarModule} from "primeng/avatar";
import {ImageModule} from "primeng/image";
import {ToolbarModule} from "primeng/toolbar";
import {DividerModule} from "primeng/divider";
import {TooltipModule} from "primeng/tooltip";
import {SplitterModule} from "primeng/splitter";
import {ScrollPanelModule} from "primeng/scrollpanel";
import {InputTextModule} from "primeng/inputtext";
import {FloatLabelModule} from "primeng/floatlabel";
import {InputTextareaModule} from "primeng/inputtextarea";
import {InputGroupModule} from "primeng/inputgroup";
import {FileUploadModule} from "primeng/fileupload";
import {ProgressSpinnerModule} from "primeng/progressspinner";

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    CardModule,
    ButtonModule,
    PanelModule,
    ProgressBarModule,
    AvatarModule,
    ImageModule,
    ToolbarModule,
    DividerModule,
    TooltipModule,
    SplitterModule,
    ScrollPanelModule,
    FloatLabelModule,
    InputTextModule,
    InputTextareaModule,
    InputGroupModule,
    FileUploadModule,
    ProgressSpinnerModule
  ]
})
export class PrimeNgModule { }
