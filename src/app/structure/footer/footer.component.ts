//*************************************************************************************************//
// Komponent paska footera.
// Została zaimplementowana obsługa wysuwania/chowania menu użytkownika.
// To menu obsługuje komponent bottomSheet. 
//*************************************************************************************************//
import { Component } from '@angular/core';
import { EditModeService } from 'src/app/services/edit-mode.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.sass']
})
export class FooterComponent {

  constructor(private editSerive: EditModeService) { }

  toggleBottomSheet(): void { // funkcja wysuwająca/chowająca menu użytkownika. Rozdzielona na 2 przypadki, by zapobiec desynchronizacji z przyciskiem.
    this.editSerive.isMenuHidden.next(
      this.editSerive.isMenuHidden.value ? false : true
  )}
}
