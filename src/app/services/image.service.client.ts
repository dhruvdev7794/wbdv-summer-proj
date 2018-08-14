export class ImageServiceClient {
  IMAGE_URL_API = 'http://localhost:8080/api/projects/:PROJID/images';
  IMAGE_SHORT_API_URL = 'http://localhost:8080/api/image/:IMAGEID';
  findAllImages(projectId) {
    return fetch(this.IMAGE_URL_API.replace(':PROJID', projectId), {
      credentials: 'include'
    }).then(response => response.json());
  }
  saveImageAndAddRecord(projectId, content) {
    console.log(content);
    return fetch(this.IMAGE_URL_API.replace(':PROJID', projectId), {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(content),
      headers: {'Content-Type' : 'application/json'}
    }).then(response => response.json());
  }
  updateImageRecordWithBlob(imageId, content, mimeType) {
    return fetch(this.IMAGE_SHORT_API_URL.replace(':IMAGEID', imageId), {
      method: 'PUT',
      body: content,
      credentials: 'include',
      headers: {'Content-Type' : mimeType}
    }).then(response => response.json());
  }
  deleteImage(imageId) {
    return fetch(this.IMAGE_SHORT_API_URL.replace(':IMAGEID', imageId), {
      method: 'DELETE',
      credentials: 'include'
    });
  }
  findImageById(imageId) {
    return fetch('http://localhost:8080/api/imagedetails/:IMAGEID'.replace(':IMAGEID', imageId), {
      method: 'GET',
      credentials: 'include'
    }).then(res => res.json());
  }
  updateImageProject(projectId, images) {
    return fetch('http://localhost:8080/api/image/newProj/' + projectId, {
      method: 'PUT',
      body: JSON.stringify(images),
      headers: {'Content-Type' : 'application/json'},
      credentials: 'include'
    }).then(res => res.json());
  }
}
