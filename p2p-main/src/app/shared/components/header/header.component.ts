import { Component, HostListener, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../services/user/user.service';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input('transparent')
  transparent!: boolean;
  onTop = true;
  searchText: string = '';
  user: any;
  constructor(
    private ngbModal: NgbModal,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.user.subscribe({
      next: user => {
        console.log(user);
        if (user) {
          this.user = user;
        }
      },
      error: err => {
        console.log(err);
      }
    })
  }

  search(): void {

  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const verticalOffset =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

      if(verticalOffset > 70) {
        this.onTop = false;
      } else {
        this.onTop = true;
      }
  }

  openLogin() {
    const login = this.ngbModal.open(LoginComponent,
      {
        ariaLabelledBy: 'modal-basic-title', 
        size: 'lg', 
        windowClass: 'modal-class'
    });
    login.dismissed.subscribe({
      next: (res) => {
        console.log(res);
        if(res === 'forgot-password') {
          this.openForgotPassword();
        } else if(res === 'sign-up') {
          this.openSignup();
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  openSignup() {
    const signup = this.ngbModal.open(SignupComponent);
    signup.dismissed.subscribe({
      next: (res) => {
        if (res === 'login') {
          this.openLogin();
        }
      }
    })
  }

  openForgotPassword() {
    const forgot = this.ngbModal.open('');
    forgot.dismissed.subscribe({
      next: (res) => {
        if (res === 'login') {
          this.openLogin();
        }
      }
    })
  }

}
