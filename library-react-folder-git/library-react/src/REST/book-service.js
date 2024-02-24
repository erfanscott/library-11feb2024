export default class BookService {
  static baseUrl = process.env.REACT_APP_API_URL + "/books";

  static async fetchBookById(bookId) {
    const response = await fetch(
      `${"http://localhost:8080/api/books"}/${bookId}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        credentials: "include",
      }
    );

    if (response.status != 200) throw new Error();
    const responseBody = await response.json();
    return responseBody;
  }

  static async search(searchKey, page) {
    try {
      const response = await fetch(
        `${"http://localhost:8080/api/books"}?key=${searchKey}&&page=${page - 1}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
          credentials: "include",
        }
      );

      if (response.status != 200) throw new Error();
      var responseBody = await response.json();
    } catch (error) {
      console.log(error.message);
    }
    return responseBody;
  }
  static async delete(bookId) {
    if (bookId == null) {
      throw new Error("null input");
    }
    const response = await fetch(
      `${"http://localhost:8080/api/books"}/${bookId}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
        },
        credentials: "include",
      }
    );

    if (!(response.status >= 200 && response.status <= 299)) throw new Error();
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
