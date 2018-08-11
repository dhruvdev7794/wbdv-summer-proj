import { Component, OnInit } from '@angular/core';
import {UserServiceClient} from '../services/user.service.client';
let self;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  message = 'Hello From Login!';
  password_val;
  username_val;

  constructor(private userService: UserServiceClient) {
    self = this;
  }

  ngOnInit() {
  }

  doSomething(event) {
    console.log(event);
  }
  onSignIn(googleUser) {
    const profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }
  signOut() {
    console.log('User not signed out.');
    // const auth2 = gapi.auth2.getAuthInstance();
    // auth2.signOut().then(function () {
    //   console.log('User signed out.');
    // });
  }

  login() {
    console.log(this.username_val);
    console.log(this.password_val);
    const userObj = {
      username: this.username_val,
      password: this.password_val
    };
    this.userService.login(userObj)
      .then(user => console.log(user));

  }


}
