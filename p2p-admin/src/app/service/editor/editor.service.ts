import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EditorService {
  host = 'http://localhost:8080';
  constructor(
    private httpClient: HttpClient
  ) {

  }

  uploadImage(image: File): Promise<any> {
    let token = localStorage.getItem('token');
    if(!token){
      token = '';
    }
    const header = {
      'Authorization': `bearer ${token}` 
    };
    return new Promise((res, rej) => {
      const formData = new FormData();
      formData.append('file', image, image.name);
      this.httpClient.post(`${environment.host}/editor/image`, formData,{headers:header}).subscribe(
      url => {
        console.log(url);
        res(url);
      },
      err => {
        console.log(err);
        rej(err);
      }
      );
    });
  }
}
