//*************************************************************************************************//
// Komponent pozwalający edytować informacje o danym projekcie.
// Na podstawie id projektu pobiera go z bazy danych.
// Działa tylko, gdy działa tryb edycji (tryb edycji działa tylko po zalogowaniu).
// W razie wyjścia z trybu edycji przenosi na stronę prezentacji danego projektu.
// Po naciśnięciu przycisku usuń komponent upewni się, czy na pewno, za pomocą Mat Dialog.
//*************************************************************************************************//
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, pipe } from 'rxjs';
import { first } from 'rxjs/operators'
import { Title } from "@angular/platform-browser";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from 'src/app/shared/models';
import { DbService } from 'src/app/services/db.service'; 
import { EditModeService } from 'src/app/services/edit-mode.service';
import { InfoService } from 'src/app/services/info.service';
import { isForbidden } from './validators'
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component'; 

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.sass']
})
export class ProjectEditComponent implements OnInit {

  projectForm: FormGroup;               // większość danych z bazy zostanie przekazana do zmiennej grupy formularza
  project: Partial<Project> = {id: "", link: ""}; // jedyne dane z bazy, które nie zostaną przekazane do formularza
  links: string[] = [''];               // tablica zawierająca linki wszystkich projektów, poza naszym. Aby móc sprawdzić, czy nasz link jest unikalny
  isActive: Observable<boolean>;        // Subject z aktualnym stanem, czy jest tryb edycji

  get name() { return this.projectForm.get('name'); }     // gettery ułatwiają dostęp do zmiennych z poziomu formularza, do obsługi hintów, błędów, itp. Material Design
  get link() { return this.projectForm.get('link'); }
  get about() { return this.projectForm.get('about'); }
  get aboutShort() { return this.projectForm.get('aboutShort'); }
  get date() { return this.projectForm.get('date'); }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private editMode: EditModeService,  // serwis zarządzający trybem edycji projektów
    private db: DbService,              // serwis bazy danych
    private info: InfoService,          // serwis odpowiedzialny za wyświetlanie dymków z informacjami
    private dialog: MatDialog,          // serwis potwierdzający usunięcie projektu
    private titleService: Title,   
    ) {}

  ngOnInit(): void {
    this.isActive = this.editMode.isEditMode;     // na potrzebę szablonu przypisana zostaje informacja o trybie edycji
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      link: ['', [Validators.required, Validators.pattern('^[a-z0-9-]+$'), isForbidden(this.links) ]],
      about: ['', Validators.required, ],
      aboutShort: ['', Validators.required, ],
      date: '',
    });
    this.project.id = this.route.snapshot.paramMap.get('id'); // pobieranie id projektu z pasku adresu
    this.db.getProjects().pipe(first()).subscribe({   // pobieranie z bazy wszystkich projektów, gdyż potrzeba więcej danych...
        next: (projects) => {
          let exist: boolean = false;                         
          for (let project of projects){
            if (this.project.id === project.id) {             // ...jeśli projekt o aktualnym id zostanie znaleziony, to zostanie zachowany...
              this.projectForm.patchValue(project);
              this.project.link = project.link;
              this.titleService.setTitle(project.name);
              exist = true;                                   // ...i zostanie zapisana informacja, że taki projekt isntnieje...
            } 
            else this.links.push(project.link);               // ... jeśli to nie projekt o aktualnym id, to zostanie pobrana tylko zmienna link, by sprawdzić, czy link projektu po modyfikacji pozostanie unikalny
          }
          if (!exist) this.goBack()                           // ... a jeśli nie znaleziono projektu o id podanym w pasku adresu, to przekierowuje na stronę galerii
          this.editMode.isEditMode.subscribe({                // jeśli tryb edycji zostanie stracony, to automatycznie przekierowuje do strony prezentacji
            next: (edit) => { if (!edit) this.router.navigate(['../../projekty', this.project.link], { relativeTo: this.route })} 
          })
        },
        error: (err) => this.info.msg("Błąd bazy danych: " + err)  
      })
  }

  goBack(): void{
    this.router.navigate(['../../projekty'], { relativeTo: this.route });     // powracamy do strony galerii z wieloma projektami
  }

  update(){
    this.db.updateProject(this.project.id, this.projectForm.value)    // funkcja aktualizująca dane projektu w bazie danych
    .then( () => this.info.msg("Zapisano zmiany") )                   // wywoływana przyciskiem z szablonu, tylko jeśli formularz przeszedł walidację
    .catch( (err) => this.info.msg("Błąd zapisu: " + err)  );
  }

  delete(){
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {title: this.project.name,}
    });
    dialogRef.afterClosed().subscribe(result => {
      if ( result ) this.db.deleteProject(this.project.id)             // usunięcie naszego projektu z bazy danych
        .then( () => {
          this.info.msg("Usunięto projekt.");
          this.router.navigate(['../../projekty'], { relativeTo: this.route });
        } )                // po usunięciu baza wysyła dane, nasz projekt nie istnieje, więc przenosi nas na stronę galerii
        .catch( (err) => this.info.msg("Błąd usunięcia projektu: " + err)  );
    });
  }
}
