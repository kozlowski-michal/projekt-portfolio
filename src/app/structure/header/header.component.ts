//*************************************************************************************************//
// Komponent headera.
// Zawiera menu nawigacyjne, obsługiwane przez szablon.
// Funkcja theme service zmienia motyw szablonu na ciemny
//*************************************************************************************************//
import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent  {

  constructor(private themeService: ThemeService) {}

  changeTheme(){
    this.themeService.changeTheme();
  }

}
