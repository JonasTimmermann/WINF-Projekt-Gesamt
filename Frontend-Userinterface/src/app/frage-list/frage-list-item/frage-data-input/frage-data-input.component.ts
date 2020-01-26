import { Component, OnInit, Input, EventEmitter, ViewChild, ElementRef, Output } from '@angular/core';
import { QuestionInterface, Question } from '../../frage.model';
import { HinweisAnzeigeService } from 'src/app/hinweis/hinweis-anzeige.service';
import { AnswerButtonService } from '../../answer-button.service';
import { AnswerToServerService } from '../../answer-to-server.service';

@Component({
  selector: 'app-frage-data-input',
  templateUrl: './frage-data-input.component.html',
  styleUrls: []
})
export class FrageDataInputComponent implements OnInit, QuestionInterface {
  answerJSON = {
		dateanswer: null,
		fileanswer: null,
		question_id: null,
    aoa: []};
  file: File; 
  formData: FormData; 
  //Abschecken was man machen muss mit Daten die hochgeladen werden 
  @Output() AnswerEvent: EventEmitter<String> = new EventEmitter<String>();
  status: boolean[] = [false, false];
  @Input() question: Question; 
  @ViewChild('inputField', null) inputField: ElementRef; 
  constructor(private noteService: HinweisAnzeigeService,
    private answerService: AnswerButtonService,
    private answerToServer: AnswerToServerService) { }

  ngOnInit() {
  }
  
  updateNote(){
    this.noteService.selectedQuestion.emit(this.question.hint); 
    this.noteService.selectedQuestionIsMandatory.emit(this.question.mandatory); 
  }

  getAnswer() {
    let mandatory = this.question.mandatory; 
    if(this.checkAnswer()){
      this.AnswerEvent.emit(this.file.name); 
      this.status[0] = true; 
      this.status[1] = false; 
      if(this.question.isValid != null && !this.question.isValid){
        this.answerService.signOut(this.question);
      }
      this.question.isValid = true; 
    }else if(!mandatory){
      this.status[0] = true;
      this.status[1] = false;
      if(this.question.isValid != null && !this.question.isValid){
        this.answerService.signOut(this.question);
      }
      this.question.isValid = true; 
      this.AnswerEvent.emit(null);
    } else{
      this.AnswerEvent.emit(null); 
      alert("Es wurde keine Datei für "+ this.question.question + " ausgewählt!")
      this.question.isValid = false; 
      this.answerService.signIn(this.question); 
      //Rote Farbe Klappt nicht, wirf Alert stattdessen 
      this.status[0] = false;
      this.status[1] = true; 
    }
  }

  sendToServer(){
    this.answerJSON.aoa = [{answer:null}]; 
    this.answerJSON.question_id = this.question.id; 
    this.answerToServer.addAnswer(this.question.id, JSON.stringify(this.answerJSON), true,this.formData);
  }
  checkAnswer(): boolean {
    let fileList: FileList = this.inputField.nativeElement.files 
    if(fileList.length > 0){
      this.file = fileList[0];
      this.formData = new FormData();
      this.formData.append('file', this.file);
      return true; 
    }else{
      return false; 
    }
  }

}
