export class ProjectServiceClient {
  PROJECT_API_URL = 'https://wbdv-project-java-jpa.herokuapp.com/api/projects';
  findAllProjects() {
    return fetch(this.PROJECT_API_URL)
      .then(response => response.json());
  }

  addProject(projectName) {
    return fetch(this.PROJECT_API_URL, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({'projName': projectName}),
      headers: {'Content-Type': 'application/json'}
    }).then(res => res.json());
  }

  deleteProjects(projectId) {
    return fetch(this.PROJECT_API_URL + '/' + projectId, {
      method: 'DELETE',
    }).then(() => null);
  }

  addProjectToUser(projectName, role, user) {
    return fetch('https://wbdv-project-java-jpa.herokuapp.com/api/userproj/name/' + projectName + '/role/' + role, {
      method: 'PUT',
      credentials: 'include',
      body: JSON.stringify(user),
      headers: {'Content-Type': 'application/json'}
    }).then(res => res.json());
  }
}
