import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Komponenty
import { AboutPageComponent } from './about-page/about-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
// Edytor Tekstu
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
// Angular Material
import { MaterialModule } from '../../shared/material.module'

@NgModule({
  declarations: [
    AboutPageComponent,
    ContactPageComponent,
  ],
  imports: [
    CommonModule,
    CKEditorModule,
    MaterialModule,
  ],
  exports: [
    AboutPageComponent,
    ContactPageComponent, 
  ]
})
export class EditorPageModule { }
