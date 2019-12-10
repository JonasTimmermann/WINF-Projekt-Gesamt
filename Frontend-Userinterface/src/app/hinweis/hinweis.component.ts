import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-hinweis',
  templateUrl: './hinweis.component.html',
  styleUrls: ['./hinweis.component.css']
})
export class HinweisComponent implements OnInit {
  @Input() note: String;
  @ViewChild('bodyVonHinweis', null) body: ElementRef;

  constructor() { }

  ngOnInit() {
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
