import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { QuestionInterface, Question } from '../../frage.model';
import { HinweisAnzeigeService } from 'src/app/hinweis/hinweis-anzeige.service';
import { AnswerButtonService } from '../../answer-button.service';
import { AnswerToServerService } from '../../answer-to-server.service';

@Component({
  selector: 'app-frage-multi-text-input',
  templateUrl: './frage-multi-text-input.component.html',
  styles: []
})
export class FrageMultiTextInputComponent implements OnInit, QuestionInterface {
  answerJSON = {
		dateanswer: null,
		fileanswer: null,
		question_id: null,
    aoa: []};
 @Input() question: Question;  
  AnswerEvent: EventEmitter<string> = new EventEmitter<string>() ;
  status: boolean[] = [false, false];
  answer: string; 

  constructor(private noteService: HinweisAnzeigeService,
    private answerService: AnswerButtonService,
    private answerToServer: AnswerToServerService) { }

  ngOnInit() {
  }
  
  updateNote(){
    this.noteService.selectedQuestion.emit(this.question.hint);
    this.noteService.selectedQuestionIsMandatory.emit(this.question.mandatory); 
  }

  updateAnswer(event: Event){
    this.answer =  (<HTMLInputElement> event.target).value; 
    this.getAnswer(); 
  }

  getAnswer() {
    let mandatory = this.question.mandatory;
    if (this.checkAnswer()) {
      if(this.question.isValid != null && !this.question.isValid){
        this.answerService.signOut(this.question);
      }
      this.question.isValid = true; 
      this.AnswerEvent.emit(this.answer); 
    }else if(!mandatory){
      this.status[0] = true;
      this.status[1] = false;
      if(this.question.isValid != null && !this.question.isValid){
        this.answerService.signOut(this.question);
      }
      this.question.isValid = true; 

      this.AnswerEvent.emit(null);
    }  else {
      this.answerService.signIn(this.question);
      this.question.isValid = false; 
      this.AnswerEvent.emit(null); 
    }
  }
  
  sendToServer(){
    let answer = { answer: this.answer}; 
    this.answerJSON.question_id = this.question.id; 
    this.answerJSON.aoa = []
    this.answerJSON.aoa.push(answer); 
    this.answerToServer.addAnswer(this.question.id,JSON.stringify(this.answerJSON)); 
  }

  checkAnswer(): boolean {
    if(this.answer == null){
      this.status[0] = false;
      this.status[1] = true; 
      return false; 
    }else{
      this.status[0] = true; 
      this.status[1] = false; 
      return true ;
    }
  }
}
