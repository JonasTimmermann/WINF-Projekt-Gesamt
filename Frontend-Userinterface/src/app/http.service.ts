import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormularType } from './frage-list/frage.model';
import { Injectable } from '@angular/core';

// * https://meinformular.herokuapp.com/frage wurde eingefügt zum Testen 
// https://meinveranstaltungsformular.herokuapp.com/forms/all
const url:string = "https://meinveranstaltungsformular.herokuapp.com"; 
const questionUrl: string = "/fragen";
const typeUrl: string = "/type"; 
const categoryUrl: string = "/category"; 
const formsUrl: string = "/forms"; 


const httpHeader = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
/**
 * Ein Http-Service, der eine Anfrage an den Server stellt. Die Serverurl ist in der Konstante
 * "url" enthalten. 
 */
@Injectable() 
export class HttpService{

  constructor(private httpClient: HttpClient) {}


   getAllCategories(){
    let urlVar = url + categoryUrl + "/all";
    return this.httpClient.get(urlVar); 
   }
   
   getAllForms(){
     let urlVar = url + formsUrl + "/all"; 
     return this.httpClient.get(urlVar);  
   }

   getQuestions(){
     let urlVar = url + questionUrl;
     return this.httpClient.get(urlVar, httpHeader); 
   }

   getQuestionById(id: number){
     let urlVar = url + questionUrl + "/" + id.toString(); 
     return this.httpClient.get(urlVar, httpHeader); 
   }

   getQuestionsByFormtype(formType: string){
     // TODO:  Frag Moritz, ob wir nun deine Enums benutzen oder nicht
    let urlVar = url + typeUrl + "/"+ formType; 
    return this.httpClient.get(urlVar, httpHeader);
   }
   // TODO Vllt eine bessere Enumklasse ausdenken, mom als Abstract klasse
   getQuestionsByCategory(category: string){
    let urlVar = url + categoryUrl + "/" + category; 
    return this.httpClient.get(urlVar, httpHeader); 
   }

   getQuestionsByFormtypeAndCategory(formType: FormularType, category: string){
     let urlVar = url + typeUrl + "/" + formType + categoryUrl + "/" + category; 
     return this.httpClient.get(urlVar, httpHeader); 

   }

   sendAllAnswer(formsId: number, answers: string){
     let urlVar = url + formsUrl + "/"+ formsId + "/answers/all/add"; 
     let test = "https://ptsv2.com/t/Laukar/post"

     let header =  new HttpHeaders({
      'Content-Type':  'text/plain',
    });
     return this.httpClient.post(test,answers,{headers: header});
   }

   getFirstQuestion(formId: number, categoryId: number){
    let urlVar = url + "/form" + "/"+formId +categoryUrl+ "/"+ categoryId+ "/findstart"; 
    console.log("die Anfrage", urlVar); 
    return this.httpClient.get(urlVar,httpHeader); 
   }


}
