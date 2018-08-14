import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CommentServiceClient} from '../services/comment.service.client';
import {UserServiceClient} from '../services/user.service.client';

@Component({
  selector: 'app-image-edit',
  templateUrl: './image-edit.component.html',
  styleUrls: ['./image-edit.component.css']
})
export class ImageEditComponent implements OnInit {

  comment;
  reviewSelect;
  imageId;
  comments;
  user;
  values = ['excellent', 'good', 'average', 'bad'];
  constructor(private route: ActivatedRoute,
              private commentService: CommentServiceClient,
              private userService: UserServiceClient) {
    this.route.params.subscribe(params => this.setParams(params));
  }
  setParams(params) {
    this.imageId = params['imageId'];
    this.loadComments();
    this.userService.profile()
      .then(user => this.user = user);
  }

  ngOnInit() {
  }

  addComment() {

    const commentObj = {
      comment: this.comment,
      review: this.reviewSelect,
      userName: this.user.firstName + ' ' + this.user.lastName
    };

    this.commentService.saveCommentForImage(this.imageId, commentObj)
      .then(() => this.loadComments());

  }

  loadComments() {
    this.commentService.findAllComments(this.imageId)
      .then(comments => this.comments = comments);
  }
}
