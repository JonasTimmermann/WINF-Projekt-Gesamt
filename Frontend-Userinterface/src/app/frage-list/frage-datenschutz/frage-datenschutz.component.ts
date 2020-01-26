import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { Question, QuestionType, QuestionAnswer } from '../frage.model';
import { FrageRadioButtonComponent } from '../frage-list-item/frage-radio-button/frage-radio-button.component';
import { FrageListItemComponent } from '../frage-list-item/frage-list-item.component';

@Component({
  selector: 'app-frage-datenschutz',
  templateUrl: './frage-datenschutz.component.html',
  styleUrls: ['./frage-datenschutz.component.css']
})
export class FrageDatenschutzComponent implements OnInit {
  // Alle RadioButton-Felder 
  @ViewChild(FrageListItemComponent, null) item: FrageListItemComponent;
  question: Question;
  @Output() AnswerEvent: EventEmitter<String> = new EventEmitter<String>();
  constructor() { }

  ngOnInit() {
    let questionId= 0; 
    let questionText = `Ich bin damit einverstanden, dass die Veranstaltungsdaten
    (Bezeichnung, Termin, Ort) sowie Veranstalterdaten (Name, Institution, Telefon, E-Mail) übersendet werden.`;
    let questionType = QuestionType.radioButton;
    let questionFormular = "Sondernutzungserlaubnis"
    let questionCategory = "Antrag auf Sondernutzung einer öffentlichen Grünfläche";
    let questionMandatory = true; 
    let questionHint = ""; 
    let questionAnswer: QuestionAnswer[] = [new QuestionAnswer("Ich bin einverstanden",0)]; 
    this.question = new Question(questionId,questionText,questionType,questionFormular,questionCategory,questionMandatory,questionHint,questionAnswer,true,null);
  }

  checkQuestion(){
    this.item.checkQuestion();
  }
}
