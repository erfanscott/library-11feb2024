export default class MemberService {
  static baseUrl = process.env.REACT_APP_API_URL + "/members";

  #targetMemberId;
  #targetBookId;
  #searchKey;
  #borrowBookUrl;
  #returnBookUrl;
  #searchMemberUrl;

  constructor({ targetMemberId = "", targetBookId = "", searchKey = "" }) {
    this.#targetMemberId = targetMemberId;
    this.#targetBookId = targetBookId;
    this.#searchKey = searchKey;
    this.setBookActionUrls();
    this.#searchMemberUrl =
      MemberService.baseUrl + `/?=` + `${this.#searchKey}`;
  }

  setBookActionUrls() {
    this.#borrowBookUrl =
      MemberService.baseUrl +
      `/${this.#targetMemberId}` +
      `/borrow-book/${this.#targetBookId}`;
    this.#returnBookUrl =
      MemberService.baseUrl +
      `/${this.#targetMemberId}` +
      `/return-book/${this.#targetBookId}`;
  }

  setTargetMemberId(id) {
    this.#targetMemberId = id;
    this.setBookActionUrls();
  }
  setTargetBookId(id) {
    this.#targetBookId = id;
    this.setBookActionUrls();
  }
  setSearchKey(key) {
    this.#searchKey = key;
    this.#searchMemberUrl =
      MemberService.baseUrl + `/?=` + `${this.#searchKey}`;
  }

  static async search(searchKey, page) {
    const response = await fetch(
      `${"http://localhost:8080/api/members"}?key=${searchKey}&&page=${page - 1}`,
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

  static async delete(id) {
    if (id == null) {
      throw new Error("null input");
    }
    const response = await fetch(
      `${"http://localhost:8080/api/members"}/${id}`,
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

    const response = await fetch("http://localhost:8080/api/members/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
      body: bodyJson,

      credentials: "include",
    });
    if (response.status != 200) throw new Error("Adding member failed");
  }

  async getMembers() {
    const response = await fetch(MemberService.baseUrl, {
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

  async borrowBook(memberId, bookId) {
    const response = await fetch(
      MemberService.baseUrl + `/${memberId}/borrow/${bookId}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        credentials: "include",
      }
    );
    if (!(response.status >= 200 && response.status <= 299)) throw new Error();
  }

  async returnBook(memberId, bookId) {
    const response = await fetch(
      MemberService.baseUrl + `/${memberId}/return/${bookId}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        credentials: "include",
      }
    );
    if (!(response.status >= 200 && response.status <= 299)) throw new Error();
  }

  async getBorrowedBooks(memberId) {
    const response = await fetch(
      MemberService.baseUrl + `/${memberId}/borrowed-books`,
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
}
//MemberService.baseUrl
