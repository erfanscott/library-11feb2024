import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../App";
import BookService from "../../REST/book-service";
import MemberService from "../../REST/member-service";
import UserService from "../../REST/user-service";
import EditProfileModal from "../modals/EditProfileModal";
import AddItemModal from "../modals/AddItemModal";
import DetailsModal from "../modals/DetailsModal";
import ConfirmationModal from "../modals/ConfirmationModal";

export default function LibrarianView({ logout, editProfile }) {
  const { auth, updateAuth } = useContext(AuthContext);
  const { currentUser } = auth;
  const usersName = currentUser.firstName;
  const navigate = useNavigate();

  /**
   * handling members or book actions..........................................
   */
  const [dropDownFormData, setDropDownFormData] = useState("books");

  /**
   * handling to be confirmed action and details functionality.................
   */
  const [toBeConfirmedAction, setToBeConfirmedAction] = useState(undefined);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  /**
   * handling rendered table...................................................
   */
  const [entityListPage, setEntityListPage] = useState(1);
  const [entityList, setEntityList] = useState([]);
  const [toBeRenderedEntityList, setToBeRenderedEntityList] = useState([]);
  const [searchedKey, setSearchedKey] = useState("");
  const [isLastPage, setIsLastPage] = useState(false);
  /**
   * handling Modals...........................................................
   */
  const [isEditProfileModalVisible, setIsEditProfileModalVisible] =
    useState(false);
  const [isAddItemModalVisible, setIsAddItemModalVisible] = useState(false);
  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] =
    useState(false);

  /**
   * Event Handlers............................................................
   */
  const onDropDownFormChange = (e) => {
    setDropDownFormData(e.target.value);
  };
  const searchOnChange = (e) => {
    setSearchedKey(e.target.value);
    setEntityListPage(1);
  };

  /**
   * SIDE EFFECTS AND STATE Interdependence........................
   */
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
            return dropDownFormData === "members" ? (
              <tr
                key={`${entity.id}`}
                onClick={() => {
                  setSelectedItemId(id);
                  setIsDetailsModalVisible(true);
                }}
                class="cursor-pointer bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 active:bg-gray-200 dark:hover:bg-gray-600"
              >
                <td class="px-2 py-4 font-bold">{entity.id}</td>

                <td class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                  <div class="">
                    <div class="text-base font-semibold">
                      {entity.firstName + "\t" + entity.lastName}
                    </div>
                    <div class="font-normal text-gray-500">{entity.email}</div>
                  </div>
                </td>
                <td class="hidden md:table-cell px-6 py-4">{entity.gender}</td>

                <td class="px-6 py-4 space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedItemId(id);
                      setToBeConfirmedAction("deleteItem");
                      setIsConfirmationModalVisible(true);
                    }}
                    className="py-2 px-2 inline cursor-pointer text-xs  font-medium text-white rounded bg-red-600 active:bg-red-800 dark:bg-red-500 hover:underline"
                  >
                    Delete
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedItemId(id);
                      setIsDetailsModalVisible(true);
                    }}
                    className="py-2 px-2 inline cursor-pointer text-xs font-medium text-white rounded bg-blue-600 active:bg-blue-800 dark:bg-blue-500 hover:underline"
                  >
                    Details
                  </button>
                </td>
              </tr>
            ) : (
              <tr
                key={`${entity.id}`}
                onClick={() => {
                  setSelectedItemId(id);
                  setIsDetailsModalVisible(true);
                }}
                class="cursor-pointer bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 active:bg-gray-200 dark:hover:bg-gray-600"
              >
                <td class="px-2 py-4 font-bold">{entity.id}</td>

                <td class="flex items-center max-w-[250px] whitespace-normal px-6 py-4 text-gray-900 dark:text-white">
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
                <td class="px-6 py-6 space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedItemId(id);
                      setToBeConfirmedAction("deleteItem");
                      setIsConfirmationModalVisible(true);
                    }}
                    className="py-2 px-2 inline cursor-pointer text-xs  font-medium text-white rounded bg-red-600 active:bg-red-800 dark:bg-red-500 hover:underline"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      setSelectedItemId(id);
                      setIsDetailsModalVisible(true);
                    }}
                    className="py-2 px-2 inline cursor-pointer text-xs font-medium text-white rounded bg-blue-600 active:bg-blue-800 dark:bg-blue-500 hover:underline"
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
      try {
        if (toBeConfirmedAction === "deleteItem") {
          await deleteItem(selectedItemId);
          await updateEntityList();
          setIsConfirmed(false);
        } else if (toBeConfirmedAction === "logOut") {
          await logout();
          await updateAuth();
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

  /**
   * Function definitions........................................................................
   */

  async function addMember(formData) {
    try {
      await MemberService.add(formData);
      toast.success("the user has been successfully added");
      setIsAddItemModalVisible(false);
      updateEntityList();
    } catch (error) {
      toast.error(error.message);
    }
  }
  async function addBook(formData) {
    try {
      await BookService.add(formData);
      toast.success("The book has been successfully added to the library");
      setIsAddItemModalVisible(false);
    } catch (error) {
      toast.error(error.message);
    }
  }
  async function deleteItem(ItemId) {
    console.log(selectedItemId);
    if (dropDownFormData === "books") {
      await BookService.delete(ItemId);
    } else {
      await MemberService.delete(ItemId);
    }
  }
  async function searchBook(key, page) {
    const result = await BookService.search(key, page);
    return result;
  }
  async function searchMember(key, page) {
    const result = await MemberService.search(key, page);
    return result;
  }
  async function updateEntityList() {
    try {
      if (dropDownFormData === "books") {
        setEntityList(await searchBook(searchedKey, entityListPage));
      } else {
        setEntityList(await searchMember(searchedKey, entityListPage));
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div>
      <AddItemModal
        isVisible={isAddItemModalVisible}
        setIsVisible={setIsAddItemModalVisible}
        item={dropDownFormData === "books" ? "book" : "member"}
        addItemCallback={dropDownFormData === "books" ? addBook : addMember}
      />
      <DetailsModal
        isVisible={isDetailsModalVisible}
        setIsVisible={setIsDetailsModalVisible}
        item={dropDownFormData === "books" ? "book" : "member"}
        id={selectedItemId}
      />
      <EditProfileModal
        isVisible={isEditProfileModalVisible}
        setIsVisible={setIsEditProfileModalVisible}
        updateProfileCallBack={editProfile}
      />
      <ConfirmationModal
        isVisible={isConfirmationModalVisible}
        setIsVisible={setIsConfirmationModalVisible}
        setIsConfirmed={setIsConfirmed}
      />

      <section className="bg-gray-200 dark:bg-gray-900">
        <div className="flex flex-col items-center px-4 py-6 [@media(min-width:400px)]:px-6 [@media(min-width:660px)]:py-8 mx-auto md:h-screen">
          <div className="w-full bg-white rounded-md sm:rounded-lg shadow dark:border md:mt-0 max-w-5xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="relative px-6 py-6 shadow-md rounded-md sm:rounded-lg">
              <div className="mb-6 space-y-4">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                  Welcome {usersName}
                </h1>

                <div className="tiny:flex tiny:justify-between tiny:items-center">
                  <h2 className="cursor-pointer text-sm whitespace-nowrap mdLg:text-[18px] spa font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
                    You have signed in as a librarian !{" "}
                  </h2>
                  <div className="mt-4 tiny:mt-0 flex items-center space-x-2 flex-nowrap">
                    <button
                      onClick={() => {
                        setToBeConfirmedAction("logOut");
                        setIsConfirmationModalVisible(true);
                      }}
                      className="py-2 px-2 cursor-pointer text-xs  font-medium text-white rounded bg-red-600 active:bg-red-800 dark:bg-red-500 hover:underline"
                    >
                      Logout
                    </button>
                    <button
                      onClick={() => {
                        setIsEditProfileModalVisible(true);
                      }}
                      className="py-2 px-2 cursor-pointer text-xs font-medium text-white rounded bg-yellow-600 active:bg-yellow-800 dark:bg-yellow-500 hover:underline"
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
                    <option value="books">Books</option>
                    <option value="members">Members</option>
                  </select>
                </form>

                <div className="flex flex-col space-y-2 [@media(min-width:430px)]:flex-row [@media(min-width:430px)]:space-y-0 [@media(min-width:430px)]:space-x-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddItemModalVisible(true);
                    }}
                    class="py-2 px-2 whitespace-nowrap cursor-pointer text-xs font-medium text-white rounded bg-green-600 active:bg-green-800 dark:bg-green-500 hover:underline"
                  >
                    {`${
                      dropDownFormData === "books" ? "ADD BOOK" : "ADD MEMBER"
                    }`}
                  </button>

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
                      placeholder={`${
                        dropDownFormData === "books"
                          ? "book id, name, author..."
                          : "member id, name..."
                      }`}
                    />
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  {dropDownFormData === "books" ? (
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr className="">
                        <th class="px-2 py-3">ID</th>
                        <th class="inline-block px-6 py-3 max-w-[250px]">
                          Name / Author
                        </th>
                        <th class="hidden md:table-cell px-6 py-3">Status</th>
                        <th class="px-6 py-3">Action</th>
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

                        <th scope="col" class="px-6 py-3">
                          Action
                        </th>
                      </tr>
                    </thead>
                  )}

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
