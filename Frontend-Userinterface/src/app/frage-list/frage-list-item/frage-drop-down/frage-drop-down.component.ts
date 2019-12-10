import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FrageInterface } from '../../frage.model';

@Component({
  selector: 'app-frage-drop-down',
  templateUrl: './frage-drop-down.component.html',
  styles: []
})
export class FrageDropDownComponent implements OnInit, FrageInterface {
  @Output() AnswerEvent: EventEmitter<String> = new EventEmitter<String>();
  @Output() NoteEvent: EventEmitter<String> = new EventEmitter<String>(); 
  status: boolean[] = [false, false];
  @Input() header: String; 
  @Input() possibleAnswer: String[]; 
  selectedAnswer: String; 
  @Input() note: String  = "Test DropDown Hinweis"; 
  
  constructor() { }

  ngOnInit() {
  }

  
  updateNote(){
    this.NoteEvent.emit(this.note); 
  }
  
  getAnswer(){
    if(this.checkAnswer()){
      this.AnswerEvent.emit(this.selectedAnswer); 
    }else{
      // throw new Error("Method not implemented.");
      this.AnswerEvent.emit(null); 

    }
  }
  checkAnswer(): boolean {
    if(this.selectedAnswer == null){
      this.status[0] = false;
      this.status[1] = true; 
      return false; 
    }else{
      this.status[0] = true; 
      this.status[1] = false; 
      return true ;
    }
  }

  putAnswer(event: Event){
    this.selectedAnswer = (<HTMLInputElement>event.target).value; 
  }

}
