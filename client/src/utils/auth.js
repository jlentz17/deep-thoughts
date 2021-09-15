import decode from "jwt-decode";

class AuthService {
  // retrieve data saved in token
  getProfile() {
    return decode(this.getToken());
  }

  // checks if the user is still logged in
  loggedIn() {
    const token = this.getToken();
    // use type coersion to check if token is NOT undefined and the token is NOT expired
    return !!token && !this.isTokenExpired(token);
  }

  // check if the token has expired
  isTokenExpired(token) {
    try {
      const decoded = decoded(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }

  // retrieve token from local storage
  getToken() {
    // Retrieves the user token from local storage
    return localStorage.getItem("id_token");
  }

  // set token to localStorage and reload page to homepage
  login(idToken) {
    // Saves user token to localStorage
    localStorage.setItem("id_token", idToken);

    window.location.assign("/");
  }

  // clear token from localStorage and force logout with reload
  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem("id_token");
    // this will reload the page and set the state of the application
    window.location.assign("/");
  }
}

export default new AuthService();