import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  transparentHeader: boolean = true;
  constructor(
    private router: Router
  ){}

  ngOnInit(): void {
    this.router.events.subscribe( e => {
      if (e instanceof NavigationEnd) {
        console.log(e.url);
        if (e.url === '/') {
          this.transparentHeader = true;
        } else {
          this.transparentHeader = false;
        }
      } 
    })
  }
}
