import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserServiceClient} from '../services/user.service.client';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  userId;
  username_val;
  password_val;
  v_password_fld;
  first_name;
  last_name;
  user;
  constructor(private userService: UserServiceClient,
              private router: Router,
              private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.setParams(params));
  }

  setParams(params) {
    if (params['userId'] !== undefined) {
      this.userId = params['userId'];
      this.loadUserInfo();
    }
  }

  loadUserInfo() {
    this.userService.findUserById(this.userId)
      .then(user => {
        console.log(user);
        this.username_val = user.username;
        this.password_val = user.password;
        this.v_password_fld = user.password;
        this.first_name = user.firstName;
        this.last_name = user.lastName;
        console.log(this.username_val);
      });
  }

  ngOnInit() {
  }

  updateCreateUser() {
    if (this.password_val === this.v_password_fld) {
      // check if username already exists
      //
      //

      if (this.userId !== undefined) {
        this.user = {
          id: this.userId,
          username: this.username_val,
          password: this.password_val,
          firstName: this.first_name,
          lastName: this.last_name
        };
        this.userService.updateUser(this.userId, this.user)
          .then(() => this.router.navigate(['/users']));
      } else {
        this.user = {
          username: this.username_val,
          password: this.password_val,
          firstName: this.first_name,
          lastName: this.last_name
        };
        this.userService.createUser(this.user)
          .then(() => this.router.navigate(['/users']));
      }
    } else {
      alert('passwords do not match');
    }
  }

}
