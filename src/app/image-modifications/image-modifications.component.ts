import { Component, OnInit } from '@angular/core';
import {UserServiceClient} from '../services/user.service.client';

@Component({
  selector: 'app-image-modifications',
  templateUrl: './image-modifications.component.html',
  styleUrls: ['./image-modifications.component.css']
})
export class ImageModificationsComponent implements OnInit {

  user;
  constructor(private userService: UserServiceClient) {
    this.userService.profile()
      .then(users => this.user = users);
  }

  ngOnInit() {
  }

}
