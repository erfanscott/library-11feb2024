import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../App";
import BookService from "../REST/book-service";
import MemberService from "../REST/member-service";
import SearchModal from "./SearchModal";
import TextInputModal from "./TextInputModal";

export default function MemberView({ logout }) {
  const { auth } = useContext(AuthContext);
  const { currentUser } = auth;
  const usersName = currentUser.firstName;
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [isBorrowModalVisible, setIsBorrowModalVisible] = useState(false);
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);

  async function borrowBook(bookId) {
    try {
      await new MemberService({}).borrowBook(currentUser.id, bookId);
      loadBorrowedBooks();
    } catch (error) {
      toast.error("Something went wrong");
    }
    setIsBorrowModalVisible(false);
  }
  async function returnBook(bookId) {
    try {
      await new MemberService({}).returnBook(currentUser.id, bookId);
      loadBorrowedBooks();
    } catch (error) {
      toast.error("Something went wrong");
    }
  }
  async function searchBook(searchKey) {
    try {
      const searchResult = await BookService.searchBook(searchKey);
      return searchResult;
    } catch (error) {
      toast.error("Something went wrong");
      return [];
    }
  }

  async function loadBorrowedBooks() {
    try {
      const books = await new MemberService({}).getBorrowedBooks(
        currentUser.id
      );
      setBorrowedBooks(books);
    } catch (error) {
      setBorrowedBooks([]);
    }
  }

  useEffect(() => {
    loadBorrowedBooks();
  }, []);

  const borrowedBooksList = borrowedBooks.map((book) => {
    return (
      <tr
        key={`${book.id}`}
        className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
      >
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {book.name}
        </th>
        <td className="px-6 py-4">Date</td>

        <td class="px-6 py-4">
          <a
            onClick={() => returnBook(book.id)}
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            Return
          </a>
        </td>
      </tr>
    );
  });

  return (
    <section className="bg-gray-200 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full max-h-[90vh] bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
              Welcome {usersName}
            </h1>
            <h2 className="cursor-pointer text-sm spa font-bold leading-tight tracking-tight text-gray-900 md:text-[14px] dark:text-white">
              You have signed in as a library member !{" "}
              <span
                onClick={logout}
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Logout
              </span>
            </h2>

            <div className="grid grid-cols-2 gap-4 whitespace-nowrap">
              <div
                onClick={() => {
                  setIsSearchModalVisible(true);
                }}
                class="block cursor-pointer max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                <h5 class="mb-2 text-lg sm:text-2xl  font-bold tracking-tight text-gray-900 dark:text-white text-center">
                  Search Book
                </h5>
              </div>
              <SearchModal
                isVisible={isSearchModalVisible}
                setIsVisible={setIsSearchModalVisible}
                placeholder="Book, author..."
                searchCallBack={searchBook}
              />

              <div
                onClick={() => {
                  setIsBorrowModalVisible(true);
                }}
                class="block cursor-pointer max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                <h5 class="mb-2 text-lg sm:text-2xl  font-bold tracking-tight text-gray-900 dark:text-white text-center">
                  Borrow Book
                </h5>
              </div>
              <TextInputModal
                title="Enter the ID of the book you want to borrow"
                actionName="Borrow"
                actionMethod={borrowBook}
                inputLabel="Book id"
                isVisible={isBorrowModalVisible}
                setIsVisible={setIsBorrowModalVisible}
              />
              <a
                href="#"
                class="block  col-span-2 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                <h5 class="mb-2 text-lg sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
                  Update Profile
                </h5>
              </a>

              <div class="relative col-span-2 pt-8 overflow-y-scroll overflow-x-auto  bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h2 class="mb-8 text-lg sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
                  Borrowed Books
                </h2>
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" class="px-6 py-3">
                        Book name
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Borrowed on
                      </th>
                      <th scope="col" class="px-6 py-3">
                        #
                      </th>
                    </tr>
                  </thead>
                  <tbody>{borrowedBooksList}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
