import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../App";
import BookService from "../../REST/book-service";
import MemberService from "../../REST/member-service";
import UserService from "../../REST/user-service";
import SearchModal from "../SearchModal";
import TextInputModal from "../TextInputModal";
import UpdateProfileModal from "../modals/EditProfileModal";
import DetailsModal from "../modals/DetailsModal";
import EditProfileModal from "../modals/EditProfileModal";
import ConfirmationModal from "../modals/ConfirmationModal";

export default function NewMemberView({ logout, editProfile }) {
  const navigate = useNavigate();

  const [dropDownFormData, setDropDownFormData] = useState("all-books");

  const { auth, updateAuth } = useContext(AuthContext);
  const { currentUser } = auth;
  const usersName = currentUser.firstName;
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  const [toBeConfirmedAction, setToBeConfirmedAction] = useState(undefined);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const [isEditProfileModalVisible, setIsEditProfileModalVisible] =
    useState(false);
  const [isAddItemModalVisible, setIsAddItemModalVisible] = useState(false);
  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] =
    useState(false);

  const [entityListPage, setEntityListPage] = useState(1);
  const [entityList, setEntityList] = useState([]);
  const [toBeRenderedEntityList, setToBeRenderedEntityList] = useState([]);
  const [searchedKey, setSearchedKey] = useState("");
  const [isLastPage, setIsLastPage] = useState(false);
  /******************************************************************* */
  const onDropDownFormChange = (e) => {
    setDropDownFormData(e.target.value);
  };
  const searchOnChange = (e) => {
    setSearchedKey(e.target.value);
    setEntityListPage(1);
  };

  /**************************************************************** */

  useEffect(() => {
    updateEntityList();
  }, [entityListPage, searchedKey, dropDownFormData]);

  useEffect(() => {
    setSearchedKey("");
    setEntityListPage(1);
  }, [dropDownFormData]);

  useEffect(() => {
    setToBeRenderedEntityList(
      !entityList
        ? []
        : entityList.map((entity) => {
            const { id } = entity;
            return (
              <tr
                key={`${id}`}
                onClick={() => {
                  setSelectedItemId(id);
                  setIsDetailsModalVisible(true);
                }}
                class="cursor-pointer bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 active:bg-gray-200 dark:hover:bg-gray-600"
              >
                <td class="px-2 py-4 font-bold">{id}</td>

                <td class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                  <div class="">
                    <div class="text-base font-semibold">{entity.name}</div>
                    <div class="font-normal text-gray-500">
                      {entity.authorName}
                    </div>
                  </div>
                </td>

                <td class="hidden md:table-cell px-6 py-4">
                  <div class="flex items-center">
                    <div
                      class={`h-2.5 w-2.5 rounded-full ${
                        entity.availability === "AVAILABLE"
                          ? "bg-green-500"
                          : "bg-red-500"
                      } me-2`}
                    ></div>{" "}
                    {entity.availability}
                  </div>
                </td>
                <td class="px-6 py-4 flex items-end space-x-2 min-w-[170px]">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (
                        entity.borrowedBy &&
                        entity.borrowedBy.id != currentUser.id
                      ) {
                        return;
                      }
                      setToBeConfirmedAction(
                        entity.availability === "AVAILABLE"
                          ? "borrowBook"
                          : "returnBook"
                      );
                      setSelectedItemId(id);
                      setIsConfirmationModalVisible(true);
                    }}
                    className={`${
                      entity.availability === "AVAILABLE"
                        ? "bg-pink-700 active:bg-pink-900"
                        : entity.borrowedBy.id == currentUser.id
                          ? "bg-violet-700 active:bg-violet-900"
                          : "bg-pink-200"
                    } py-2 px-2 cursor-pointer text-xs font-medium text-white rounded bg-blue-600 dark:bg-blue-500 hover:underline`}
                  >
                    {entity.availability === "AVAILABLE"
                      ? "Borrow"
                      : entity.borrowedBy.id == currentUser.id
                        ? "Return"
                        : "Borrow"}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedItemId(id);
                      setIsDetailsModalVisible(true);
                    }}
                    className="py-2 px-2 cursor-pointer text-xs font-medium text-white rounded bg-blue-600 active:bg-blue-800 dark:bg-blue-500 hover:underline"
                  >
                    Details
                  </button>
                </td>
              </tr>
            );
          })
    );
    if (!entityList) {
      console.log(entityListPage);
      if (entityListPage != 1) {
        setEntityListPage((prevEntityListPage) => prevEntityListPage - 1);
      }
      setIsLastPage(true);
    } else if (entityList && entityList.length < 10) {
      setIsLastPage(true);
    } else {
      setIsLastPage(false);
    }
  }, [entityList]);

  useEffect(() => {
    const confirmedAction = async () => {
      console.log("WAS IN CONFIRMED ACTION");
      console.log(toBeConfirmedAction);
      try {
        if (toBeConfirmedAction === "returnBook") {
          await returnBook(selectedItemId);
          await updateEntityList();
          toast.success("the book has been successfully returned");
          setIsConfirmed(false);
        } else if (toBeConfirmedAction === "logOut") {
          await logout();
          await updateAuth();
          setIsConfirmed(false);
        } else if (toBeConfirmedAction === "borrowBook") {
          await borrowBook(selectedItemId);
          await updateEntityList();
          toast.success("the book has been successfully borrowed");
          setIsConfirmed(false);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };
    if (isConfirmed) {
      confirmedAction();
    }
  }, [isConfirmed]);

  async function borrowBook(bookId) {
    await new MemberService({}).borrowBook(currentUser.id, bookId);
  }

  async function returnBook(bookId) {
    await new MemberService({}).returnBook(currentUser.id, bookId);
  }

  async function searchBook(searchKey, page) {
    const result = await BookService.search(searchKey, page);
    return result;
  }

  async function searchBorrowedBooks(searchKey, page) {
    const result = await BookService.searchBorrowedByMember(
      searchKey,
      page,
      currentUser.id
    );
    return result;
  }

  async function updateEntityList() {
    try {
      if (dropDownFormData === "all-books") {
        setEntityList(await searchBook(searchedKey, entityListPage));
      } else {
        setEntityList(await searchBorrowedBooks(searchedKey, entityListPage));
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  // for (let i = 0; i < 3; i++) {
  //   let isAvailable;
  //   isAvailable = i % 2 === 0 ? true : false;

  //   entityList.push(
  //     <tr
  //       onClick={() => {}}
  //       class="cursor-pointer bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 active:bg-gray-200 dark:hover:bg-gray-600"
  //     >
  //       <td class="px-2 py-4 font-bold">1</td>

  //       <td class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
  //         <div class="">
  //           <div class="text-base font-semibold">White Nights</div>
  //           <div class="font-normal text-gray-500">
  //             Fyodor Mikhailovich Dostoevsky
  //           </div>
  //         </div>
  //       </td>

  //       <td class="hidden md:table-cell px-6 py-4">
  //         <div class="flex items-center">
  //           <div
  //             class={`h-2.5 w-2.5 rounded-full ${
  //               isAvailable ? "bg-green-500" : "bg-red-500"
  //             } me-2`}
  //           ></div>{" "}
  //           {isAvailable ? "AVAILABLE" : "BORROWED"}
  //         </div>
  //       </td>
  //       <td class="px-6 py-4 flex items-end space-x-2">
  //         <button
  //           onClick={(e) => {
  //             e.stopPropagation();
  //             setIsConfirmationModalVisible(true);
  //           }}
  //           className={`${
  //             isAvailable
  //               ? "bg-pink-700 active:bg-pink-900"
  //               : "bg-violet-700 active:bg-violet-900"
  //           } py-2 px-2 cursor-pointer text-xs font-medium text-white rounded bg-blue-600 dark:bg-blue-500 hover:underline`}
  //         >
  //           {isAvailable ? "Borrow" : "Return"}
  //         </button>
  //         <button
  //           onClick={(e) => {
  //             e.stopPropagation();
  //             setIsDetailsModalVisible(true);
  //           }}
  //           className="py-2 px-2 cursor-pointer text-xs font-medium text-white rounded bg-blue-600 active:bg-blue-800 dark:bg-blue-500 hover:underline"
  //         >
  //           details
  //         </button>
  //       </td>
  //     </tr>
  //   );
  // }

  return (
    <div>
      {isDetailsModalVisible && (
        <DetailsModal
          isVisible={isDetailsModalVisible}
          setIsVisible={setIsDetailsModalVisible}
          item={"book"}
          id={selectedItemId}
        />
      )}
      {isEditProfileModalVisible && (
        <EditProfileModal
          isVisible={isEditProfileModalVisible}
          setIsVisible={setIsEditProfileModalVisible}
          updateProfileCallBack={editProfile}
          user={currentUser}
        />
      )}
      {isConfirmationModalVisible && (
        <ConfirmationModal
          isVisible={isConfirmationModalVisible}
          setIsVisible={setIsConfirmationModalVisible}
          setIsConfirmed={setIsConfirmed}
        />
      )}
      <section className="bg-gray-200 dark:bg-gray-900">
        <div className="flex flex-col items-center px-4 py-6 [@media(min-width:400px)]:px-6 [@media(min-width:660px)]:py-8 mx-auto md:h-screen">
          <div className="w-full bg-white rounded-md sm:rounded-lg shadow dark:border md:mt-0 max-w-5xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="relative px-6 py-6 shadow-md rounded-md sm:rounded-lg">
              <div className="mb-6 space-y-4">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                  Welcome {usersName}
                </h1>

                <div className="flex flex-col space-y-4 [@media(min-width:510px)]:space-y-0 [@media(min-width:510px)]:flex-row [@media(min-width:510px)]:justify-between [@media(min-width:510px)]:items-center">
                  <h2 className="cursor-pointer text-sm whitespace-nowrap mdLg:text-[18px] spa font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
                    You have signed in as a library member !{" "}
                  </h2>
                  <div className="mt-4 tiny:mt-0 flex items-center space-x-2 flex-nowrap">
                    <button
                      onClick={() => {
                        setToBeConfirmedAction("logOut");
                        setIsConfirmationModalVisible(true);
                      }}
                      className=" py-2 px-2 cursor-pointer text-xs  font-medium text-white rounded bg-red-600 active:bg-red-800 dark:bg-red-500 hover:underline"
                    >
                      Logout
                    </button>
                    <button
                      onClick={() => {
                        setIsEditProfileModalVisible(true);
                      }}
                      className=" py-2 px-2 cursor-pointer text-xs  font-medium text-white rounded bg-yellow-600 active:bg-yellow-800 dark:bg-yellow-500 hover:underline"
                    >
                      Edit profile
                    </button>
                  </div>
                </div>
              </div>
              <div class="flex flex-col space-y-6 [@media(min-width:550px)]:flex-row [@media(min-width:550px)]:space-y-0 [@media(min-width:550px)]:items-center [@media(min-width:550px)]:justify-between pb-4 dark:bg-gray-900">
                {/*book/member select */}

                <form class="w-full [@media(min-width:550px)]:w-auto">
                  <select
                    id="entity"
                    value={dropDownFormData}
                    onChange={onDropDownFormChange}
                    class="block bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="all-books">ALL Books</option>
                    <option value="borrowed-books">Borrowed Books</option>
                  </select>
                </form>

                <div className="flex flex-col space-y-2 [@media(min-width:430px)]:flex-row [@media(min-width:430px)]:space-y-0 [@media(min-width:430px)]:space-x-0">
                  <button
                    type="button"
                    class="pyl-2 pxl-2 whitespace-nowrap cursor-pointer text-xs  font-medium text-white rounded bg-pink-900 dark:bg-green-500 hover:underline"
                  ></button>

                  <div class="relative flex-1">
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
                      onChange={searchOnChange}
                      type="search"
                      id="default-search"
                      value={searchedKey}
                      class="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="book id, name, author..."
                    />
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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

                  <tbody>{toBeRenderedEntityList}</tbody>
                </table>
              </div>

              <nav class="pt-4" aria-label="Table navigation">
                <ul class="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                  <li
                    className={`${entityListPage === 1 ? "hidden" : ""}`}
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
                    className={`${isLastPage ? "hidden" : ""}`}
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
    </div>
  );
}
