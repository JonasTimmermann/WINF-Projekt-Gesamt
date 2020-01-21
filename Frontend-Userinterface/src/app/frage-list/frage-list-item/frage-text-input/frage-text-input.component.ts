import { Component, OnInit, Input, EventEmitter, Output, ElementRef, ViewChild } from '@angular/core';
import { QuestionInterface, Question } from '../../frage.model';
import { HinweisAnzeigeService } from 'src/app/hinweis/hinweis-anzeige.service';
import { AnswerButtonService } from '../../answer-button.service';
import { AnswerToServerService } from '../../answer-to-server.service';

@Component({
  selector: 'app-frage-text-input',
  templateUrl: './frage-text-input.component.html',
  styleUrls: []
})
export class FrageTextInputComponent implements OnInit, QuestionInterface {
  answerJSON = {
    dateanswer: null,
    fileanswer: null,
    question_id: null,
    aoa: []
  };

  // erter Wert: ob Valide , zweiter Wert ob invalide 
  status: boolean[] = [false, false];
  @Output() AnswerEvent = new EventEmitter<string>();
  @Input() question: Question;
  answer: string = "";

  constructor(private noteService: HinweisAnzeigeService,
    private answerService: AnswerButtonService,
    private answerToServer: AnswerToServerService) { }

  ngOnInit() {
  }

  updateNote() {
    this.noteService.selectedQuestion.emit(this.question.hint);
    this.noteService.selectedQuestionIsMandatory.emit(this.question.mandatory);
  }

  updateAnswer(event: Event) {
    this.answer = (<HTMLInputElement>event.target).value;
    this.getAnswer();
  }
  // Beide Methoden testen 
  //Setzt die Inhalte schon ins Event und testet vorher
  getAnswer() {
    let mandatory = this.question.mandatory;
    if (this.checkAnswer()) {
      this.AnswerEvent.emit(this.answer);
      if (this.question.isValid != null && !this.question.isValid) {
        this.answerService.signOut(this.question);
      }
      this.question.isValid = true;
    } else if (!mandatory) {
      this.status[0] = true;
      this.status[1] = false;
      if (this.question.isValid != null && !this.question.isValid) {
        this.answerService.signOut(this.question);
      }
      this.question.isValid = true;
      this.AnswerEvent.emit(null);
    } else {
      this.question.isValid = false;
      this.answerService.signIn(this.question);
      // throw new Error("Method not implemented.");
      this.AnswerEvent.emit(null);

    }

  }

  sendToService(){
    let answer = {answer: this.answer}; 
    this.answerJSON.aoa = []
    this.answerJSON.aoa.push(answer); 
    this.answerJSON.question_id = this.question.id; 
    this.answerToServer.addAnswer(this.question.id,JSON.stringify(this.answerJSON)); 
  }
  //Testet nur
  checkAnswer(): boolean {
    if (this.answer == "") {
      //Falls vergessen wurde was auszufüllen
      this.status[0] = false;
      this.status[1] = true;
      return false;
    } else {
      // Falls das Feld ausgefüllt wurde 
      this.status[0] = true;
      this.status[1] = false;
      return true;
    }
  }

}
