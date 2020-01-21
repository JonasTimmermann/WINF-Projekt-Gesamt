import { EventEmitter } from '@angular/core';
import { Question } from './frage.model';

export class AnswerButtonService {
  private falseQuestion: Map<number, Question> = new Map<number, Question>();
  public allChecked: boolean = null;
  public formularIsChecked = new EventEmitter<boolean>();

  constructor() {
  }

  public updatedView(){
    this.formularIsChecked.emit(false); 
  }


  public signIn(question: Question) {
    let key = question.id;
    if(!this.falseQuestion.has(key)){
      this.falseQuestion.set(key, question); 
      this.allChecked = false;  
    }
    this.formularIsChecked.emit(false); 
  }

  public signOut(question: Question){
    let key = question.id; 
    if(this.falseQuestion.has(key)){
      this.falseQuestion.delete(key); 
    }
    if(this.falseQuestion.size == 0){
      this.allChecked = true; 
      this.formularIsChecked.emit(true); 
    }
  }
}
