import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-privacy-decision',
  templateUrl: './privacy-decision.component.html',
  styleUrls: ['./privacy-decision.component.css']
})
export class PrivacyDecisionComponent implements OnInit, AfterViewInit {
  @ViewChild('popUp',null) popUp: ElementRef;
  //Varibale um zu sehen, ob die Anweisung gesehen wurde
  protected privacySeen: boolean = true; 
  // Varibale 
  protected privacyDecision: boolean = false; 

  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit(){
    //this.popUp.nativeElement.modal.keyboard = false;
    // * Es steht zwar, dass das Modul nicht gefunden wurde, aber es geht trotzdem. 
    //this.popUp.nativeElement.modal('show'); 
    //! Wenn PopUp nervt hier austellen 
    // @ts-ignore
    //$("#datenschutzPopUp").modal("show")
    //this.popUp.nativeElement.modal({keyboard: false,backdrop:"static",focus:true})
  }

  okDecision(){
    this.privacySeen= true; 
    this.privacyDecision = false; 
  }

}
