import { Component, OnInit } from '@angular/core';
import {UserServiceClient} from '../services/user.service.client';
let self;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserServiceClient) {
    self = this;
    this.getProfile();
  }
  userId;
  username_val;
  password_val;
  first_name_val;
  last_name_val;
  ngOnInit() {
  }

  getProfile() {
    this.userService.profile()
      .then(function (response) {

        console.log(response);

        self.username_val = response.username;
        self.password_val = response.password;
        self.first_name_val = response.firstName;
        self.last_name_val = response.lastName;

      });
  }

  updateProfile() {
    const user = {
      id: this.userId,
      username: this.username_val,
      password: this.password_val,
      firstName: this.first_name_val,
      lastName: this.last_name_val,
    };
    this.userService.updateUser(this.userId, user)
      .then(() => this.getProfile());
  }

}
