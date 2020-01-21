import { Component, Input, EventEmitter, Output, ViewChild, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { Question, QuestionType, MapById } from "../frage.model";
import { FrageDataInputComponent } from './frage-data-input/frage-data-input.component';
import { FrageCheckBoxComponent } from './frage-check-box/frage-check-box.component';
import { FrageDropDownComponent } from './frage-drop-down/frage-drop-down.component';
import { FrageTextInputComponent } from './frage-text-input/frage-text-input.component';
import { FrageRadioButtonComponent } from './frage-radio-button/frage-radio-button.component';
import { FrageMultiTextInputComponent } from './frage-multi-text-input/frage-multi-text-input.component';
import { FrageDatumPickerComponent } from './frage-datum-picker/frage-datum-picker.component';
import { AnswerToServerService } from '../answer-to-server.service';
import { throwError } from 'rxjs';
import { AnswerButtonService } from '../answer-button.service';

@Component({
  selector: 'app-frage-list-item',
  templateUrl: './frage-list-item.component.html',
  styleUrls: [],
  providers: []
})
export class FrageListItemComponent implements AfterViewInit {
  questionTypes = QuestionType;
  @Input() question: Question;
  //Die SubFragen, die nach der Antwort angezeigt werden. 
  subQuestions: Question[] = [];
  //Alle Inputfelder
  @ViewChild(FrageTextInputComponent, null) textInput: FrageTextInputComponent;
  //Alle Checkboxen
  @ViewChild(FrageCheckBoxComponent, null) checkBox: FrageCheckBoxComponent;
  //Alle Dropdown-Bars
  @ViewChild(FrageDropDownComponent, null) dropDown: FrageDropDownComponent;
  //Alle File-Input-Felder
  @ViewChild(FrageDataInputComponent, null) inputFile: FrageDataInputComponent;
  // Alle RadioButton-Felder 
  @ViewChild(FrageRadioButtonComponent, null) radioButton: FrageRadioButtonComponent;
  // Alle Multitextfelder
  @ViewChild(FrageMultiTextInputComponent, null) multiTextInput: FrageMultiTextInputComponent;
  // Alle Datumeingaben 
  @ViewChild(FrageDatumPickerComponent, null) datePicker: FrageDatumPickerComponent;
  // Die Subfragen, Lösung ist Rekursion
  @ViewChildren(FrageListItemComponent) frageListe: QueryList<FrageListItemComponent>;
  // Welche Notiz in die Hinweiscomponente soll.
  @Output() AnswerEvent: EventEmitter<String> = new EventEmitter<String>();

  constructor(private questionById: MapById,
    private answerService: AnswerToServerService,
    private answerButtonService: AnswerButtonService) { }

  // TODO noch nicht getestet, muss noch gemacht werden, um zu sehen ob es klappt
  ngAfterViewInit(): void {
    switch (this.question.type) {
      case QuestionType.checkBox:
        this.checkBox.AnswerEvent.subscribe(elements => {
          this.addQuestions(elements);
        }, () => { console.log("Checkbox hat nicht gekoppelt") });
        break;
      case QuestionType.dropDown:
        this.dropDown.AnswerEvent.subscribe(element => { this.addQuestion(element) }, () => { console.log("dropDown hat nicht gekoppelt") });
        break;
      case QuestionType.radioButton:
        this.radioButton.AnswerEvent.subscribe(element => { this.addQuestion(element) }, () => { console.log("Radiobutton hat nicht gekoppelt") });
    }
  }
  /**
   * Die Funktion fügt nur eine neue Frage hinzu. Sie wird genutzt für nur Componente, die nur 
   * eine weitere Fragen hinzufügt.
   * @param answer Die Antwortmöglichkeit, der jeweiligen Frage. Diese wird gemappt um das AnswerObj
   * zu bekommen
   */
  addQuestion(answer: string) {
    let sameQuestion = false;
    let answerObj = this.question.getAnswerObj(answer);
    let arr = [];
    // Alle Subfragen Vorher abmelden
    if (answerObj != null) {
      let question = this.questionById.get(answerObj.nextQuestion);
      if (question != null) {
        this.subQuestions.forEach(questionDis => {
          if (question == questionDis) {
            sameQuestion = true;
            return;
          }
          this.answerButtonService.signOut(questionDis);
        });
        if (!sameQuestion) {
          this.subQuestions = [];
          this.subQuestions.push(question);
          arr = this.pushDefaultWay(question);
          this.subQuestions = this.subQuestions.concat(arr);
          this.answerButtonService.updatedView();
        }
        // TODO Button muss danach wieder ausgeschlatet weden  
      } else {
        this.subQuestions.forEach(element => { this.answerButtonService.signOut(element); })
        this.subQuestions = [];
      }
    }

  }
  pushDefaultWay(question: Question) {
    if (question.defaultWay == 0 || question.defaultWay == null) {
      return [];
    }
    // Fragen durchlaufen nach Fragen, die angezeigten werden sollen
    let getToEnd = false;
    let arr = [];
    let questionId = question.defaultWay;
    while (!getToEnd) {
      let question = this.questionById.get(questionId);
      if (question == null) {
        break;
      }
      arr.push(question);
      if (question.defaultWay != null && question.defaultWay != 0) {
        questionId = question.defaultWay;
      } else {
        getToEnd = true;
      }
    }
    return arr;
  }

  addQuestions(answers: string[]) {
    let arr = [];
    this.subQuestions.forEach(question => {
      this.answerButtonService.signOut(question);
    })
    //Alle Subfragen vorher abmelden
    this.subQuestions = []
    if (answers == null) {
      this.answerButtonService.updatedView();
      return;
    }
    let answerObj = this.question.getAnswersObj(answers);
    answerObj.forEach(element => {
      let question = this.questionById.get(element.nextQuestion);
      if (question != null) {
        this.subQuestions.push(question);
        arr = this.pushDefaultWay(question);
        this.subQuestions = this.subQuestions.concat(arr);
        this.answerButtonService.updatedView();
      }
    })

  }

  sendAnswer() {
    //Checke jede Frage jetzt   
    switch (this.question.type) {
      case QuestionType.text:
        this.textInput.sendToService();
        break;
      case QuestionType.checkBox:
        this.checkBox.sendToServer();
        break;
      case QuestionType.dropDown:
        this.dropDown.sendToServer();
        break;
      case QuestionType.dataInput:
        this.inputFile.sendToServer();
        break;
      case QuestionType.radioButton:
        this.radioButton.sendToService();
        break;
      case QuestionType.multipleTextInput:
        this.multiTextInput.sendToServer();
        break;
      case QuestionType.datePicker:
        this.datePicker.sendToServer();
        break;
      default:
      //throw new Error(this.question.type + " ist nicht vorhanden von der Frage: " + this.question.question);
    }
  }


  checkQuestion() {
    //Checke jede Frage jetzt   
    switch (this.question.type) {
      case QuestionType.text:
        this.textInput.getAnswer();
        break;
      case QuestionType.checkBox:
        this.checkBox.getAnswer();
        break;

      case QuestionType.dropDown:
        this.dropDown.getAnswer();
        break;

      case QuestionType.dataInput:
        this.inputFile.checkAnswer();
        break;

      case QuestionType.radioButton:
        this.radioButton.getAnswer();
        break;
      case QuestionType.multipleTextInput:
        this.multiTextInput.getAnswer();
        break;
      case QuestionType.datePicker:
        this.datePicker.getAnswer();
        break;
      default:
      //throw new Error(this.question.type + " ist nicht vorhanden von der Frage: " + this.question.question);
    }
    if (this.frageListe.length != 0) {
      this.frageListe.forEach(question => {
        question.checkQuestion();
      });
    }
  }
}
