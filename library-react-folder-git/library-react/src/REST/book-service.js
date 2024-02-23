export default class BookService {
  static baseUrl = process.env.REACT_APP_API_URL + "/books";

  static async searchBook(searchKey) {
    const response = await fetch(`${this.BASE_URL}?key=${searchKey}`, {
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

  static async add(formData) {
    const bodyJson = JSON.stringify(formData);
    console.log(bodyJson);

    const response = await fetch("http://localhost:8080/api/books/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
      body: bodyJson,

      credentials: "include",
    });

    if (response.status != 201) throw new Error("Adding book failed");
  }
}
