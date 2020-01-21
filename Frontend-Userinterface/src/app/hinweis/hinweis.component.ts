import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { HinweisAnzeigeService } from './hinweis-anzeige.service';

@Component({
  selector: 'app-hinweis',
  templateUrl: './hinweis.component.html',
  styleUrls: ['./hinweis.component.css']
})
export class HinweisComponent implements OnInit {
  displayedHint: string;
  isMandatory: boolean;
  @ViewChild('bodyVonHinweis', null) body: ElementRef;

  constructor(private noteService: HinweisAnzeigeService) { }

  ngOnInit() {
    this.noteService.selectedQuestion.subscribe((hint: string) => {
      this.displayedHint = hint;
    })

    this.noteService.selectedQuestionIsMandatory.subscribe((decision: boolean) => {
       this.isMandatory = decision; 
      })
  }

  onMove() {
    console.log("Funktion wird aufgerufen ")
    if (window.screenTop > 100) {
      //begin to scroll
      this.body.nativeElement.position = 'fixed';
      this.body.nativeElement.top = 0;
    }
    else {
      //lock it back into place
      this.body.nativeElement.position = 'relative';
    }
  }

}
