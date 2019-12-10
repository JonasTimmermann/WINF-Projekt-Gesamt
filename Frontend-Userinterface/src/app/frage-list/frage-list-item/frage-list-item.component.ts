import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { Frage, FrageTyp, FormularTyp } from "../frage.model";
import { FrageDataInputComponent } from './frage-data-input/frage-data-input.component';
import { FrageCheckBoxComponent } from './frage-check-box/frage-check-box.component';
import { FrageDropDownComponent } from './frage-drop-down/frage-drop-down.component';
import { FrageTextInputComponent } from './frage-text-input/frage-text-input.component';
import { element } from 'protractor';

@Component({
  selector: 'app-frage-list-item',
  templateUrl: './frage-list-item.component.html',
  styleUrls: ['./frage-list-item.component.css']
})
export class FrageListItemComponent implements OnInit {
  questionTypes = FrageTyp; 
  @Input() question: Frage; 
  //Alle Inputfelder
  @ViewChild(FrageTextInputComponent, null) textInput: FrageTextInputComponent;
  //Alle Checkboxen
  @ViewChild(FrageCheckBoxComponent, null) checkBox: FrageCheckBoxComponent; 
  //Alle Dropdown-Bars
  @ViewChild(FrageDropDownComponent, null) dropDown: FrageDropDownComponent;
  //Alle File-Input-Felder
  @ViewChild(FrageDataInputComponent, null) inputFile: FrageDataInputComponent; 
  // Welche Notiz in die Hinweiscomponente soll 
  @Output() AnswerEvent: EventEmitter<String> = new EventEmitter<String>();
  @Output() NoteEvent: EventEmitter<String> = new EventEmitter<String>(); 

  constructor() { 

  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.

  }

  checkQuestion() {
    //Checke jede Frage jetzt   
    switch (this.question.typ) {
      case FrageTyp.text:
          this.textInput.getAnswer(); 
        break;
      case FrageTyp.checkBox:
          this.checkBox.getAnswer(); 
        break; 

      case FrageTyp.dropDown:
          this.dropDown.checkAnswer(); 
        break;

      case FrageTyp.dataInput:
        this.inputFile.checkAnswer(); 
        break; 

      default:
        throw new Error(this.question.typ + " ist nicht vorhanden von der Frage: " + this.question.frage);
    }

  }
}
