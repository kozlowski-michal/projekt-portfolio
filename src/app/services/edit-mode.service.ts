//*************************************************************************************************//
// Serwis odpowiedzialny za tryb edycji.
// Tryb edycji jest możliwy tylko pdoczas zalogowania.
// Aby nie mnożyć serwisów przejął też prostą funkcjonalność wysuwania menu użytkownika w komponencie bottomSheet.
//*************************************************************************************************//
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({ providedIn: 'root' })
export class EditModeService {

  isEditMode: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);   // Subject przechowujący ostatni stan trybu edycji
  isMenuHidden: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);  // Subject przechowujący ostatni stan wysunięcia menu użytkownika

  constructor( private authenticationService: AuthenticationService ) {
    this.authenticationService.user.subscribe({                                 // serwis nasłuchuje, czy utrzymuje się stan zalogowania
      next: ( (user) => {                                                       // w przypadku braku zalogowania 
        if (!user) this.isEditMode.next(false);
      })
    })
  }
}
