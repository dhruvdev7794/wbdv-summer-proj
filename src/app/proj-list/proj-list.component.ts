import { Component, OnInit } from '@angular/core';
import {ProjectServiceClient} from '../services/project.service.client';
import {UserServiceClient} from '../services/user.service.client';
let self;
@Component({
  selector: 'app-proj-list',
  templateUrl: './proj-list.component.html',
  styleUrls: ['./proj-list.component.css']
})

export class ProjListComponent implements OnInit {

  constructor(private service: ProjectServiceClient,
              private userService: UserServiceClient) {
    self = this;
  }
  searchProj;
  projects = [];
  userProjects = [];
  project;
  userId;
  projId;
  projectObj;
  user;
  roles = ['contributor', 'reader'];
  roleObj;

  ngOnInit() {
    this.getProfile();
  }

  findAllProjects() {
    this.service.findAllProjects()
      .then(projects => this.projects = projects);
  }

  findProjectforUser() {
    this.userService.findUserById(this.userId)
      .then(user => {
        this.user = user;
        this.userProjects = user.projects;
        console.log(this.userProjects);
      });
  }

  addProject() {
    let proj_name;
    proj_name = prompt('Enter the project Name');
    if (proj_name != null && proj_name !== '') {
      // this.userService.findUserById(this.userId)
      //   .then(user => this.user = user)
      //   .then(() => {
      //     const newUser = [{
      //       user: this.user,
      //       role: 'owner'
      //     }];
      //     this.project = {
      //       projName: proj_name,
      //       users: newUser,
      //       project: this.project
      //     };
      //     console.log(this.project);
      //     return this.service.addProject(this.project);
      //   })
      //   .then(() => self.findAllProjects());
      this.service.addProject(proj_name)
        .then(() => self.findAllProjects());
    }
  }

  deleteProj(project) {
    const del = confirm('Are you sure you want to remove the Project?');
    if (del === true) {
      this.service.deleteProjects(project.id)
        .then(() => self.findAllProjects());
    }
  }

  addProjectForUser() {
    this.user.projects.push({
      role: this.roleObj,
      project: this.projectObj
    });

    // this.projectObj.role = this.roleObj;
    // now
    // console.log(this.user);
    // this.userService.updateUser(this.userId, this.projectObj)
    //   .then(() => this.findProjectforUser());
    this.service.addProjectToUser(this.projectObj)
      .then(() => this.findProjectforUser());
  }
  getProfile() {
    this.userService.profile()
      .then(function (user) {
        self.userId = user.id;
        self.user = user;
        console.log(user);
        self.findAllProjects();
        self.findProjectforUser();
        console.log(self.user);
      });
  }
}
