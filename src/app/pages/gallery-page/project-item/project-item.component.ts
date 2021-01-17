//*************************************************************************************************//
// Dumb komponent wyświetlający kartę z pojedyńczym projektem w galerii.
// Dane przekazywane są z komponentu gallery, za pomocą dekoratora @Input(): dane o projekcie oraz, czy jest aktywny tryb edycji.
// Komponent może rejestrować prośbę o usunięcie projektu - zwraca wtedy @Output do rodzica, który obsłuży usunięcie.
// Po naciśnięciu przycisku usuń komponent upewni się, czy na pewno, za pomocą Mat Dialog.
//*************************************************************************************************//
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Project } from 'src/app/shared/models';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component'; 

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.sass']
})
export class ProjectItemComponent {

  @Input() project: Project;
  @Input() editing: boolean;
  @Output() delete = new EventEmitter<string>();

  constructor(private dialog: MatDialog) {} // serwis potwierdzający usunięcie projektu

  deleteProject(id: string): void{
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {title: this.project.name,}
    });
    dialogRef.afterClosed().subscribe(result => {
      if ( result ) this.delete.emit(id);
    });
  }
}
