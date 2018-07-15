export class ProjectServiceClient {
  PROJECT_API_URL = 'http://localhost:8080/api/projects';
  findAllProjects() {
    return fetch(this.PROJECT_API_URL)
      .then(response => response.json());
  }
}
