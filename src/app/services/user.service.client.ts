export class UserServiceClient {

  LOGIN_API_URL = 'https://wbdv-project-java-jpa.herokuapp.com/api/login';
  REGISTER_API_URL = 'https://wbdv-project-java-jpa.herokuapp.com/api/register';
  USER_API_URL = 'https://wbdv-project-java-jpa.herokuapp.com/api/user';
  PROFILE_API_URL = 'https://wbdv-project-java-jpa.herokuapp.com/api/profile';

  // login
  login(user) {
    return fetch(this.LOGIN_API_URL, {
      method: 'POST',
      body: JSON.stringify(user),
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      },
      mode: 'cors'
    }).then(function (response) {
      return response.json();

    });

  }

  profile() {
    return fetch(this.PROFILE_API_URL, {
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    }).then(res => {
      // return null;
      return res.json();
    });
  }
  // register
  register(user) {
    return fetch(this.REGISTER_API_URL, {
      method: 'POST',
      body: JSON.stringify(user),
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    }).then(function (response) {
      return response.json();
      });
  }
  // delete user
  deleteUser(userId) {
    return fetch(this.USER_API_URL + '/' + userId, {
      method: 'DELETE',
      credentials: 'include'
    });
  }
  // create user
  createUser(user) {
    return fetch(this.USER_API_URL, {
      method: 'post',
      credentials: 'include',
      body: JSON.stringify(user),
      headers: {
        'content-type': 'application/json'
      }
      });
  }
  // find user by id
  findUserById(userId) {
    return fetch(this.USER_API_URL + '/' + userId)
      .then(function (response) {
        return response.json();
      });
  }
  // find all users
  findAllUser() {
    return fetch(this.USER_API_URL, {
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(function (response) {
        return response.json();
      });
  }
  // update user
  updateUser(userId, user) {
    return fetch(this.USER_API_URL + '/' + userId, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(user),
        headers: {
          'content-type': 'application/json'
        }
    }).then(res => res.json());
  }

  addFollower(userId, follower) {
    return fetch('https://wbdv-project-java-jpa.herokuapp.com/api/follow/' + userId, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({follower: follower}),
      headers: {
        'content-type': 'application/json'
      }
    }).then(res => res.json());
  }

  getFollowers(userId) {
    return fetch('https://wbdv-project-java-jpa.herokuapp.com/api/follow/' + userId)
      .then(res => res.json());
  }

  logout() {
    return fetch('https://wbdv-project-java-jpa.herokuapp.com/api/logout' , {
      method: 'POST',
      credentials: 'include'
    });
  }
}
