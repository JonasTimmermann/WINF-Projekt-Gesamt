import { Component, OnInit, Input, EventEmitter, ViewChild, ElementRef, Output } from '@angular/core';
import { QuestionInterface, Question } from '../../frage.model';
import { HinweisAnzeigeService } from 'src/app/hinweis/hinweis-anzeige.service';
import { AnswerButtonService } from '../../answer-button.service';
import { AnswerToServerService } from '../../answer-to-server.service';

@Component({
  selector: 'app-frage-check-box',
  templateUrl: './frage-check-box.component.html',
  styleUrls: []
})
export class FrageCheckBoxComponent implements OnInit, QuestionInterface {
  answerJSON = {
		dateanswer: null,
		fileanswer: null,
		question_id: null,
    aoa: []};
  @ViewChild('divCheckbox', null) checkbox: ElementRef;
  @Output() AnswerEvent: EventEmitter<String[]> = new EventEmitter<String[]>();
  status: boolean[] = [false, false];
  @Input() question: Question; 

  selectedAnswer: string[] = [];

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
    if (this.checkAnswer()) {
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
    } else {
      this.status[0] = false;
      this.status[1] = true;
      this.question.isValid = false;
      this.answerService.signIn(this.question); 

      this.AnswerEvent.emit(null);
    }

  }
  sendToServer(){
    this.answerJSON.aoa = []
    for (let index = 0; index < this.selectedAnswer.length; index++) {
      const element = this.selectedAnswer[index];
      let arr = {answer: element};
      this.answerJSON.aoa.push(arr);
    }
    this.answerJSON.question_id = this.question.id; 
    this.answerToServer.addAnswer(this.question.id, JSON.stringify(this.answerJSON)); 
  }
  
  //Muss getestet werden. 
  checkAnswer(): boolean {
    let children = this.checkbox.nativeElement.children[1];
    // TODO Einmal eine Checkbox mit mehreren Möglihckeiten testen
    let length = children.children.length;
    let someChecked: boolean = false;
    this.selectedAnswer = []; 
    for (let index = 0; index < length; index++) {
      let div = children.children[index];
      let input = div.children[0];
      //Prüfe ob es sich um ein Input Feld handelt 
      if (input.localName != "input") {
        continue;
      }

      //schau ob Checkbox true gesetzt wurde. 
      if (input.checked) {
        // Fehler beheben 
        this.selectedAnswer.push(input.labels[0].innerText);
        someChecked = true;
      }
    }

    return someChecked;

  }


}
