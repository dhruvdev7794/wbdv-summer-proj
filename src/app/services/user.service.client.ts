export class UserServiceClient {
  LOGIN_URL = 'http://localhost:8080/api/login';

  login(user) {
    return fetch(this.LOGIN_URL, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-type': 'application/json'
      }
    }).then(res => res.json());
  }
}
