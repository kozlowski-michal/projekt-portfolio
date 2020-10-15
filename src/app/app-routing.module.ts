import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { ProjectComponent } from './pages/gallery/project/project.component';
import { ProjectEditComponent } from './pages/gallery/project-edit/project-edit.component';

const routes: Routes = [
  { path: 'pracownia', component: AboutComponent },         // Strona o firmie - przeglądnie i tryb edycji.
  { path: 'projekty', component: GalleryComponent },        // Strona galerii projektów - przeglądnie i tryb edycji.
  { path: 'projekty/:link', component: ProjectComponent },  // Strona pojedyńczego projektu - przeglądanie. Projekt pobierany z bazy na podstawie linku definiowanego przez użytkownika.
  { path: 'edytuj/:id', component: ProjectEditComponent },  // Strona pojedyńczego projektu - edycja. Projekt pobierany z bazy na podstawie id wygenerowanego przez firebase.
  { path: 'kontakt', component: ContactComponent },         // Strona kontaktu - przeglądnie i tryb edycji.
  { path: '',   redirectTo: '/pracownia', pathMatch: 'full' },
  { path: '**', redirectTo: '/pracownia', pathMatch: 'full' },  // Brak strony '404'. Przekierowuje na główną.
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
