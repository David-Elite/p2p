import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  name = '';
  email = '';
  mobile = '';
  password = '';
  confirmPass = '';

  noMatch = false;
  constructor(
    private userService: UserService,
    public activeModel: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

  signup(){
    if (this.password === this.confirmPass) {
      this.userService.signup(this.name, this.email, this.mobile, this.password, this.confirmPass).then(res => {
        console.log(res);
        
      });
    } else {
      this.noMatch = true;
    }
  }

}
