import { Component, OnInit } from '@angular/core';
import {UserServiceClient} from '../services/user.service.client';
let self;
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserServiceClient,
              private router: Router) {
    self = this;
    this.getProfile();
    this.setUsers();
  }
  userId;
  username_val;
  password_val;
  first_name_val;
  last_name_val;
  users = [];
  followers = [];
  userObject;
  ngOnInit() {
  }

  getProfile() {
    this.userService.profile()
      .then(function (response) {
        console.log(response);
        self.userId = response.id;
        self.username_val = response.username;
        self.password_val = response.password;
        self.first_name_val = response.firstName;
        self.last_name_val = response.lastName;
        self.getFollowers();
        return null;
      });
  }

  addFollower() {
    const follower = this.userObject.firstName + ' ' + this.userObject.lastName;
    // console.log(this.userId);
    this.userService.addFollower(this.userId, follower)
      .then((fo) => {
        this.getFollowers();
      });

  }

  setUsers() {
    this.userService.findAllUser()
        .then(users => this.users = users);
  }

  getFollowers() {
    this.userService.getFollowers(this.userId)
      .then(followers => {
        this.followers = followers;
        console.log(this.followers);
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
      .then(() => {
        this.getProfile();
        this.router.navigate(['projects']);
      });
  }



}
