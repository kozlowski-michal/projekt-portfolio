//*************************************************************************************************//
// Komponent wyświetlający informacje szczegółowe danego projektu.
// Na podstawie końcówki adresu pobiera projekt z bazy danych.
// Nie używa id w adresie projektu, ze względu na estetykę, zakładki, pozycjonowanie...
//*************************************************************************************************//
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators'
import { Title } from "@angular/platform-browser";
import { Project } from 'src/app/shared/models';
import { EditModeService } from 'src/app/services/edit-mode.service';
import { DbService } from 'src/app/services/db.service';
import { InfoService } from 'src/app/services/info.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.sass']
})
export class ProjectComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private editMode: EditModeService,  // serwis zarządzający trybem edycji projektów lub tylko ich przeglądaniem
    private db: DbService,              // serwis bazy danych
    private info: InfoService,          // serwis odpowiedzialny za wyświetlanie dymków z informacjami
    private titleService: Title,
    ) {}

  project: Partial<Project> = {};   // projekt, który aktualnie wyświetlamy; Początkowo pusty, dane zostaną pobrane asynchronicznie z bazy danych      
  projectLink: string;                // zmienna adresu przypisana aktualnie wyświetlanemu projektowi, na jej podstawie zostaną pobrane dane 
  isActive: Observable<boolean>;      // zmienna trybu edycji; gdy przyjmie wartość true, znaczy, że wchodzimy w tryb edycji => następuje przekierowanie na stronę edycji

  ngOnInit(): void {
    this.projectLink = this.route.snapshot.paramMap.get('link');                // pobranie linka projektu z paska adresu...
    this.db.getProjectByLink(this.projectLink).pipe(first()).subscribe({    // ...i prośba do bazy danych o projekt z pod tego linku
        next: ((projects) => {
          [this.project] = projects;                                            // funkcja zwraca tablicę projektów, która w tym wypadku zawiera tylko jeden element, gdyż link jest unikalny
          this.editMode.isEditMode.subscribe( (edit) => {                       // jeśli tryb edycji zostanie włączony, to subskrybcja przekieruje na stronę edycji
            if (edit == true) this.router.navigate(['../../edytuj', this.project.id], { relativeTo: this.route });
          this.titleService.setTitle(this.project.name);
          })
        }),
        error: (err) => this.info.msg("Błąd bazy danych: " + err)  
      });
  }

  goBack(): void{
    this.router.navigate(['../../projekty'], { relativeTo: this.route });   // powrót do strony galerii z wieloma projektami
  }

}