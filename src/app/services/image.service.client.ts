export class ImageServiceClient {
  IMAGE_URL_API = 'https://wbdv-project-java-jpa.herokuapp.com/api/projects/:PROJID/images';
  IMAGE_SHORT_API_URL = 'https://wbdv-project-java-jpa.herokuapp.com/api/image/:IMAGEID';
  findAllImages(projectId) {
    return fetch(this.IMAGE_URL_API.replace(':PROJID', projectId))
      .then(response => response.json());
  }
  saveImageAndAddRecord(projectId, content) {
    console.log(content);
    return fetch(this.IMAGE_URL_API.replace(':PROJID', projectId), {
      method: 'POST',
      body: JSON.stringify(content),
      headers: {'Content-Type' : 'application/json'}
    }).then(response => response.json());
  }
  updateImageRecordWithBlob(imageId, content, mimeType) {
    return fetch(this.IMAGE_SHORT_API_URL.replace(':IMAGEID', imageId), {
      method: 'PUT',
      body: content,
      // headers: {'Content-Type' : mimeType}
    }).then(response => response.json());
  }
}
