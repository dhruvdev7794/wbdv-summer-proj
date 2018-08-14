import { Component, OnInit } from '@angular/core';
import {ProjectServiceClient} from '../services/project.service.client';
import {UserServiceClient} from '../services/user.service.client';
import {ImageServiceClient} from '../services/image.service.client';
import {Router} from '@angular/router';
let self;
@Component({
  selector: 'app-proj-list',
  templateUrl: './proj-list.component.html',
  styleUrls: ['./proj-list.component.css']
})

export class ProjListComponent implements OnInit {

  constructor(private service: ProjectServiceClient,
              private userService: UserServiceClient,
              private router: Router,
              private imageService: ImageServiceClient) {
    self = this;
  }
  searchProj;
  projects = [];
  userProjects = [];
  project;
  userId;
  projId;
  projectObj;
  roles = ['contributor', 'reader'];
  roleObj;
  user;
  projUsers = [];
  images = [];

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

  logout() {
    this.userService.logout()
      .then(() => this.router.navigate(['login']));
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
        .then(project => {
          self.findAllProjects();
          this.findProjectforUser();
        });
    }
  }

  deleteProj(project) {
    console.log(project);
    const del = confirm('Are you sure you want to remove the Project?');
    if (del === true) {
      this.service.deleteProjects(project.project.id)
        .then(() => {
          self.findAllProjects();
          this.findProjectforUser();
        });
    }
  }

  addProjectForUser() {
    // console.log(this.projectObj);
    // this.user.projects.push({
    //   role: this.roleObj,
    //   project: this.projectObj
    // });

    // first get all users with same id and make an array
    this.imageService.findAllImages(this.projectObj.id)
      .then(images => this.images = images)
      .then(() => {
        this.userService.findAllUser()
          .then(users => {
            // for
            users.forEach(function (user) {
              user.projects.forEach(function (proj) {
                if (proj.project.id === self.projectObj.id) {
                  self.projUsers.push(user);
                }

              });
            });
            return self.projUsers;
          })
          .then(users => {
            return this.service.addProjectToUser(this.projectObj.projName, this.roleObj, users);
          })
          .then(project => {
            // console.log(project);
            this.user.projects.push({
              role: this.roleObj,
              project: project
            });
            this.imageService.updateImageProject(project.id, this.images)
              .then(() => {
                this.service.deleteProjects(this.projectObj.id);
              });
          });
      });
  }
  getProfile() {
    this.userService.profile()
      .then(function (user) {
        self.userId = user.id;
        self.user = user;
        self.findAllProjects();
        self.findProjectforUser();
        console.log(self.user);
      });
  }
}
