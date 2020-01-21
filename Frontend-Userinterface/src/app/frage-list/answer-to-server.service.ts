import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';

@Injectable()
export class AnswerToServerService {

  private fromTypeId : number = null; 
  private answerMap: Map<number,string> = new Map<number,string>(); 
  constructor(private httpClient: HttpService) { }

  changeFormtype(formType : number){
    this.fromTypeId = formType; 
    this.answerMap.clear(); 
  }

  addAnswer(questionId: number ,answer: string){
    if(answer == null|| questionId == null){
      throw Error("JSON Objekt ist leer"); 
    }
    if(!this.answerMap.has(questionId)){
    this.answerMap.set(questionId,answer); 
    }else{
      this.answerMap.delete(questionId);
      this.answerMap.set(questionId,answer); 
    }
  }

  startSending(){
    let arr = this.getArray(); 
    let see = arr.toString(); 
    return this.httpClient.sendAllAnswer(this.fromTypeId,arr.toString()); 
  }

  private getArray(){
    let arr: string[] = []; 
    this.answerMap.forEach((value:string)=>{arr.push(value);}); 
    return arr; 
  }
}
