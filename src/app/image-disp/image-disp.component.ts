import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-image-disp',
  templateUrl: './image-disp.component.html',
  styleUrls: ['./image-disp.component.css']
})
export class ImageDispComponent implements OnInit {

  imageId;
  src;
  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.setParams(params));
  }

  setParams(params) {
    this.imageId = params['imageId'];
    this.loadImage(this.imageId);
  }

  ngOnInit() {
  }

  loadImage(imageId) {
    console.log(imageId);
    fetch('http://localhost:8080/api/image/' + imageId)
      .then(res => this.src = res);
  }

}
