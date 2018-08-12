import { Component, OnInit } from '@angular/core';
import {UserServiceClient} from '../services/user.service.client';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserServiceClient) {

  }

  username_val;
  password_val;
  first_name_val;
  last_name_val;
  ngOnInit() {
  }

  register() {
    const userObj = {
      username: this.username_val,
      password: this.password_val,
      firstName: this.first_name_val,
      lastName: this.last_name_val
    };

    this.userService.register(userObj)
      .then(user => console.log(user));
  }

}
