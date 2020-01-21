import { EventEmitter, Injectable, } from '@angular/core';
import { HttpService } from '../http.service';
import { Observable, of } from 'rxjs';


export class Question {
    public id: number; 
    public question: string;
    public answer: QuestionAnswer[];
    public type: QuestionType;
    public mandatory: boolean = false;
    public formular: string;
    public hint: string;
    public defaultWay: number = -1;
    public category: string;
    public lookChoices: boolean;
    public isValid: boolean = null; 
    /*
    Antworten nur mitgeben wenn DropDown oder Checkbox
    */
    constructor(id: number, question: string, type: QuestionType, formular: string, category: string, mandatory: boolean, hint?: string, answer?: QuestionAnswer[], lookChoices?: boolean, defaultWay?: number) {
        this.id = id; 
        this.question = question;
        this.type = type;
        this.formular = formular;
        this.hint = hint;
        this.defaultWay = defaultWay;
        this.category = category;
        this.mandatory = mandatory;

        if (lookChoices) {
            this.answer = answer;
            this.lookChoices = lookChoices;
        }
    }

    getAnswerObj(answer: string): QuestionAnswer {
        if (this.lookChoices) {
            let answerObj: QuestionAnswer = null;
            this.answer.forEach(element => {
                if (element.answer == answer) {
                    answerObj = element;
                    return;
                }
            });
            return answerObj
        } else {
            return null;
        }
    }

    getAnswersObj(answers: string[]): QuestionAnswer[] {
        if (this.lookChoices) {
            let answerObj: QuestionAnswer[] = [];
            this.answer.forEach(element => {
                if (answers.includes(element.answer,0)) {
                    answerObj.push(element);
                }
            });
            return answerObj
        } else {
            return null;
        }
    }
}

export class QuestionAnswer {
    public answer: string;
    public nextQuestion: number;
    constructor(answer: string, question: number) {
        this.answer = answer;
        this.nextQuestion = question;
    }
}

export enum QuestionType {
    text = "textInput",
    dropDown = "dropDown",
    checkBox = "checkBox",
    dataInput = "datenInput",
    radioButton = "radioButton",
    multipleTextInput = "multiTextInput",
    datePicker = "datumEingabe"

}
export namespace QuestionType {
    export function toArray(): { typ: String }[] {
        let types: { typ: String }[] = [
            { typ: QuestionType.text },
            { typ: QuestionType.dropDown },
            { typ: QuestionType.checkBox },
            { typ: QuestionType.dataInput },
            { typ: QuestionType.radioButton },
            { typ: QuestionType.multipleTextInput},
            { typ: QuestionType.datePicker}
        ];
        return types;
    }

    export function getTyp(typ: String): QuestionType {

        switch (typ) {
            case "textInput":
                return QuestionType.text;
            case "dropDown":
                return QuestionType.dropDown;
            case "checkBox":
                return QuestionType.checkBox;
            case "datenInput":
                return QuestionType.dataInput;
            case "radioButton":
                return QuestionType.radioButton;
            case "datumEingabe":
                return QuestionType.datePicker;
            case "multiTextInput":
                return QuestionType.multipleTextInput; 
            default:
                return null;
        }
    }
}
/**
 * * Sollten sich die Werte hier ändern, dann muss unten die Funktion
 * * angepasst werden. 
 */
@Injectable()
export class FormularType {

    private formMapByKey = new Map<number, string>();
    private formMapByName = new Map<string, number>();
    private arr: string[] = [];
    private init: boolean = false;
    constructor(private httpClient: HttpService) { }

    private initTypes() {
        this.httpClient.getAllForms().subscribe((data: any) => {
            for (let index = 0; index < data.length; index++) {
                if (data == null) {
                    throw new Error("Datenbank mit Formularen sind leer");
                }
                let form = data[index];
                this.arr.push(form.formname);
                this.formMapByKey.set(form.id, form.formname);
                this.formMapByName.set(form.formname, form.id);
            }
        })
    }

    public getAllForms(): Observable<string[]> {
        if (!this.init) {
            this.initTypes()
            this.init = true;
        }
        return of(this.arr);
    }

    public getFormById(id: number) {
        if (!this.init) {
            this.initTypes()
            this.init = true;
        }
        return this.formMapByKey.get(id);
    }

    public getIdByForm(formName: string) {
        if (!this.init) {
            this.initTypes()
            this.init = true;
        }
        return this.formMapByName.get(formName);
    }
}
/**
 * Es wäre möglich eine Klasse zu bilden die alle Kategorien erhält, die vom Server abgefragt werden.
 * TODO Dies wird aber erst getan wenn es eine Absprache mit Moritz gibt
 */
@Injectable()
export class CategoryType {

    private categoryById = new Map<number, string>();
    private categoryByName = new Map<string, number>();
    private init: boolean = false;
    private allCategories: string[] = []; 

    constructor(private httpClient: HttpService) { }

    public initMap() {
        this.httpClient.getAllCategories().subscribe((data: any) => {
            for (let index = 0; index < data.length; index++) {
                if (data == null) {
                    throw new Error("Die Datenbank zu den Kategorien ist leer");
                }
                let category = data[index];
                this.categoryById.set(category.id, category.category);
                this.categoryByName.set(category.category, category.id);
                this.allCategories.push(category.category); 
            }
        });
    }
    public getAllCategories(): Observable<string[]>{
        if (!this.init) {
            this.initMap()
            this.init = true;
        }
        return of(this.allCategories);
    }

    public getCategorynameById(id: number) {
        if (!this.init) {
            this.initMap()
            this.init = true;
        }
        return this.categoryById.get(id);
    }

    public getIdByCategoryname(name: string) {
        if (!this.init) {
            this.initMap()
            this.init = true;
        }
        return this.categoryByName.get(name);
    }
}

export interface QuestionInterface {
    AnswerEvent: EventEmitter<any>;
    getAnswer();
    checkAnswer(): boolean;
    status: boolean[];

    answerJSON; 
}

/**
 * TODO: Es gibt einen Fehler weil er den Key als Objekt betrachtet und deswegen nicht auf gleichheit 
 * TODO: testen kann. 
 * 
 * TODO Benutz JSON.String um zu erkennen ob ein Key schon drin ist. 
 */
export class MapByTypeAndCategory {
    private map = new Map<string, Question[]>();
    private keys: { formularType: string, category: string }[] = [];
    constructor() { }

    public set(key: { formularType: string, category: string }, value: Question) {
        this.testKeys(key);
        let arr = this.map.get(JSON.stringify(key));
        arr.push(value);
    }

    public get(key: { formularType: string, category: string }): Question[] {
        return this.map.get(JSON.stringify(key));
    }

    private testKeys(key: { formularType: string, category: string }) {
        if (!this.searchKey(key)) {
            this.keys.push(key);
            this.map.set(JSON.stringify(key), []);
        }
    }
    private searchKey(key: { formularType: string, category: string }): boolean {
        var found = false
        if (this.keys.length == 0) {
            return found;
        }

        this.keys.forEach((element: { formularType: string, category: string }) => {
            if (JSON.stringify(element) == JSON.stringify(key)) {
                found = true;
            }
        });
        return found;
    }

}

export class MapById {
    private map = new Map<number, Question>();

    set(questionId: number, questionObj: Question) {
        this.map.set(questionId, questionObj);
    }

    get(questionId: number) {
        return this.map.get(questionId);
    }
}
/**
 * Eine Klasse, die als Key für das Array genommen wird um auf die Liste an fragen anzuzeigen
 * TODO finde heraus wie du die gleichheitsfuntkion änderst
 */
export class KeybyType {

}
