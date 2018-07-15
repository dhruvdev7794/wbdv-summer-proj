import { Component, OnInit } from '@angular/core';
import {ImageServiceClient} from '../services/image.service.client';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent implements OnInit {

  constructor(private service: ImageServiceClient, private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.setParams(params));
  }

  images = [];
  projectId;

  setParams(params) {
    this.projectId = params['id'];
    this.loadImages(this.projectId);
  }

  ngOnInit() {
  }

  loadImages(projectId) {
    return this.service.findAllImages(projectId)
      .then(images => this.images = images);

  }

}
