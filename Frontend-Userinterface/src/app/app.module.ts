import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgTempusdominusBootstrapModule } from 'ngx-tempusdominus-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FrageListComponent } from './frage-list/frage-list.component';
import { FrageListItemComponent } from './frage-list/frage-list-item/frage-list-item.component';
import { HinweisComponent } from './hinweis/hinweis.component';
import { FrageTextInputComponent } from './frage-list/frage-list-item/frage-text-input/frage-text-input.component';
import { FrageDropDownComponent } from './frage-list/frage-list-item/frage-drop-down/frage-drop-down.component';
import { FrageCheckBoxComponent } from './frage-list/frage-list-item/frage-check-box/frage-check-box.component';
import { FrageDataInputComponent } from './frage-list/frage-list-item/frage-data-input/frage-data-input.component';
import { FrageCategroyComponent } from './frage-list/frage-category/frage-category.component';
import { HttpService } from './http.service';
import { HinweisAlertComponent } from './hinweis/hinweis-alert/hinweis-alert.component';
import { PrivacyDecisionComponent } from './privacy-decision/privacy-decision.component';
import { MapById, MapByTypeAndCategory, CategoryType, FormularType } from './frage-list/frage.model';
import { HinweisAnzeigeService } from './hinweis/hinweis-anzeige.service';
import { HeaderComponent } from './header/header.component';
import { BodyUpperPartComponent } from './body-upper-part/body-upper-part.component';
import { FrageRadioButtonComponent } from './frage-list/frage-list-item/frage-radio-button/frage-radio-button.component';
import { FrageMultiTextInputComponent } from './frage-list/frage-list-item/frage-multi-text-input/frage-multi-text-input.component';
import { FrageDatumPickerComponent } from './frage-list/frage-list-item/frage-datum-picker/frage-datum-picker.component';
import { AntragtextService } from './body-upper-part/antragtext.service';
import { LoadingScreenComponent } from './loading-screen/loading-screen.component';
import { ShowLoadingScreenService } from './loading-screen/show-loading-screen.service';
import { FrageDatenschutzComponent } from './frage-list/frage-datenschutz/frage-datenschutz.component';

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
    FrageCategroyComponent,
    HinweisAlertComponent,
    PrivacyDecisionComponent,
    HeaderComponent,
    BodyUpperPartComponent,
    FrageRadioButtonComponent,
    FrageMultiTextInputComponent,
    FrageDatumPickerComponent,
    LoadingScreenComponent,
    FrageDatenschutzComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgTempusdominusBootstrapModule
  ],
  providers: [
    HttpService,
    FormularType, 
    CategoryType,
    MapById, 
    MapByTypeAndCategory,
    HinweisAnzeigeService, 
    AntragtextService,
    ShowLoadingScreenService],
  bootstrap: [AppComponent]
})
export class AppModule { }
