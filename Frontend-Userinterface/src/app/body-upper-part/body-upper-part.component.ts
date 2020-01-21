import { Component, OnInit } from '@angular/core';
import { AntragtextService } from './antragtext.service';

@Component({
  selector: 'app-body-upper-part',
  templateUrl: './body-upper-part.component.html',
  styleUrls: ['./body-upper-part.component.css']
})
export class BodyUpperPartComponent implements OnInit {
  statusShowText = false; 
  shownText: string; 
  constructor(public anzeigeService: AntragtextService) { }

  ngOnInit() {
    this.anzeigeService.shownText.subscribe(text => {
      this.shownText = text;
      this.statusShowText = true;}); 
  }

}
