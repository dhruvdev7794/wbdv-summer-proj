import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CommentServiceClient} from '../services/comment.service.client';
import {ImageServiceClient} from '../services/image.service.client';

@Component({
  selector: 'app-image-edit',
  templateUrl: './image-edit.component.html',
  styleUrls: ['./image-edit.component.css']
})
export class ImageEditComponent implements OnInit {

  comment;
  imageId;
  comments;
  constructor(private route: ActivatedRoute,
              private commentService: CommentServiceClient,
              private imageService: ImageServiceClient) {
    this.route.params.subscribe(params => this.setParams(params));
  }
  setParams(params) {
    this.imageId = params['imageId'];
    this.loadComments();
  }

  ngOnInit() {
  }

  addComment() {
    console.log(this.comment);
    console.log(this.imageId);
    const reviewIndex = document.getElementById('review').selectedIndex;
    console.log(reviewIndex);

    const commentObj = {
      comment: this.comment,
      review: document.getElementsByTagName('option')[reviewIndex].value
    };

    this.commentService.saveCommentForImage(this.imageId, commentObj)
      .then(() => this.loadComments());
    // this.imageService.findImageById(this.imageId)
    //   .then(image => {
    //     console.log(image);
    //   });

  }

  loadComments() {
    this.commentService.findAllComments(this.imageId)
      .then(comments => this.comments = comments);
  }
}
