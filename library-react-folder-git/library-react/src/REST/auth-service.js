export default class AuthService {
  static baseUrl = process.env.REACT_APP_API_URL + "/auth";
  #username;
  #password;

  constructor({ username = "", password = "" }) {
    this.#username = username;
    this.#password = password;
  }

  setUsername(username) {
    this.#username = username;
  }
  setPassword(password) {
    this.#password = password;
  }

  async getUser() {
    const response = await fetch(AuthService.baseUrl + "/user", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      credentials: "include",
    });

    if (response.status != 200) throw new Error();

    const responseBody = await response.json();
    return responseBody;
  }

  async signIn() {
    const response = await fetch(AuthService.baseUrl + "/user", {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Basic ${btoa(`${this.#username}:${this.#password}`)}`,
      },
      credentials: "include",
    });

    if (response.status != 200) throw new Error();

    const responseBody = await response.json();
    return responseBody;
  }
  async signUp(registerForm) {
    const bodyJson = JSON.stringify(registerForm);

    const response = await fetch(
      AuthService.baseUrl +
        `${registerForm.role === "MEMBER" ? "/member" : "/librarian"}/register`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
        },
        body: bodyJson,
        credentials: "include",
      }
    );
    const responseBody = await response.json();
    if (response.status != 201) throw new Error(responseBody.message);
    return responseBody;
  }

  async logOut() {
    const response = await fetch(
      `${process.env.REACT_APP_BACK_END_SERVER_URL}/logout`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          //Authorization: `Basic ${btoa(`${this.#username}:${this.#password}`)}`,
        },
        credentials: "include",
      }
    );

    if (!(response.status >= 200 && response.status <= 299)) throw new Error();
  }
}
