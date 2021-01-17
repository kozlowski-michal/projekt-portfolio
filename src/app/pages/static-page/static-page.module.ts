import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome/welcome.component';
import { AboutThisSiteComponent } from './about-this-site/about-this-site.component';
// Angular Material
import { MaterialModule } from '../../shared/material.module'

@NgModule({
  declarations: [WelcomeComponent, AboutThisSiteComponent],
  imports: [
    CommonModule,
    MaterialModule,
  ]
})
export class StaticPageModule { }
