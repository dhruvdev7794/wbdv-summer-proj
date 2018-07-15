import { Component, OnInit } from '@angular/core';
import {ProjectServiceClient} from '../services/project.service.client';

@Component({
  selector: 'app-proj-list',
  templateUrl: './proj-list.component.html',
  styleUrls: ['./proj-list.component.css']
})
export class ProjListComponent implements OnInit {

  constructor(private service: ProjectServiceClient) { }

  projects = [];
  ngOnInit() {
    this.service.findAllProjects()
      .then(projects => this.projects = projects);
  }

  selectProject(projectId) {
    console.log(projectId);
  }

}
