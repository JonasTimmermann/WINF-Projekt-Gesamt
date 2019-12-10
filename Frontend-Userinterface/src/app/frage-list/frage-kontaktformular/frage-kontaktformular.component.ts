import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-frage-kontaktformular',
  templateUrl: './frage-kontaktformular.component.html',
  styles: []
})
export class FrageKontaktformularComponent implements OnInit {
  isCompany: boolean = false; 
  needCompany: boolean = true; s
  constructor() { }

  ngOnInit() {
  }

}
