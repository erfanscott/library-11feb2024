export default class MemberService {
  static baseUrl = "http://localhost:8080/api/members";

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
