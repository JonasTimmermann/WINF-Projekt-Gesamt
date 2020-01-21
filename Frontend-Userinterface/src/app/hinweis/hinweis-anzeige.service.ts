import { Injectable, EventEmitter, AfterViewInit } from '@angular/core';

const firstText: string = "Hallo und Willkommen zum Formulartool der Stadt Kiel!"

@Injectable()
export class HinweisAnzeigeService implements AfterViewInit {
  public selectedQuestion = new EventEmitter<string>(); 
  public selectedQuestionIsMandatory = new EventEmitter<boolean>(); 

  constructor() { }

  ngAfterViewInit(): void {
    this.selectedQuestion.emit(firstText); 
    this.selectedQuestionIsMandatory.emit(null); 
  }

}
