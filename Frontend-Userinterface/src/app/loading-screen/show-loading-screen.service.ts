import { EventEmitter } from '@angular/core';

/**
 * Ein Service 
 */
export class ShowLoadingScreenService {
  /**
   * EventEmitter der den Status anzeigt
   */
  public showLoading = new EventEmitter<boolean>();
  constructor() { }
  /**
   * Zeig den Loadingscreen an. Mit der Methode unshow() wird dieser geschlossen.
   */
  show(){
    this.showLoading.emit(true); 
  }
  /**
   * Schließ den Loadingscreen. 
   */
  unshow(){
    this.showLoading.emit(false)
  }
}
