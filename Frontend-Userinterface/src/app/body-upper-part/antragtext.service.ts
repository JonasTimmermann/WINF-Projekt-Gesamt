import { EventEmitter } from '@angular/core';

export class AntragtextService {
  showText: boolean = false; 
  shownText = new EventEmitter<string>(); 

  constructor() { }

  changeShownText(text: string){
    //! ändern nicht vergessen 
    // TODO Änder
    this.shownText.emit(text); 
    this.showText = true; 
  }
  text: string = `<h3 class="text-center"> Antrag auf Sondernutzung einer öffentlichen Grünfläche. </h3>
  <p class="lead"> Die Nutzung der öffentlichen Grünflächen der Landeshauptstadt Kiel wird
      durch die <a href="https://www.kiel.de/de/_data/ortsrecht_bekanntmachungen/root/download.php?typ=lf&fid=401ba78e79289bd8094d5a7f9e211255">Satzung zum Schutz der öffentlichen Grünanlagen vom 09.04.1984</a>
      in ihrer jeweils gültigen Fassung geregelt. Laut § 2 dieser Satzung dürfen die öffentlichen
      Grünanlagen so benutzt werden, wie es sich aus der Natur der Anlagen und ihrer Zweckbestimmung ergibt."
      Die öffentlichen Grün- und Parkanlagen dienen vorrangig der Erholung und stellen zudem
      einen Ausgleich zu den vielfältigen Umweltbelastungen der Stadt dar. Darüber hinaus bieten
      die Grünflächen Lebensraum für heimisch Tier- und Pflanzenarten, die es zu schützen gilt.
      Das Grünflächenamt kann im Einzelfall eine anderweitige Benutzung der öffentlichen Grünfläche
      durch die Erteilung einer Sondernutzungserlaubnis genehmigen, sofern kein überwiegendes öffentliches
      Interesse dem Vorhaben entgegenstehen. </p>
  <p class="lead"><strong> Bitte beachten Sie, dass der Antrag auf die Erteilung einer Sondernutzungserlaubnis
          mindestens 4-6 Wochen vor dem Veranstaltungstermin gestellt werden muss. </strong></p>
  <p class="lead"> Um eine unnötige Verzögerung der Bearbeitung zu vermeiden, empfehlen wir, das
      Antragsformular möglichst vollständig und detailliert auszufüllen. Nehmen Sie bitte
      auch zur Kenntnis, dass ein Antrag auch bei einer möglichen Ablehnung gebührenpflichtig ist.
      Über eine etwaige Gebührenbefreiung informieren Sie sich bitte hier: <a href="https://www.kiel.de/de/_data/ortsrecht_bekanntmachungen/root/download.php?typ=lf&fid=5d6965377eac08a6bb2b989b77d9df0c">Verwaltungsgebührensatzung</a>.
      Die Sondernutzung der Grünfläche ohne die erforderliche Erlaubnis sowie Verstöße gegen erteilte Auflagen
      der Erlaubnis erfüllen den Tatbestand einer Ordnungswidrigkeit, welche mit einer Geldbuße beahndet
      werden können.
  </p>
  `
}
