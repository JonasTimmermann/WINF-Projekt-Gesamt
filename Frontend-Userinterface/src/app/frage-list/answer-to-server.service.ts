import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';

@Injectable()
export class AnswerToServerService {

  private fromTypeId : number = null; 
  private filesToUpload: {questionId: number, formdata:FormData}[] = []; 
  private answerMap: Map<number,string> = new Map<number,string>(); 
  private fileMap: Map<number, FormData> = new Map<number, FormData>(); 
  constructor(private httpClient: HttpService) { }

  changeFormtype(formType : number){
    this.fromTypeId = formType; 
    this.answerMap.clear(); 
  }

  addAnswer(questionId: number ,answer: string, fileUpload?: boolean, formdata?: FormData){
    if(answer == null|| questionId == null){
      throw Error("JSON Objekt ist leer"); 
    }
    if(!this.answerMap.has(questionId)){
    this.answerMap.set(questionId,answer); 
    }else{
      this.answerMap.delete(questionId);
      this.answerMap.set(questionId,answer); 
    }
    if(fileUpload){
      this.fileMap.set(questionId,formdata); 
    }
  }

  startSending(filledFormId:number){
    let arr = this.getArray();
    let jsonArray = []
    arr.forEach(element=> {
      jsonArray.push(JSON.parse(element)); 
    })
    console.log("Sending", jsonArray); 

    this.httpClient.sendAllAnswer(filledFormId,jsonArray).subscribe(()=>{},(data) =>{
      this.startSendingFiles(filledFormId); 
    }); 

  }
  startSendingFiles(filledFormId: number) {
    if(this.fileMap.size > 0){
      this.fileMap.forEach((value:FormData,key:number)=>{
        this.httpClient.sendFile(filledFormId,value,key); 
      })
    }
    
  }

  private getArray(){
    let arr: string[] = []; 
    this.answerMap.forEach((value:string)=>{arr.push(value);}); 
    return arr; 
  }
}
