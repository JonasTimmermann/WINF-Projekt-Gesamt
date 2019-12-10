import { EventEmitter } from '@angular/core';



export class Frage {
    public frage: string;
    public antworten: string[];
    public typ: FrageTyp;
    public kategorie: FormularTyp;
    public note: String

    /*
    Antworten nur mitgeben wenn DropDown oder Checkbox
    */
    constructor(frage: string, typ: FrageTyp, kategorie: FormularTyp, antworten?: string[], note?: String) {
        this.frage = frage;
        this.typ = typ;
        this.kategorie = kategorie;
        this.note = note; 

        if(this.typ == FrageTyp.dropDown || this.typ == FrageTyp.checkBox){
            this.antworten = antworten; 
        }
    }
}

export enum FrageTyp{
    text = "Text",
    dropDown = "Dropdown",
    checkBox = "Checkbox",
    dataInput = "Dateninput",
    // Neue FrageTypen 
    multipleTextInput = "MultipleTextInput",
    radioButton = "Radiobutton",
    datum = "Datumeingabe"

}
export namespace FrageTyp{
    export function toArray(): {typ: String}[]{
        let types: {typ: String}[] = [
            {typ: FrageTyp.text},
            {typ: FrageTyp.dropDown}, 
            {typ: FrageTyp.checkBox}, 
            {typ: FrageTyp.dataInput}
        ]; 
         return types; 
    }

    export function getTyp(typ: String): FrageTyp{

        switch (typ) {
            case "TEXT":
                return FrageTyp.text;
            case "DROPDOWN":
                return FrageTyp.dropDown; 
            case "CHECKBOX":
                return FrageTyp.checkBox;
            case "INPUT":
                return FrageTyp.dataInput; 
            default:
                return null; 
        }
    }
}

export enum FormularTyp{
    //hier kommen alle Formulare rein
    gewerbeAnmeldung = "GEWERBEANMELDUNG",
    freiluftveranstaltung = "FREILUFTVERANSTALTUNG", 
}
export namespace FormularTyp{
    export function toArray(): {value: FormularTyp, anzeige: String}[]{
        let formulare: {value: FormularTyp, anzeige: String}[] = [
            {value: FormularTyp.gewerbeAnmeldung, anzeige: "Gewerbe anmelden"},
            {value: FormularTyp.freiluftveranstaltung, anzeige: "Freiluftveranstaltung anmelden"}
        ]; 
        return formulare; 
    }

    export function getTyp(typ:String): FormularTyp{
        switch (typ) {
            case "GEWERBEANMELDUNG":
                return FormularTyp.gewerbeAnmeldung;
            case "FREILUFTVERANSTALTUNG": 
            return FormularTyp.freiluftveranstaltung; 
            default:
                break;
        }
    }
}

export class IconFrage {
    public src: String;
    public type: FormularTyp;
    public category: String;

    constructor(src: String, type: FormularTyp, category: String) {
        this.src = src;
        this.type = type;
        this.category = category;
    }
}

export interface FrageInterface {
    AnswerEvent: EventEmitter<any>;
    getAnswer();
    checkAnswer(): boolean;
    status: boolean[];

}
