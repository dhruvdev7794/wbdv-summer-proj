export class ImageServiceClient {
  IMAGE_URL_API = 'http://localhost:8080/api/projects/:PROJID/images'
  findAllImages(projectId) {
    return fetch(this.IMAGE_URL_API.replace(':PROJID', projectId))
      .then(response => response.json());
  }
}
