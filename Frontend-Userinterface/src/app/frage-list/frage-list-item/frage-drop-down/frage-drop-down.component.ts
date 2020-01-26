import { Component, OnInit, Input, EventEmitter, Output, ElementRef, ViewChild } from '@angular/core';
import { QuestionInterface, Question } from '../../frage.model';
import { HinweisAnzeigeService } from 'src/app/hinweis/hinweis-anzeige.service';
import { AnswerButtonService } from '../../answer-button.service';
import { AnswerToServerService } from '../../answer-to-server.service';

@Component({
  selector: 'app-frage-drop-down',
  templateUrl: './frage-drop-down.component.html',
  styles: []
})
export class FrageDropDownComponent implements OnInit, QuestionInterface {
  answerJSON = {
		dateanswer: null,
		fileanswer: null,
		question_id: null,
    aoa: []};
  @ViewChild('selector',null) selector: ElementRef; 
  @Output() AnswerEvent: EventEmitter<String> = new EventEmitter<String>();
  status: boolean[] = [false, false];
  @Input() question: Question; 
  selectedAnswer: String; 
  
  constructor(private noteService: HinweisAnzeigeService,
    private answerService: AnswerButtonService,
    private answerToServer: AnswerToServerService) { }

  ngOnInit() {
  }

  
  updateNote(){
    this.noteService.selectedQuestion.emit(this.question.hint); 
    this.noteService.selectedQuestionIsMandatory.emit(this.question.mandatory); 
  }
  
  getAnswer(){
    let mandatory = this.question.mandatory; 
    this.selectedAnswer = (<HTMLInputElement>event.target).value;
    if(this.checkAnswer()){ 
      if(this.question.isValid != null && !this.question.isValid){
        this.answerService.signOut(this.question);
      }
      this.question.isValid = true; 
      this.AnswerEvent.emit(this.selectedAnswer); 
    }else if(!mandatory){
      this.status[0] = true;
      this.status[1] = false;
      if(this.question.isValid != null && !this.question.isValid){
        this.answerService.signOut(this.question);
      }
      this.question.isValid = true; 

      this.AnswerEvent.emit(null);
    }  else{
      this.answerService.signIn(this.question); 
      this.question.isValid = false; 
      // throw new Error("Method not implemented.");
      this.AnswerEvent.emit(null); 

    }
  }
  sendToServer(){
    let answer = { answer: this.selectedAnswer}; 
    this.answerJSON.question_id = this.question.id; 
    this.answerJSON.aoa = []
    this.answerJSON.aoa.push(answer); 
    this.answerToServer.addAnswer(this.question.id,JSON.stringify(this.answerJSON)); 
  }
  checkAnswer(): boolean {
    this.selectedAnswer = this.selector.nativeElement.value; 
    if(this.selectedAnswer == ""){
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
    
  }

}
