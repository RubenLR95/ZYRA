import { Component, ViewEncapsulation } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import {RippleModule} from 'primeng/ripple';
@Component({
  selector: 'app-header',
  imports: [
    ToolbarModule,
    ButtonModule,
    RippleModule],
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {
    //BANDERA QUE INDICA EL MODO OSCURO (TRUE) O CLARO (FALSE)
    darkMode = false;

    toggleTheme(){   //ESTA FUNCIÓN ALTERNA EL TEMA DE LA APLICACION DE CLARO A OSCURO
      this.darkMode = !this.darkMode;
      document.body.classList.toggle('dark', this.darkMode); 
    }
}
