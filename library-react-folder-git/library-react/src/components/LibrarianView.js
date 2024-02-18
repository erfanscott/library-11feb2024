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

export default function LibrarianView({ logout }) {
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

  return (
    <section className="bg-gray-200 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full max-h-[90vh] bg-white rounded-md sm:rounded-lg shadow dark:border md:mt-0 sm:max-w-[70%] xlg:max-w-5xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="relative overflow-x-auto px-6 py-6 shadow-md rounded-md sm:rounded-lg">
            <div className="mb-8 space-y-4">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                Welcome {usersName}
              </h1>
              <h2 className="cursor-pointer text-sm spa font-bold leading-tight tracking-tight text-gray-900 md:text-[14px] dark:text-white">
                You have signed in as a library member !{" "}
                <span
                  onClick={logout}
                  className="ml-1 cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline"
                >
                  Logout
                </span>
              </h2>
            </div>
            <div class="flex items-start justify-between pb-4 dark:bg-gray-900">
              {/*book/member select */}

              <form class="max-w-sm">
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

              <div className="flex space-x-2">
                <button
                  type="button"
                  class="focus:outline-none text-white whitespace-nowrap bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-xs px-2 py-1 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  ADD MEMBER
                </button>

                <div class="relative">
                  <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
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
                    class="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={`${
                      dropDownFormData === "books"
                        ? "search book, author..."
                        : "search member..."
                    }`}
                    required
                  />
                </div>
              </div>
            </div>

            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Position
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <div class="">
                      <div class="text-base font-semibold">Neil Sims</div>
                      <div class="font-normal text-gray-500">
                        neil.sims@flowbite.com
                      </div>
                    </div>
                  </th>
                  <td class="px-6 py-4">React Developer</td>
                  <td class="px-6 py-4">
                    <div class="flex items-center">
                      <div class="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>{" "}
                      Online
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <a
                      href="#"
                      class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit user
                    </a>
                  </td>
                </tr>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    class="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <div class="">
                      <div class="text-base font-semibold">Bonnie Green</div>
                      <div class="font-normal text-gray-500">
                        bonnie@flowbite.com
                      </div>
                    </div>
                  </th>
                  <td class="px-6 py-4">Designer</td>
                  <td class="px-6 py-4">
                    <div class="flex items-center">
                      <div class="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>{" "}
                      Online
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <a
                      href="#"
                      class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit user
                    </a>
                  </td>
                </tr>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    class="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <div class="">
                      <div class="text-base font-semibold">Jese Leos</div>
                      <div class="font-normal text-gray-500">
                        jese@flowbite.com
                      </div>
                    </div>
                  </th>
                  <td class="px-6 py-4">Vue JS Developer</td>
                  <td class="px-6 py-4">
                    <div class="flex items-center">
                      <div class="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>{" "}
                      Online
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <a
                      href="#"
                      class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit user
                    </a>
                  </td>
                </tr>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    class="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <div class="">
                      <div class="text-base font-semibold">Thomas Lean</div>
                      <div class="font-normal text-gray-500">
                        thomes@flowbite.com
                      </div>
                    </div>
                  </th>
                  <td class="px-6 py-4">UI/UX Engineer</td>
                  <td class="px-6 py-4">
                    <div class="flex items-center">
                      <div class="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>{" "}
                      Online
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <a
                      href="#"
                      class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit user
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
