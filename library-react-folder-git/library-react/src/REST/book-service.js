export default class BookService {
  static BASE_URL = process.env.REACT_APP_API_URL + "/books";

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
}
