import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FrageInterface } from '../../frage.model';

@Component({
  selector: 'app-frage-text-input',
  templateUrl: './frage-text-input.component.html',
  styleUrls: []
})
export class FrageTextInputComponent implements OnInit, FrageInterface {
  // erter Wert: ob Valide , zweiter Wert ob invalide 
  status: boolean[] = [false, false];
  @Output() AnswerEvent = new EventEmitter<String>(); 
  @Input() header: String; 
  answer: String = ""; 
  @Input() type: String; 
  @Input() note: String; 
  @Output() NoteEvent: EventEmitter<String> = new EventEmitter<String>(); 

  constructor() { }

  ngOnInit() {
  }
  
  updateNote(){
    this.NoteEvent.emit(this.note); 
  }
  
  updateAnswer(event: Event){
    this.answer = (<HTMLInputElement>event.target).value; 
  }
  // Beide Methoden testen 
  //Setzt die Inhalte schon ins Event und testet vorher
  getAnswer() {
    if(this.checkAnswer()){
      this.AnswerEvent.emit(this.answer); 
    }else{
      // throw new Error("Method not implemented.");
      this.AnswerEvent.emit(null); 

    }

  }
  //Testet nur
  checkAnswer(): boolean {
    console.log(this.answer); 
    if(this.answer == ""){
      //Falls vergessen wurde was auszufüllen
      this.status[0] = false; 
      this.status[1] = true; 
      return false;
    }else{
      // Falls das Feld ausgefüllt wurde 
      this.status[0]= true; 
      this.status[1] = false; 
      return true; 
    }
  }

}
