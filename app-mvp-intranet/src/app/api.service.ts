import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) { }

  upload(file: any): Observable<any> {
    const formData = new FormData();
    formData.append("file", file, file.name);
    return this.http.post(this.apiUrl + "/dataset/upload", formData)
  }

  uploadDev(file: any): Observable<any> {
    const formData = new FormData();
    formData.append("file", file, file.name);
    return this.http.post(this.apiUrl + "/developer/upload", formData)
  }

  download() : Observable<any>{
    return this.http.get(this.apiUrl + "/dataset/download", { responseType:'arraybuffer'})
  }

  sendCode(input_value: string) : Observable<any> {
        const formData = new FormData();
        formData.append("input_value", input_value);
        return this.http.post(this.apiUrl + "/developer/code", formData) 
  }
}

