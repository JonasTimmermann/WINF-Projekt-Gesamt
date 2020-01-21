import { Component, OnInit, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { ShowLoadingScreenService } from './show-loading-screen.service';

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.css']
})
export class LoadingScreenComponent implements OnInit {
  showStatus = false;
  startToExecute = new EventEmitter<boolean>();
  @ViewChild('loadingScreen', { static: true }) LoadingHTML: ElementRef;
  constructor(private loadingScreen: ShowLoadingScreenService) { }

  ngOnInit() {
    this.loadingScreen.showLoading.subscribe(status => {
      this.changeStatus(status);
    })
    // @ts-ignore
    $("#loadingScreen").on(shown.bs.modal, function (e) {
      let att = document.createAttribute("shownExecute");
      console.log("galloskdma")
      att.value = "true";
      this[0].setAttributeNode(att);
    });
    // @ts-ignore
    $("#loadingScreen").on(hidden.bs.modal, function (e) {
      this.setAttribute("shownExecute", "false")
    });
  }

  changeStatus(status: boolean) {
    this.showStatus = status;
    if (this.showStatus) {
      console.log("Loadingscreen geht an");
      // @ts-ignore
      $("#loadingScreen").modal('show');
      //this.LoadingHTML.nativeElement.modal('show');
    } else {
      console.log("loadingscreen geht aus");
      let end = false;
      while (!end) {
        console.log($("#loadingScreen")); 
        // @ts-ignore
        let status = $("#loadingScreen").shownExecute;
        if (status == "true") {
          // @ts-ignore
          $("#loadingScreen").modal('hide');
          end = true; 
        }
      }
      //this.LoadingHTML.nativeElement.modal('hide');
    }

  }

}
