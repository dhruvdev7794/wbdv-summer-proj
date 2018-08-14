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
  mouseDownX;
  mouseDownY;
  height;
  width;
  hotspotStyle;
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
    fetch('https://wbdv-project-java-jpa.herokuapp.com/api/image/' + imageId)
      .then(res => this.src = res);
  }

  intializeCoordinates(event) {
    this.mouseDownX = event.clientX;
    this.mouseDownY = event.clientY;
  }

  calculatePosition(event) {
    this.width = event.clientX - this.mouseDownX ;
    this.height = event.clientY - this.mouseDownY;
    console.log([
      this.width,
      this.height
    ]);
  }

  hotspotDone(event) {
    console.log([
      this.width,
      this.height
    ]);
    this.setStyles();
  }

  setStyles() {
    this.hotspotStyle = {
      'top': this.mouseDownY + 'px',
      'left': this.mouseDownX + 'px',
      'width': this.width + 'px',
      'height': this.height + 'px',
      'background-color': 'red',
      'z-index': '10000000000',
      'position': 'absolute'
    };
  }

}
