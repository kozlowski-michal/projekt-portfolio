import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutPageComponent } from './pages/editor-page/about-page/about-page.component';
import { ContactPageComponent } from './pages/editor-page/contact-page/contact-page.component';
import { GalleryPageComponent } from './pages/gallery-page/gallery-page.component';
import { ProjectPageComponent } from './pages/gallery-page/project-page/project-page.component';
import { ProjectEditPageComponent } from './pages/gallery-page/project-edit-page/project-edit-page.component';
import { WelcomeComponent } from './pages/static-page/welcome/welcome.component';
import { AboutThisSiteComponent } from './pages/static-page/about-this-site/about-this-site.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },       // Strona o firmie - przeglądnie i tryb edycji.  
  { path: 'info', component: AboutThisSiteComponent },       // Strona o firmie - przeglądnie i tryb edycji. 
  { path: 'pracownia', component: AboutPageComponent },       // Strona o firmie - przeglądnie i tryb edycji.
  { path: 'projekty', component: GalleryPageComponent },        // Strona galerii projektów - przeglądnie i tryb edycji.
  { path: 'projekty/:link', component: ProjectPageComponent },  // Strona pojedyńczego projektu - przeglądanie. Projekt pobierany z bazy na podstawie linku definiowanego przez użytkownika.
  { path: 'edytuj/:id', component: ProjectEditPageComponent },  // Strona pojedyńczego projektu - edycja. Projekt pobierany z bazy na podstawie id wygenerowanego przez firebase.
  { path: 'kontakt', component: ContactPageComponent },         // Strona kontaktu - przeglądnie i tryb edycji.
  //{ path: '',   redirectTo: '/pracownia', pathMatch: 'full' },
  { path: '**', redirectTo: '/pracownia', pathMatch: 'full' },  // Brak strony '404'. Przekierowuje na główną.
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
