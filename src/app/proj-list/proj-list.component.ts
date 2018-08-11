import { Component, OnInit } from '@angular/core';
import {ProjectServiceClient} from '../services/project.service.client';
let self;
@Component({
  selector: 'app-proj-list',
  templateUrl: './proj-list.component.html',
  styleUrls: ['./proj-list.component.css']
})

export class ProjListComponent implements OnInit {

  constructor(private service: ProjectServiceClient) {
    self = this;
  }
  searchProj;
  projects = [];

  ngOnInit() {
    this.findAllProjects();
  }

  findAllProjects() {
    this.service.findAllProjects()
      .then(projects => this.projects = projects);
  }

  addProject() {
    let proj_name;
    proj_name = prompt('Enter the project Name');
    if (proj_name != null && proj_name !== '') {
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
}
