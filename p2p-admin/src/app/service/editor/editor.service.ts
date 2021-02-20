import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
    return new Promise((res, rej) => {
      const formData = new FormData();
      formData.append('file', image, image.name);
      this.httpClient.post(`${this.host}/editor/image`, formData).subscribe(
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
