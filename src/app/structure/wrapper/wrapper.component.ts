//*************************************************************************************************//
// Komponent zbierający wszystkie elementy strony. 
// Powstał by logika globalnej zmiany motywu została wyprowadzona z AppComponent.
// Zmiana motywu jest uproszczona, zawęża się do nasłuchiwania, czy wprowadzono ciemny motyw (wartość true).
//*************************************************************************************************//
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.sass']
})
export class WrapperComponent implements OnInit {

  isDarkTheme: Observable<boolean>; // zmienna nasłuchująca zmiany motywu

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.isDarkTheme = this.themeService.isDarkTheme;
  }
}
