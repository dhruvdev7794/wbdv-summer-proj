import { Component, OnInit } from '@angular/core';
import {UserServiceClient} from '../services/user.service.client';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private userService: UserServiceClient) {
    this.findAllUsers();
  }
  users;
  ngOnInit() {
  }

  findAllUsers() {
    this.userService.findAllUser()
      .then(users => {
        this.users = users;
      });
  }


  deleteUser(user) {
    this.userService.deleteUser(user.id)
      .then(() => this.findAllUsers());
  }

}
