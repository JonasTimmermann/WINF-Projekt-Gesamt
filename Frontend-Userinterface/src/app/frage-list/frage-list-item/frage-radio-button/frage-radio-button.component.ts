import { Component, OnInit, Input, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { Question, QuestionInterface } from '../../frage.model';
import { HinweisAnzeigeService } from 'src/app/hinweis/hinweis-anzeige.service';
import { AnswerButtonService } from '../../answer-button.service';
import { AnswerToServerService } from '../../answer-to-server.service';

@Component({
  selector: 'app-frage-radio-button',
  templateUrl: './frage-radio-button.component.html',
  styleUrls: []
})
export class FrageRadioButtonComponent implements OnInit, QuestionInterface {
  answerJSON = {
		dateanswer: null,
		fileanswer: null,
		question_id: null,
    aoa: []};
    
  @ViewChild('divRadiobutton', null) radioButton: ElementRef;
  
  AnswerEvent: EventEmitter<any> = new EventEmitter<string>();
  status: boolean[] = [false, false];
  selectedAnswer: string; 
  @Input() question: Question; 
 
  constructor(private noteService: HinweisAnzeigeService,
    private answerService: AnswerButtonService,
    private answerToServer: AnswerToServerService) { }

  ngOnInit() {
  }

  updateNote() {
    this.noteService.selectedQuestion.emit(this.question.hint); 
    this.noteService.selectedQuestionIsMandatory.emit(this.question.mandatory); 
  }
  

  getAnswer() {
    let mandatory = this.question.mandatory; 
    if(this.checkAnswer()){
      this.status[0] = true;
      this.status[1] = false;
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
      this.status[0] = false;
      this.status[1] = true;

      this.question.isValid = false; 
      this.answerService.signIn(this.question); 

      this.AnswerEvent.emit(null); 
    }
  }
  sendToService(){
    let answer = { answer: this.selectedAnswer}; 
    this.answerJSON.question_id = this.question.id; 
    this.answerJSON.aoa = []
    this.answerJSON.aoa.push(answer); 
    this.answerToServer.addAnswer(this.question.id,JSON.stringify(this.answerJSON)); 
  }
  
  checkAnswer(): boolean {
    let element = this.radioButton.nativeElement
    for (let index = 0; index < element.children.length; index++) {
      let div = element.children[index];
      let radioButton = div.children[0]; 

      if(radioButton.checked){
        this.selectedAnswer = radioButton.value; 
        return true;
      }
    }
    return false; 
  }

}
