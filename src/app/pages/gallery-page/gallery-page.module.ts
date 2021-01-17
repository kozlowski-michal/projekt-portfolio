import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Komponenty
import { GalleryPageComponent } from './gallery-page.component';
import { ProjectPageComponent } from './project-page/project-page.component';
import { ProjectEditPageComponent } from './project-edit-page/project-edit-page.component';
import { ProjectItemComponent } from './project-item/project-item.component';
import { ProjectItemAddComponent } from './project-item-add/project-item-add.component';
import { DialogComponent } from './dialog/dialog.component';


// Angular Material
import { MaterialModule } from '../../shared/material.module'

@NgModule({
  declarations: [
    GalleryPageComponent,
    ProjectPageComponent,
    ProjectEditPageComponent,
    ProjectItemComponent,
    ProjectItemAddComponent,
    DialogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    GalleryPageComponent,
    ProjectPageComponent,
    ProjectEditPageComponent,
    ProjectItemComponent,
    ProjectItemAddComponent,
    DialogComponent,
  ]
})
export class GalleryPageModule { }
