import { Component, OnInit,Output, EventEmitter, Input, ViewChildren, QueryList } from '@angular/core';
import { IconFrage, Frage, FormularTyp, FrageTyp } from './frage.model';
import { FrageListItemComponent } from "./frage-list-item/frage-list-item.component";

@Component({
  selector: 'app-frage-list',
  templateUrl: './frage-list.component.html',
  styles: []
})
export class FrageListComponent implements OnInit {
  @Input() questions: Frage[]; 
  formulare: {value: FormularTyp, anzeige: String}[]; 
  isFormularChoosed: Boolean = false;
  choosedFormular: FormularTyp;  
  isSubFormularChoosed: Boolean = false; 
  //Styles für den Abschick-Button
  isChecked: Boolean = true; 
  pointerSubmit:String = 'not-allowed'
  @Output() AnswerEvent: EventEmitter<String> = new EventEmitter<String>();
  @Output() NoteEvent: EventEmitter<String> = new EventEmitter<String>(); 
  //Greife auf die Componente zu
  @ViewChildren(FrageListItemComponent) frageListe : QueryList<FrageListItemComponent>; 
  
  constructor() { }

  ngOnInit() {
    this.formulare = FormularTyp.toArray(); 
  }

  formularIsSelected(event: Event){
    // Guck welches Formular
    this.choosedFormular = FormularTyp.getTyp((<HTMLInputElement>event.target).value); 
    this.isFormularChoosed = true;
    this.isSubFormularChoosed = false; 
  }

  selectedIcon(icon: IconFrage){
    //Finde welches raus welches Icon und lade die Fragen 
    this.isSubFormularChoosed = true; 
  }

  checkFormular(){
    //Richtige Prüfung aller Fragen, ob der Inhalt drin ist. 
    this.frageListe.forEach(question => {
      question.checkQuestion(); 
    }); 
    this.isChecked = false; 
    this.pointerSubmit = 'pointer'
  }

}
