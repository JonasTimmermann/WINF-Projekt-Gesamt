import { Component, OnInit, Input, EventEmitter, ViewChild, ElementRef, Output } from '@angular/core';
import { FrageInterface } from '../../frage.model';

@Component({
  selector: 'app-frage-check-box',
  templateUrl: './frage-check-box.component.html',
  styleUrls: []
})
export class FrageCheckBoxComponent implements OnInit, FrageInterface {
  @ViewChild('divCheckbox', null) checkbox: ElementRef;
  @Output() NoteEvent: EventEmitter<String> = new EventEmitter<String>();
  @Output() AnswerEvent: EventEmitter<String[]> = new EventEmitter<String[]>();
  status: boolean[] = [false, false];
  @Input() header: String;
  @Input() note: String;
  @Input() possibleAnswer: String[];

  selectedAnswer: String[] = [];

  constructor() { }

  ngOnInit() {
  }

  updateNote() {
    this.NoteEvent.emit(this.note);
  }

  getAnswer() {
    if (this.checkAnswer()) {
      this.status[0] = true;
      this.status[1] = false;

      this.AnswerEvent.emit(this.selectedAnswer);
    } else {
      this.status[0] = false;
      this.status[1] = true;

      this.AnswerEvent.emit(null);
    }

  }
  //Muss getestet werden. 
  checkAnswer(): boolean {
    let children = this.checkbox.nativeElement.children;
    let length = this.checkbox.nativeElement.children[1].length;
    let someChecked: boolean = false;
    for (let index = 1; index < length; index++) {
      let div = children[1];
      let input = div.children[index];
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
