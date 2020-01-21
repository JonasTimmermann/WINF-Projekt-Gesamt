import { Injectable } from '@angular/core';
import { MapById, MapByTypeAndCategory, Question } from '../frage.model';

@Injectable()
export class FrageListItemService {
  public displayedQuestion: Question[] = []; 
  constructor(private mapById: MapById, private mapByType: MapByTypeAndCategory) {}

  push(id:number){
    this.displayedQuestion.push(this.mapById.get(id)); 
  }

  delete(id:number){
    let question = this.mapById.get(id);
    let position = this.displayedQuestion.indexOf(question);
    this.displayedQuestion.splice(position,0); // Suche Index 
  }
}
 