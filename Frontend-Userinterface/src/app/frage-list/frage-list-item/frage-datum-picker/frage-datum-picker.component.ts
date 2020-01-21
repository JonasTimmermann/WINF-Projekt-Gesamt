import { Component, OnInit, Input, EventEmitter, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Question, QuestionInterface } from '../../frage.model';
import { HinweisAnzeigeService } from 'src/app/hinweis/hinweis-anzeige.service';
import moment from 'moment';
import { AnswerButtonService } from '../../answer-button.service';
import { AnswerToServerService } from '../../answer-to-server.service';

@Component({
  selector: 'app-frage-datum-picker',
  templateUrl: './frage-datum-picker.component.html',
  styleUrls: ['./frage-datum-picker.component.css']
})
export class FrageDatumPickerComponent implements OnInit, QuestionInterface, AfterViewInit {
  answerJSON = {
		dateanswer: null,
		fileanswer: null,
		question_id: null,
    aoa: []};
  @ViewChild('dateElement', null) dateDiv: ElementRef;
  AnswerEvent: EventEmitter<string> = new EventEmitter<string>();
  status: boolean[] = [false, false];
  @Input() question: Question
  selectedDate: string = null; 
  date = null;
  
  startOption = {
    locale: moment.locale('de'),
      format:'DD/MM/YYYY HH:mm',
      minDate: moment(),
      icons: {
        time: 'far fa-clock',
        date: 'far fa-calendar',
        up: 'fas fa-arrow-up',
        down: 'fas fa-arrow-down',
        previous: 'fas fa-chevron-left',
        next: 'fas fa-chevron-right',
        today: 'far fa-calendar-check-o',
        clear: 'far fa-trash',
        close: 'far fa-times'
    }
  }

  constructor(private noteService: HinweisAnzeigeService,
    private answerService: AnswerButtonService,
    private answerToServer: AnswerToServerService) { }

  ngOnInit() {
  }

  activDatepiker(){
  }

  updateNote() {
    this.noteService.selectedQuestion.emit(this.question.hint);
    this.noteService.selectedQuestionIsMandatory.emit(this.question.mandatory); 
  }

  ngAfterViewInit() {
  }

  getAnswer() {
    let mandatory = this.question.mandatory; 
    if (this.checkAnswer()) {
      this.status[0] = true;
      this.status[1] = false;
      if(this.question.isValid != null && !this.question.isValid){
        this.answerService.signOut(this.question);
      }
      this.question.isValid = true; 

      this.AnswerEvent.emit(this.selectedDate);
    }else if(!mandatory){
      this.status[0] = true;
      this.status[1] = false;
      if(this.question.isValid != null && !this.question.isValid){
        this.answerService.signOut(this.question);
      }
      this.question.isValid = true; 

      this.AnswerEvent.emit(null);
    }  else {
      this.status[0] = false;
      this.status[1] = true;
      this.question.isValid = false; 
      this.answerService.signIn(this.question); 

      this.AnswerEvent.emit(null);

    }
  }
  sendToServer(){
    this.answerJSON.dateanswer = this.selectedDate; 
    this.answerJSON.question_id = this.question.id; 
    this.answerToServer.addAnswer(this.question.id,JSON.stringify(this.answerJSON)); 
  }
  
  checkAnswer(): boolean {
    if(this.date == null){
      return false; 
    }

    if(this.date._isValid){
      this.selectedDate = this.date._d; 
      return true;
    }else{
      return false; 
    }
  }

}
