import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
// AngularFire
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
// importy modułów narzędzi
import { SharedModule } from './shared/shared.module';
// importy komponentów
import { FooterComponent } from './structure/footer/footer.component';
import { HeaderComponent } from './structure/header/header.component';
import { WrapperComponent } from './structure/wrapper/wrapper.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { ProjectItemComponent } from './pages/gallery/project-item/project-item.component';
import { ProjectComponent } from './pages/gallery/project/project.component';
import { BottomSheetComponent } from './structure/bottom-sheet/bottom-sheet.component';
import { ProjectItemAddComponent } from './pages/gallery/project-item-add/project-item-add.component';
import { ProjectEditComponent } from './pages/gallery/project-edit/project-edit.component';
import { DialogComponent } from './pages/gallery/dialog/dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    WrapperComponent,
    AboutComponent,
    ContactComponent,
    GalleryComponent,
    ProjectItemComponent,
    ProjectComponent,
    BottomSheetComponent,
    ProjectItemAddComponent,
    ProjectEditComponent,
    DialogComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    AngularFireAuthModule,
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule {}
