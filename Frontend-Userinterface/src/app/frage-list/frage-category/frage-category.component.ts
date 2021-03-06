import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { CategoryType } from "../frage.model";

@Component({
  selector: 'app-frage-category',
  templateUrl: './frage-category.component.html',
  styleUrls: []
})
export class FrageCategroyComponent implements OnInit {
  @Input() categories: string[]; 
  @Output() selectedCategory = new EventEmitter<string>(); 
  @ViewChild('selectOption',null) selectOption: ElementRef; 

  constructor(private categoryService: CategoryType) { 
  }

  ngOnInit() {
  }

  selectAnswer(event: Event){
    let value = (<HTMLInputElement> event.target).value; 
    this.selectedCategory.emit(value); 
  }

  setToDefault(){
    this.selectOption.nativeElement.selectedIndex = 0; 
  }


}
