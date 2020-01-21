import { Component, OnInit, Output, EventEmitter, ViewChildren, QueryList, ViewChild } from '@angular/core';
import { Question, FormularType, QuestionType, QuestionAnswer, MapByTypeAndCategory, MapById, CategoryType } from './frage.model';
import { FrageListItemComponent } from "./frage-list-item/frage-list-item.component";
import { HttpService } from '../http.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AnswerButtonService } from './answer-button.service';
import { AnswerToServerService } from './answer-to-server.service';
import { AntragtextService } from '../body-upper-part/antragtext.service';
import { ShowLoadingScreenService } from '../loading-screen/show-loading-screen.service';

@Component({
  selector: 'app-frage-list',
  templateUrl: './frage-list.component.html',
  styleUrls: ["./frage-list.component.css"],
  providers: [MapByTypeAndCategory, MapById, AnswerButtonService, AnswerToServerService]
})
export class FrageListComponent implements OnInit {
  displayingQuestions: Question[];
  private questionsData:any; 

  formulare: string[];
  categories: string[]; 
  isFormularChoosed: Boolean = false;
  choosedFormular: string;
  isSubFormularChoosed: Boolean = false;
  //Styles für den Abschick-Button
  isChecked: Boolean = true;
  pointerSubmit: String = 'not-allowed'
  @Output() AnswerEvent: EventEmitter<String> = new EventEmitter<String>();
  //Greife auf die Componente zu
  @ViewChildren(FrageListItemComponent) frageListe: QueryList<FrageListItemComponent>;
  constructor(private httpClient: HttpService, 
    private answerService: AnswerButtonService,
    private answerToServer: AnswerToServerService,
    private categoryService: CategoryType, 
    private questionMapById: MapById, 
    private questionMapByType: MapByTypeAndCategory, 
    private formularService: FormularType,
    private allgHinweis: AntragtextService,
    private loadingScreen: ShowLoadingScreenService){
  }

  ngOnInit() {
    this.httpClient.getQuestions().subscribe((response) => {
      this.questionsData = response;
      this.getQuestionFromData()
    },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      });
    this.formularService.getAllForms().subscribe(arr=>{this.formulare=arr});
    this.categoryService.getAllCategories().subscribe(arr => { this.categories = arr} );  

    this.answerService.formularIsChecked.subscribe(status =>{
      if(status){
        this.isChecked = false;
        this.pointerSubmit = 'pointer'
      }else{
        this.isChecked = true;
        this.pointerSubmit = 'not-allowed'
      }
    })
  }

  formularIsSelected(event: Event) {
    // Guck welches Formular
    this.choosedFormular = (<HTMLInputElement>event.target).value;
    this.isFormularChoosed = true;
    this.isSubFormularChoosed = false;
  }

  selectedCategory(category: string) {
    //Finde welches raus welches Icon und lade die Fragen 
    // Zeige nun Fragen an extraiere, die Fragen von rohdaten
    this.changeDisplayingQuestion(this.choosedFormular, category);
  }

  checkFormular() {
    //Richtige Prüfung aller Fragen, ob der Inhalt drin ist. 
    this.frageListe.forEach(question => {
      question.checkQuestion();
    });
    if(this.answerService.allChecked == null){
      this.answerService.allChecked = true; 
    }
    if(this.answerService.allChecked){
      this.isChecked = false;
      this.pointerSubmit = 'pointer'
    }else{
      this.isChecked = true;
      this.pointerSubmit = 'not-allowed'
    }
  }

  changeDisplayingQuestion(formular: string, category: string) {
  // ! muss gefixet werden  this.loadingScreen.show(); 
    let key = { formularType: formular, category: category };
    let formId = this.formularService.getIdByForm(formular);
    let categoryId = this.categoryService.getIdByCategoryname(category); 
    this.httpClient.getFirstQuestion(formId,categoryId).subscribe((data)=>{
      this.changeTheView(data);
    });
   /*
   this.isSubFormularChoosed = true;
   this.displayingQuestions = []; 
   this.displayingQuestions = this.questionMapByType.get(key); 
   this.answerToServer.changeFormtype(formId);
   */
  }

  // ! nur benutzen wenn das Objekt geändert wurde. 
  changeTheView(findStartObj){
    this.isSubFormularChoosed = true;
    let questionId = findStartObj.questionId; 
    let startText = findStartObj.startText; 
    this.allgHinweis.changeShownText(startText);
    
    // Fragen durchlaufen nach Fragen, die angezeigten werden sollen
    let getToEnd = false; 
    this.displayingQuestions = []; 
    while(!getToEnd){
      let question = this.questionMapById.get(questionId);
      if(question == null){
        // ! muss gefixet werden this.loadingScreen.unshow();
        break; 
      }
      this.displayingQuestions.push(question); 
      if(question.defaultWay != null){
      questionId = question.defaultWay;
      } else {
        this.loadingScreen.unshow();
        getToEnd = true; 
      }
    }
  }

  // ! Dies ist die alte Version und arbeite mit einer Frage die gesendet wird. 
  _changeTheView(question){
    this.isSubFormularChoosed = true;
    this.allgHinweis.changeShownText("hallo");
    let questionId = question.id; 
    let getToEnd = false; 
    this.displayingQuestions = []; 
    while(!getToEnd){
      let question = this.questionMapById.get(questionId);
      this.displayingQuestions.push(question); 
      if(question.defaultWay != 0){
      questionId = question.defaultWay;
      } else {
        getToEnd = true; 
      }
    }
    this.loadingScreen.unshow();
  }
  /**
   * Diese Methode extrahiet die Daten aus der JSON Datei, die uns gesendet wurde
   */
  getQuestionFromData() {
    for (let index = 0; index < this.questionsData.length; index++) {
      //Nimm eine Frage
      let question = this.questionsData[index];
      //Hole dir die Attribute 
      let questionId: number = question.id;
      let questionMsg = question.question;
      let questionDefaultWay: number = question.questionType.defaultWay;
      let questionUseDefault = question.questionType.useDefault; 
      let questionType = QuestionType.getTyp(question.questionType.type);
      let questionAnswer: QuestionAnswer[] = [];
      let questionMandatory:boolean = question.mandatory; 
      let questionHint = question.hint;
      let questionFormtype = question.formType;
      //TODO Kann mehrere Catgeories erhalten 
      let questionCategory = question.questionCategories[0].category;
      // Falls abhängigkeit in den Auswahlmöglichkeiten liegt
      if (questionType == QuestionType.checkBox || questionType == QuestionType.dropDown || questionType == QuestionType.radioButton) {
        for (let i = 0; i < question.questionType.choices.length; i++) {
          let id = question.questionType.choices[i].nextQuestionId;
          let answerOption = question.questionType.choices[i].choice;
          let answer = new QuestionAnswer(answerOption, id);
          questionAnswer.push(answer);
        }
        // TODO NUR DRIN WEIL BEI ALLEN DEFAULT FALSE IST 
        questionUseDefault = true; 
      }
      //Formulartype und Subcategory passen 
      let questionObj = new Question(questionId ,questionMsg, questionType, questionFormtype, questionCategory, questionMandatory ,questionHint, questionAnswer,questionUseDefault,questionDefaultWay);
      // Jetzt mappen wegen next Question 
      this.questionMapById.set(questionId, questionObj);
      this.questionMapByType.set({ formularType: questionFormtype, category: questionCategory}, questionObj);
      console.log("Nächste Frage");
      console.log(question);
      console.log(questionObj);
    }
  }
  sendToServer(){
    this.frageListe.forEach((question)=> {
      question.sendAnswer(); 
    }); 
    this.answerToServer.startSending().subscribe(()=>{console.log("geschafft")}); 
  }
}
