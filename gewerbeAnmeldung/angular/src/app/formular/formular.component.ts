import { Component, OnInit } from '@angular/core';
import { Capability } from 'protractor';
import {HttpRequestService} from '../http-request.service';


@Component({
  selector: 'app-formular',
  templateUrl: './formular.component.html',
  styleUrls: ['./formular.component.css']
})


export class FormularComponent implements OnInit {

  url = 'http://localhost:8080/person';
  //url2 = 'kp';
  deleteId: number = 1;
  url2 = 'http://localhost:8080/person/' + this.deleteId;
  
  public data: any;

  public data2: any;


  person: Person = {id:0, vorname:"Jonas", nachname: "Timmermann", geburtsdatum: "1998-02-02"};

  personUp: Person = {id:8, vorname:"JonasUPDATE", nachname: "TimmermannUp", geburtsdatum: "1996-01-01"};

  pArray: Person[] = [{id:5, vorname:"Jo", nachname: "TimmEinfuegen", geburtsdatum: "1999-02-02"}];

 
  latestId: number = 0;


  confirm: string = "";



  kontakt: KontaktInfo[] = [{vorname: 'Jonas', nachname: 'Timmermann', age: 21, street: 'Deichstraße', city: 'Uetersen', state: 'Schleswig-Holstein'}];

  name:string = "Jonas Timmermann";

 


  constructor(private api: HttpRequestService) { }





  ngOnInit() {
    
    
    
    console.log('ngOnInit ran...');


    this.kontakt[0] =  {vorname: 'Jonas', nachname: 'Timmermann', age: 21, street: 'Deichstraße', city: 'Uetersen', state: 'Schleswig-Holstein'};


    this.api
      .getPersonen(this.url)
      .subscribe(
        data => {
          console.log(data);
          this.data = data;
        },
        err => {
          console.log(err);
        }
      );

      


     
    
      /** 
        this.api.savePerson(this.url).

      return this.http
      .post(this.customersUrl, JSON.stringify(customer), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Customer)
      .catch(this.handleError);

      this.api.addPerson **/
  


  }

  
  createPerson(): void {
    
    this.api
      .getPersonen(this.url)
      .subscribe(
        data => {
          console.log(data);
          this.data = data;
        },
        err => {
          console.log(err);
        }
      );

    //this.person.id = this.data[this.data.length - 1].id + 1;
    this.api.createPerson(this.person, this.url).subscribe( data => data=> {console.log(data);this.data = data;}, err => {console.log(err);});

    this.confirm = this.person.vorname + " " + this.person.nachname +  " wurde hinzugefügt";    

  };

  deletePerson(dId: number): void {
    this.url2 = 'http://localhost:8080/person/' + this.deleteId;
    this.api.deletePerson(dId, this.url2).subscribe( data2 => data2 => {console.log(data2);this.data2 = data2;}, err => {console.log(err);});

  };


  updatePerson(): void {
    this.api.updatePerson(this.personUp, this.url).subscribe( data2 => data2 => {console.log(data2);this.data2 = data2;}, err => {console.log(err);});

  };


  getDimensionsByFind(vorname){
    console.log(vorname);
    return this.kontakt.find(x => x.vorname === vorname).vorname;
  }




  addKontaktData(data){

    let newTodo = { vorname: data.vorname, nachname: data.nachname, age: data.age, street: data.street, city: data.city, state: data.state };
    console.log(data);
    this.kontakt.unshift(newTodo);

    //return false;
  }


}

  interface KontaktInfo{
    
    vorname:string,
    nachname:string,
    age:number,
    street:string,
    city:string,
    state:string;


}

interface Person{
   
  id: number,
  vorname:string,
  nachname:string,
  geburtsdatum:string

}



