import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// importy modułów stron
import { EditorPageModule } from './pages/editor-page/editor-page.module';
import { GalleryPageModule } from './pages/gallery-page/gallery-page.module';
import { StaticPageModule } from './pages/static-page/static-page.module';
// importy komponentów struktury strony
import { StructureModule } from './structure/structure.module';
// angular material
import { MaterialModule } from './shared/material.module'


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    EditorPageModule,
    GalleryPageModule,
    StructureModule,
    StaticPageModule,
    MaterialModule,
  ],
  bootstrap: [AppComponent],
  exports: [
    MaterialModule,
  ]
})
export class AppModule {}
