import { Component } from '@angular/core';
import { ApiService } from '../../api.service';



@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  shortLink: string = ""; 
  loading: boolean = false;
  loaded: boolean = true;
  visible: boolean = false;
  file: File | null = null; 
  mensagem: string = ""
  group_number: string = ""
  group_result: string = ""
  text_result: string = ""


  constructor(private svc: ApiService) { } 

  onChange(event:any) { 
    this.file = event.target.files[0]; 
    this.mensagem = ""
    this.loading = false
    this.loaded = true
    this.visible = false
} 

onUpload() { 
  
  if (this.file?.name != null) {
    this.loading = !this.loading;
    this.loaded = false
    this.visible = false
    setTimeout(() => {
      this.svc.upload(this.file).subscribe(
        (event: any) => {
          if (event.status == 200) {
            this.shortLink = event.link;
            this.loading = false; // Flag variable
            this.visible = true;
            this.group_number = event.group;
            this.group_result = event.group_name;
            this.text_result = event.text;
          } else if (event.status == 400) {
            this.mensagem = "Erro ao salvar o seu arquivo."
          }
        });
    }, 3000)
  } else {
    this.mensagem = "Por favor, verifique o arquivo"
  }
} 

downloadCSV() {
  this.svc.download().subscribe(
    (data: ArrayBuffer) => {
      this.saveFile(data);
    },
    (error) => {
      console.error('Error downloading file:', error);
    }
  )
}

saveFile(data: ArrayBuffer): void {
  const blob = new Blob([data], { type: 'application/octet-stream' });
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = 'template.xlsx'; 
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

}
