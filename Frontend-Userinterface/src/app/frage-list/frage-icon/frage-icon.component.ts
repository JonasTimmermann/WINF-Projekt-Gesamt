import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IconFrage, FormularTyp } from "../frage.model";

@Component({
  selector: 'app-frage-icon',
  templateUrl: './frage-icon.component.html',
  styleUrls: []
})
export class FrageIconComponent implements OnInit {
  @Input() formular: FormularTyp; 
  @Output() iconClicked = new EventEmitter<IconFrage>(); 
  icons: IconFrage[] = new Array<IconFrage>(); 
  constructor() { 
    this.icons.push(new IconFrage("../../../assets/icon-Gruenflaechenfeier.png",FormularTyp.freiluftveranstaltung, "gruenflaechenveranstaltung")); 
    this.icons.push(new IconFrage("../../assets/Gewerbe/kleingewerbe.png", FormularTyp.gewerbeAnmeldung, "kleingewerbe")); 
    this.icons.push(new IconFrage("../../assets/Gewerbe/gewerbe.png",FormularTyp.gewerbeAnmeldung,"gewerbe"));
  }

  ngOnInit() {
  }

  isClicked(icon: IconFrage){
      this.iconClicked.emit(icon); 
  }

}
