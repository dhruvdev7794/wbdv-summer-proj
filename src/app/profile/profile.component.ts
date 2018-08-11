import { Component, OnInit } from '@angular/core';
import {UserServiceClient} from '../services/user.service.client';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserServiceClient) {
    this.getProfile();
  }

  username_val;
  password_val;
  first_name_val;
  last_name_val;
  ngOnInit() {
  }

  getProfile() {
    this.userService.profile()
      .then(function (response) {
        this.username_val = response.username;
        this.password_val = response.password;
        this.first_name_val = response.firstName;
        this.last_name_val = response.lastName;
      });
  }

  updateProfile() {
    console.log('hi');
  }

}
