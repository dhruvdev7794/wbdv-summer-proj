import { Component, OnInit } from '@angular/core';
import {UserServiceClient} from '../services/user.service.client';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private service: UserServiceClient,
              private router: Router) { }

  ngOnInit() {
  }

  login() {
    const userObj = {
      username: 'guest',
      password: 'guest'
    };

    this.service.login(userObj)
      .then(() => this.router.navigate(['projects']));
  }
}
