import { Component, OnInit } from '@angular/core';
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
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

}
