import { Component, OnInit } from '@angular/core';
import {UserServiceClient} from '../services/user.service.client';
import {Router} from '@angular/router';

@Component({
  selector: 'app-image-modifications',
  templateUrl: './image-modifications.component.html',
  styleUrls: ['./image-modifications.component.css']
})
export class ImageModificationsComponent implements OnInit {

  user;
  constructor(private userService: UserServiceClient,
              private router: Router) {
    this.userService.profile()
      .then(users => this.user = users);
  }

  ngOnInit() {
  }

  logout() {
    this.userService.logout()
      .then(() => this.router.navigate(['login']));
  }

}
