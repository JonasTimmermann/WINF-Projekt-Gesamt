import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FrageListComponent } from './frage-list/frage-list.component';
import { FrageListItemComponent } from './frage-list/frage-list-item/frage-list-item.component';
import { HinweisComponent } from './hinweis/hinweis.component';
import { FrageTextInputComponent } from './frage-list/frage-list-item/frage-text-input/frage-text-input.component';
import { FrageDropDownComponent } from './frage-list/frage-list-item/frage-drop-down/frage-drop-down.component';
import { FrageCheckBoxComponent } from './frage-list/frage-list-item/frage-check-box/frage-check-box.component';
import { FrageDataInputComponent } from './frage-list/frage-list-item/frage-data-input/frage-data-input.component';
import { FrageIconComponent } from './frage-list/frage-icon/frage-icon.component';
import { FrageKontaktformularComponent } from './frage-list/frage-kontaktformular/frage-kontaktformular.component';

@NgModule({
  declarations: [
    AppComponent,
    FrageListComponent,
    FrageListItemComponent,
    HinweisComponent,
    FrageTextInputComponent,
    FrageDropDownComponent,
    FrageCheckBoxComponent,
    FrageDataInputComponent,
    FrageIconComponent,
    FrageKontaktformularComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
