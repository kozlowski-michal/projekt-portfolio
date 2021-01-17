import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { environment } from '../../environments/environment';
// Komponenty
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { WrapperComponent } from './wrapper/wrapper.component';
import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';
// Angular Material
import { MaterialModule } from '../shared/material.module'
// AngularFire
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';


@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    WrapperComponent,
    BottomSheetComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    CommonModule,
    RouterModule,
    MaterialModule,
  ],
  providers: [AngularFirestore],
  exports: [
    WrapperComponent,
  ]
})
export class StructureModule { }
