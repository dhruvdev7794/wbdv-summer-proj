export class UserServiceClient {

  LOGIN_API_URL = 'http://localhost:8080/api/login';
  REGISTER_API_URL = 'http://localhost:8080/api/register';
  USER_API_URL = 'http://localhost:8080/api/user';

  // login
  login(user) {
    return fetch(this.LOGIN_API_URL, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'content-type': 'application/json'
      }
    }).then(function (response) {
      return response.json();

    });

  }
  // register
  register(user) {
    return fetch(this.REGISTER_API_URL, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'content-type': 'application/json'
      }
    }).then(function (response) {
      return response.json();

    });
  }
  // delete user
  deleteUser(userId) {
    return fetch(this.USER_API_URL + '/' + userId,{
      method: 'DELETE'
    });
  }
  // create user
  createUser(user){
    return fetch(this.USER_API_URL,{
      method: 'post',
      body: JSON.stringify(user),
      headers: {
        'content-type': 'application/json'
      }
      });
  }
  // find user by id
  findUserById(userId){
    return fetch(this.USER_API_URL + '/' + userId)
      .then(function (response) {
        return response.json();
      });
  }
  // find all users
  findAllUser(){
    return fetch(this.USER_API_URL)
      .then(function (response) {
        return response.json();
      });
  }
  // update user
  updateUser(userId, user) {
    return fetch(this.USER_API_URL + '/' + userId,{
      method: 'PUT',
      body: JSON.stringify(user),
      headers: {
        'content-type': 'application/json'
      }}
      );
  }
}
