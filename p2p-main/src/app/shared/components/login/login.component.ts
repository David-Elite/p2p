import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  constructor(
    private userService: UserService,
    public activeModal: NgbActiveModal,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login(): void {
    this.userService.login(this.email, this.password).then(res => {
      this.router.navigate(['..']);
    });
  }

  googleSignin(): void {
    this.userService.googleSignIn();
  }

  facebookLogin(): void {
    this.userService.facebookLogin();
  }

}
