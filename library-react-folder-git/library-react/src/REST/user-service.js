export default class UserService {
  static baseUrl = "http://localhost:8080/api";

  static async EditProfile(formData, role, id) {
    const bodyJson = JSON.stringify(formData);

    const response = await fetch(
      UserService.baseUrl +
        `${role === "ROLE_MEMBER" ? "/members" : "/librarians"}/${id}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
        },
        body: bodyJson,

        credentials: "include",
      }
    );

    if (response.status != 200) throw new Error("update user failed");
  }
}
