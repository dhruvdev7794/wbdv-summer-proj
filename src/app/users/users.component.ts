import { Component, OnInit } from '@angular/core';
import {UserServiceClient} from '../services/user.service.client';
import {ProjectServiceClient} from '../services/project.service.client';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private userService: UserServiceClient,
              private projectService: ProjectServiceClient) {
    this.findAllUsers();
    this.getProfile();
    this.getAllProjects();
  }
  users;
  user;
  projects;
  ngOnInit() {
  }

  getProfile() {
    this.userService.profile()
      .then(user => this.user = user);
  }

  findAllUsers() {
    this.userService.findAllUser()
      .then(users => {
        this.users = users;
      });
  }

  getAllProjects() {
    this.projectService.findAllProjects()
      .then(projects => this.projects = projects);
  }


  deleteUser(user) {
    this.userService.deleteUser(user.id)
      .then(() => this.findAllUsers());
  }

  deleteProject(project) {
    this.projectService.deleteProjects(project.id)
      .then(() => this.getAllProjects());
  }

  editProjectName(project) {
    const projName = prompt('Enter the new project name');
    this.projectService.editProjectName(projName, project.id)
      .then(() => this.getAllProjects());
  }

  addProject() {
    const projName = prompt('Enter the new project name');
    this.projectService.addProject(projName)
      .then(() => this.getAllProjects());
  }

}
