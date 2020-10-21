//*************************************************************************************************//
// Komponent panelu użytkownika
// Pozwala się zalogować, odpalić tryb edycji, zmienić hasło
//*************************************************************************************************//
import { Component, OnInit } from '@angular/core';
import { User } from 'firebase';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { EditModeService } from 'src/app/services/edit-mode.service';
import { InfoService } from 'src/app/services/info.service';

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.sass']
})
export class BottomSheetComponent implements OnInit {

  isHidden: Observable<boolean>;  // czy menu jest schowane, czy wysunięte
  password: string;               // hasło wpisywane przez użytkownika
  user: Observable<User>;         // zmienna użytkownika serwisu logowania               
  sliderState: boolean;           // stan przycisku

  constructor(
    private authenticationService: AuthenticationService,   // serwis logowania
    private editSerive: EditModeService,                    // seris trybu edycji
    private info: InfoService,                              // serwis odpowiedzialny za wyświetlanie dymków z informacjami
    ) {}

  ngOnInit(): void {
    this.isHidden = this.editSerive.isMenuHidden;
    this.user = this.authenticationService.user;
    this.sliderState = this.editSerive.isEditMode.value;
  }
 
  toggleEditing(): void{            // funkcja włączająca/wyłączająca tryb edycji.
    this.editSerive.isEditMode.next(!this.sliderState);
  }

  login(): void{
    this.authenticationService.login(this.password)
    .then( () => { 
      this.sliderState = this.editSerive.isEditMode.value;
      this.password = "";
      this.info.msg("Zalogowano!");
    })
    .catch(err => this.info.msg("Nie udało się zalogować: " + err) );
  }

  logout(): void{
    this.authenticationService.logout()
    .then( () => this.info.msg("Wylogowano!") )
    .catch(err => this.info.msg("Nie udało się wylogować: "+ err) );

  }

  resetPass(): void{
    this.authenticationService.reset()
    .then( () => this.info.msg("Wysłano instrukcje zmiany hasła na przypisany adres email.") )
    .catch(err => this.info.msg("Nie udało się ukończyć prośby o zmianę hasła: "+ err) );
  }
}
