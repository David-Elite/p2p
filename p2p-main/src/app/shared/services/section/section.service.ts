import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getSection(sectionId: string): Promise<any> {
    return new Promise((res, rej) => {
      this.httpClient.get(`${environment.host}/section/${sectionId}`).subscribe(
        sec => res(sec),
        err => rej(err)
      );
    });
  }
}
