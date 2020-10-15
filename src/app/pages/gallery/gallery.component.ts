//*************************************************************************************************//
// Komponent wyświetlający zbiorczą galerię projektów.
// Służy do wyświetlania i edycji kolejności projektów - jeśli tryb edycji jest włączony.
// Można także usuwać i dodawać nowe projekty.
// W razie wyjścia z trybu edycji przenosi na stronę prezentacji danego projektu.
//*************************************************************************************************//
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators'
import { Title } from "@angular/platform-browser";
import { DbService } from '../../services/db.service'; 
import { EditModeService } from 'src/app/services/edit-mode.service';
import { Project, newProject } from '../../shared/models';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { InfoService } from 'src/app/services/info.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.sass']
})

export class GalleryComponent implements OnInit {

  newProject: Project = newProject;     // pusty projekt
  projects: Project[];                // tablica wszystkich projektów pobranych z bazy
  isActive: Observable<boolean>;        // Subject z aktualnym stanem, czy jest tryb edycji

  constructor(
    private editMode: EditModeService,  // serwis zarządzający trybem edycji projektów
    private db: DbService,              // serwis bazy danych
    private info: InfoService,          // serwis odpowiedzialny za wyświetlanie dymków z informacjami
    private titleService: Title,
    ) {}
 
  ngOnInit(): void {
    this.titleService.setTitle("Galeria projektów");
    this.isActive = this.editMode.isEditMode;     // na potrzebę szablonu przypisana zostaje informacja o trybie edycji
    this.getProjects();                           // przy tworzeniu komponentu trzeba pobrać projekty z bazy
  }

  getProjects(): void{  // funkcja powstała, by pobierać dane z bazy tylko, gdy jest taka potrzeba
    this.db.getProjects().pipe(first()).subscribe({  // pobieranie z bazy wszystkich projektów
      next: ( (projects) => {
          this.projects = projects;
          this.projects.sort( (o1, o2) => (o1.order > o2.order) ? 1 : -1 );  // sortowanie, by wyświetlały się w kolejności order - określonej przez użytkownika w trybie edycji
        }),
      error: (err) => this.info.msg("Błąd bazy danych: " + err) 
      });
  }

  add(): void{                                                              // dodawanie nowego projektu - utworzenie projektu w galerii z początkowymi danym
    this.newProject.order = this.projects.length;                           // nadawanie parametru order, projekt jest tworzony jako ostatni na liście sortowania
    this.newProject.link= "nowy-projekt";                                           // nadawanie linku projektu
    while( this.projects.find( (project) => (project.link == this.newProject.link)) ){   //sprawdzanie, czy link nie jest już zajęty
      this.newProject.link += "-";                                              //jeśli tak to, finezyjnie, dodanie kreski na końcu
    }
    this.projects.push(Object.assign({id: null}, this.newProject));       // tymaczasowe dodanie projektu. Pobranie z bazy nadpisze go poprawnymi danymi. Potrzebne, by zbyt szybkie dodadnie kolejnego projektu, widziało ten porpzedni.
    this.db.addProject(this.newProject)
      .then( () => this.getProjects()
      )                                     // po dodaniu projektu pobieramy dane z bazy wraz znowym projektem i id
      .catch( (err) => this.info.msg("Wystąpił błąd: " + err) );
  }

  delete(id: string): void{                                                     // usunięcie wybranego projektu z bazy, identyfikując go po id zwróconym przez child component
    let orderToDelete = this.projects.find( (project) => (project.id == id)).order;  // zapisanie parametru order usuwanego projektu...
    this.db.deleteProject(id)                                                        // ... usunięcie projektu z bazy...
      .then( () => {
        this.info.msg("Usunięto z bazy");
        this.projects.splice(orderToDelete, 1);                                      // ... usunięcie projektu ze zmiennej projektów...
        for (let i = orderToDelete; i < this.projects.length; i++){              // ... dla każdego projektu o większym order od usuniętego zaktualizowanie nowego order...
          this.projects[i].order = i;
          this.db.updateProject(this.projects[i].id, {order: this.projects[i].order}) // ... i aktualziacja tych projektów do bazy danych
            .catch( (err) => { 
              this.info.msg("Wystąpił błąd: " + err);
              this.getProjects();                                                     // dane z bazy pobieramy tylko w wypadku błedu, by były spójne
            });                
        }
      })
      .catch( (err) => this.info.msg("Wystąpił błąd: " + err) );
  }

  drop(event: CdkDragDrop<string[]>) {                                          // funkcja zapewniająca funkcjonalność zmiany kolejności wyświetlania projektów za pomocą przeciągani ich w trybie edycji
    moveItemInArray(this.projects, event.previousIndex, event.currentIndex);    // funkcja zapewniona przez Drag-Drop od Angular Material
    for (let i=0; i<this.projects.length; i++)                                  // po każdym przeciągnięciu projekty dostają nowy order od 0 do i - 1
      this.projects[i].order=i;
    for (let project of this.projects)                                          // ... order zostaje zaktualizowane w bazie danych
      this.db.updateProject(project.id, {order: project.order});                // ale nie pobieramy zaktualizowanych danych, gdyż na stronie mamy ten sam stan
  }
}
