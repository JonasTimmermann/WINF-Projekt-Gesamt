import { Component } from '@angular/core';
import { Frage, FrageTyp, FormularTyp } from './frage-list/frage.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentNote: String; 
  questions: Frage[] = [
    new Frage("Wie lautet der Name ihrer Firma ?", FrageTyp.text , FormularTyp.gewerbeAnmeldung),
    new Frage("Befinden Sie sich in Kiel ?", FrageTyp.dropDown, FormularTyp.gewerbeAnmeldung,["ja", "nein"],"Die Frage wird mit Ja beantwortet, wenn Sie in Kiel leben."),
    new Frage("Handelt es sich hierbei um ein Kleingewerbe", FrageTyp.checkBox, FormularTyp.gewerbeAnmeldung,["ja", "nein"],"Ein Gewerbe handelt sich um ein Kleingewerbe, wenn gilt.... "),
    new Frage("Wann ist der Beginn der Feier ? ", FrageTyp.text,FormularTyp.freiluftveranstaltung,null,"Den Inhalt bitte im Format: DD.MM.YYYY, HH:MM"),
    new Frage("Wann ist das Ende der Feier ? ", FrageTyp.text,FormularTyp.freiluftveranstaltung,null,"Den Inhalt bitte im Format: DD.MM.YYYY, HH:MM"),

  ]

  //HTTP-Modul IMportieren 
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {
 
  //Inject HttpClient into your components or services
  constructor(private http: HttpClient) { }
}