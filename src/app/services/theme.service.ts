//*************************************************************************************************//
// Serwis odpowiedzialny za zmianę motywu na jasny/ciemny
// Powstał jako test funkcjonalności Angular Material
// Maksymalnie uproszczony do 2 motywów: jasnego i ciemnego, przechowuje tylko zmienną typu boolean,
// która określa, czy ciemny motyw został aktywowany (false znaczy jasny motyw aktywny)
//*************************************************************************************************//
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  constructor() {}

  private themeSub = new BehaviorSubject<boolean>(false);   // Subject, który domyślnie przechowuje false - tzn., że nie używamy ciemnego motywu
  isDarkTheme = this.themeSub.asObservable();               

  changeTheme(){
    this.themeSub.next(!this.themeSub.getValue());          // funkcja zmieniająca motyw - pobiera poprzednią wartość subjecta i wstawia zaprzeczenie
  }
}
