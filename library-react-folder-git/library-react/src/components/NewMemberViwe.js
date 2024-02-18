import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../App";
import BookService from "../REST/book-service";
import MemberService from "../REST/member-service";
import UserService from "../REST/user-service";
import SearchModal from "./SearchModal";
import TextInputModal from "./TextInputModal";
import UpdateProfileModal from "./UpdateProfileModal";

export default function NewMemberView({ logout }) {
  const navigate = useNavigate();

  const { auth, updateAuth } = useContext(AuthContext);
  const { currentUser } = auth;
  const usersName = currentUser.firstName;
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [isBorrowModalVisible, setIsBorrowModalVisible] = useState(false);
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);

  const [dropDownFormData, setDropDownFormData] = useState("books");

  const onDropDownFormChange = (e) => {
    setDropDownFormData(e.target.value);
  };

  const [entityListPage, setEntityListPage] = useState(1);

  const entityList = { members: [], books: [] };
  for (let i = 0; i < 3; i++) {
    entityList.members.push(
      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td class="px-2 py-4 font-bold">1</td>

        <td class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
          <div class="">
            <div class="text-base font-semibold">Neil Sims</div>
            <div class="font-normal text-gray-500">neil.sims@flowbite.com</div>
          </div>
        </td>
        <td class="hidden md:table-cell px-6 py-4">Male</td>
        <td class="hidden md:table-cell px-6 py-4">Joined on</td>

        <td class="px-6 py-4 flex items-end space-x-2">
          <button
            onClick={() => {}}
            className="ml-1 py-2 px-2 cursor-pointer text-xs  font-medium text-white rounded bg-red-600 dark:bg-red-500 hover:underline"
          >
            Delete
          </button>
          <button
            onClick={() => {}}
            className="ml-1 py-2 px-2 cursor-pointer text-xs font-medium text-white rounded bg-blue-600 dark:bg-blue-500 hover:underline"
          >
            Details
          </button>
        </td>
      </tr>
    );
  }
  for (let i = 0; i < 3; i++) {
    let isAvailable;
    isAvailable = i % 2 === 0 ? true : false;

    entityList.books.push(
      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td class="px-2 py-4 font-bold">1</td>

        <td class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
          <div class="">
            <div class="text-base font-semibold">White Nights</div>
            <div class="font-normal text-gray-500">
              Fyodor Mikhailovich Dostoevsky
            </div>
          </div>
        </td>

        <td class="hidden md:table-cell px-6 py-4">
          <div class="flex items-center">
            <div
              class={`h-2.5 w-2.5 rounded-full ${
                isAvailable ? "bg-green-500" : "bg-red-500"
              } me-2`}
            ></div>{" "}
            {isAvailable ? "AVAILABLE" : "BORROWED"}
          </div>
        </td>
        <td class="px-6 py-4 flex items-end space-x-2">
          <button
            onClick={() => {}}
            className="ml-1 py-2 px-2 cursor-pointer text-xs  font-medium text-white rounded bg-red-600 dark:bg-red-500 hover:underline"
          >
            Delete
          </button>
          <button
            onClick={() => {}}
            className="ml-1 py-2 px-2 cursor-pointer text-xs font-medium text-white rounded bg-blue-600 dark:bg-blue-500 hover:underline"
          >
            Details
          </button>
        </td>
      </tr>
    );
  }

  return (
    <section className="bg-gray-200 dark:bg-gray-900 pt-7">
      <div className="flex flex-col items-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-md sm:rounded-lg shadow dark:border md:mt-0 max-w-5xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="relative px-6 py-6 shadow-md rounded-md sm:rounded-lg">
            <div className="mb-8 space-y-4">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                Welcome {usersName}
              </h1>

              <div className="flex flex-wrap justify-between items-center">
                <h2 className="cursor-pointer text-sm whitespace-nowrap mr-4 mdLg:text-[18px] spa font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
                  You have signed in as a library Member !{" "}
                </h2>
                <div className="flex items-center space-x-4 flex-nowrap">
                  <button
                    onClick={logout}
                    className="ml-1 py-2 px-2 cursor-pointer text-xs  font-medium text-white rounded bg-red-600 dark:bg-red-500 hover:underline"
                  >
                    Logout
                  </button>
                  <button
                    onClick={() => {}}
                    className="ml-1 py-2 px-2 cursor-pointer text-xs  font-medium text-white rounded bg-yellow-600 dark:bg-yellow-500 hover:underline"
                  >
                    Edit profile
                  </button>
                </div>
              </div>
            </div>
            <div class="flex flex-wrap items-center justify-between pb-4 dark:bg-gray-900">
              {/*book/member select */}

              <form class="max-w-sm mr-12 mb-4 tinySm:mb-0">
                <select
                  id="entity"
                  value={dropDownFormData}
                  onChange={onDropDownFormChange}
                  class="flex justify-center bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="books">Books</option>
                  <option value="members">Members</option>
                </select>
              </form>

              <div className="flex flex-wrap items-center">
                <button
                  type="button"
                  class="py-2 px-2 mr-2 whitespace-nowrap cursor-pointer text-xs  font-medium text-white rounded bg-green-600 dark:bg-green-500 hover:underline"
                >
                  {`${
                    dropDownFormData === "books" ? "ADD BOOK" : "ADD MEMBER"
                  }`}
                </button>

                <div class="relative">
                  <div class="absolute inset-y-0 start-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      class="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    onChange
                    type="search"
                    id="default-search"
                    class="block w-fulls p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={`${
                      dropDownFormData === "books"
                        ? "book id, name, author..."
                        : "member id, name..."
                    }`}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                {dropDownFormData === "books" ? (
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" class="px-2 py-3">
                        ID
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Name / Author
                      </th>
                      <th scope="col" class="hidden md:table-cell px-6 py-3">
                        Status
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                ) : (
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" class="px-2 py-3">
                        ID
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Name
                      </th>
                      <th scope="col" class="hidden md:table-cell px-6 py-3">
                        Gender
                      </th>
                      <th scope="col" class="hidden md:table-cell px-6 py-3">
                        Joined on
                      </th>

                      <th scope="col" class="px-6 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                )}

                <tbody>
                  {dropDownFormData === "books"
                    ? entityList.books
                    : entityList.members}
                </tbody>
              </table>
            </div>

            <nav class="pt-4" aria-label="Table navigation">
              <ul class="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                <li
                  onClick={() => {
                    setEntityListPage((prevEntityListPage) =>
                      prevEntityListPage !== 1
                        ? prevEntityListPage - 1
                        : prevEntityListPage
                    );
                  }}
                >
                  <p class="cursor-pointer flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    Prev
                  </p>
                </li>
                <li>
                  <p class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    {entityListPage}
                  </p>
                </li>

                <li
                  onClick={() => {
                    setEntityListPage(
                      (prevEntityListPage) => prevEntityListPage + 1
                    );
                  }}
                >
                  <p class="cursor-pointer flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    Next
                  </p>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
}