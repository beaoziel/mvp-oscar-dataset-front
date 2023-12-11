import { Component } from '@angular/core';
import { ApiService } from '../../api.service';
import { AppComponent } from '../../app.component';


@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent {
  input_value: string = "";
  shortLink: string = "";
  loading: boolean = false; // Flag variable 
  visible: boolean = false;
  file: File | null = null;
  message: String = "";
  
  
  constructor(private svc: ApiService, private appc: AppComponent) { }


  onChange(event: any) {
    this.file = event.target.files[0];
  }

  displayBox() {
    this.visible = true
  }

  getValue() {
    console.log('Input Value:', this.input_value)
    this.svc.sendCode(this.input_value).subscribe(response => {
      if (response.status == 200) {
        this.onUploadDev()
      } else if (response.status == 403) {
        this.message = "Código incorreto"
      } else {
        this.message = ("internal server error - 500")
      }
    });
  }

  onUploadDev() {
    this.loading = !this.loading;
    if (this.file?.name != null) {
      this.svc.uploadDev(this.file).subscribe(
        (event: any) => {
          if (event.status == 200) {
            this.shortLink = event.link;
            this.loading = false;
            this.message = ""
            this.visible = false
            this.appc.popup_visible = true
            this.scrollToTop()
            this.appc.reset_popup()
          }
        }
      );
    } else {
      this.message = "Por favor, verifique o arquivo"
    }

  }

  scrollToTop() {
    document.documentElement.scrollTop = 0;
  }


}
