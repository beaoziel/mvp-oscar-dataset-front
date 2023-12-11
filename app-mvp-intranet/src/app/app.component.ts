import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  popup_visible: boolean = false

  reset_popup() {
    setTimeout(() => {
      this.popup_visible = false
    }, 5000)
  }
}
