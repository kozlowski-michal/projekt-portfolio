//*************************************************************************************************//
// Komponent wyświetlający tekst opisujący firmę.
// Jako, że jest tylko jedna dana(?) - nie ma skomplikowanych funkcjonalności.
// Dlatego na tej samej stronie można edytować ten tekst.
// Za pomocą CKedytora tekst dostaje proste style, jest wyświetlany jako html.
// Dane do/i z szablonu przekazywane są za pomocą ngModel
//*************************************************************************************************//
import { Component, OnInit } from '@angular/core';
import { EditModeService } from '../../../services/edit-mode.service';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators'
import { Title } from "@angular/platform-browser";
import { DbService } from '../../../services/db.service'; 
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { InfoService } from '../../../services/info.service';
import { CKEconfig } from '../cke-config';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.sass']
})
export class ContactPageComponent implements OnInit {

  contactText: string = "";       // tekst wyświetlany na stronie, formatowany przez prosty edytor
  isActive: Observable<boolean>;  // serwis zarządzający trybem edycji projektów, lub tylko ich przeglądaniem
  Editor: ClassicEditor = ClassicEditor;  // narzędzie edytora tekstu
  config = CKEconfig;               // konfiguracja edytora tekstu

  constructor(
    private editMode: EditModeService,  // serwis zarządzający trybem edycji projektów
    private db: DbService,              // serwis bazy danych
    private info: InfoService,          // serwis odpowiedzialny za wyświetlanie dymków z informacjami
    private titleService: Title,        
    ) {}

    ngOnInit(): void {
      this.titleService.setTitle("Kontakt z Pracownią");
      this.isActive = this.editMode.isEditMode;
      this.db.getContact().pipe(first()).subscribe({    // pobieranie z bazy danych informacji kontaktowych
        next: (text) => {
          if (text.exists) this.contactText = text.data().text
          else this.info.msg("Dane nie istnieją")
        },
        error: (err) => this.info.msg("Błąd bazy danych: " + err)
      });
    }

  update(){
    this.db.updateContact({text: this.contactText})       // zaktualizowanie informacji kontaktowych do bazy danych
    .then( () => this.info.msg("Zapisano zmiany.") )
    .catch( (err) => this.info.msg("Błąd zapisu: " + err) );
  }
}
