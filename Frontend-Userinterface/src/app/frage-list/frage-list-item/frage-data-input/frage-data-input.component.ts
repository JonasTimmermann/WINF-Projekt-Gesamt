import { Component, OnInit, Input, EventEmitter, ViewChild, ElementRef, Output } from '@angular/core';
import { FrageInterface } from '../../frage.model';

@Component({
  selector: 'app-frage-data-input',
  templateUrl: './frage-data-input.component.html',
  styleUrls: []
})
export class FrageDataInputComponent implements OnInit, FrageInterface {
  //Abschecken was man machen muss mit Daten die hochgeladen werden 
  @Output() AnswerEvent: EventEmitter<String> = new EventEmitter<String>();
  @Output() NoteEvent: EventEmitter<String> = new EventEmitter<String>(); 
  status: boolean[] = [false, false];
  @Input() header:String; 
  @Input() note:String; 
  data: String; 
  @ViewChild('inputField', null) inputField: ElementRef; 
  constructor() { }

  ngOnInit() {
  }
  
  updateNote(){
    this.NoteEvent.emit(this.note); 
  }

  getData(event: Event){
    //Hier Daten durch das Event erhalten
    this.data = (<HTMLInputElement>event.target).value; 
  }

  getAnswer() {
    if(this.checkAnswer()){
      this.AnswerEvent.emit(this.data); 
      this.status[0] = true; 
      this.status[1] = false; 
    }else{
      this.AnswerEvent.emit(null); 
      alert("Es wurde keine Datei für "+ this.header + " ausgewählt!")
      //Rote Farbe Klappt nicht, wirf Alert stattdessen 
      this.status[0] = false;
      this.status[1] = true; 
    }
  }
  checkAnswer(): boolean {
    if(this.inputField.nativeElement.value == ""){
    return false; 
    }else{
      return true; 
    }
  }

}
