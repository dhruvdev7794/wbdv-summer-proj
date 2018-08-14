export class CommentServiceClient {
  COMMENT_URL_API = 'https://wbdv-project-java-jpa.herokuapp.com/api/image/:IMGID/comment';
  findAllComments(imageId) {
    return fetch(this.COMMENT_URL_API.replace(':IMGID', imageId))
      .then(res => res.json());
  }
  saveCommentForImage(imageId, comment) {
    return fetch(this.COMMENT_URL_API.replace(':IMGID', imageId), {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(comment)
    }).then(res => res.json());
  }
}
