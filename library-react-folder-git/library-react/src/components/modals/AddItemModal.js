import React, { useState } from "react";

export default function AddItemModal({
  isVisible,
  setIsVisible,
  item,
  addItemCallback,
}) {
  const [bookFormData, setBookFormData] = useState({
    name: "",
    authorName: "",
  });
  const { authorName } = bookFormData;

  const [userFormData, setUserFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    pwd: "",
    gender: "MALE",
    role: "MEMBER",
  });
  const { firstName, lastName, email, pwd, gender, role } = userFormData;

  const [formData, setFormData] = useState({});

  const onUserFormChange = (e) => {
    const { name, value } = e.target;
    setUserFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const onBookFormChange = (e) => {
    const { name, value } = e.target;
    setBookFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div
      className={`${
        !isVisible && "hidden"
      } fixed inset-0 z-50 flex pt-8 [@media(min-width:400px)]:c items-center [@media(min-width:400px)]:pt-0 h-dvh w-screen bg-slate-800 bg-opacity-35`}
    >
      <div className="max-h-[80%] w-[80%] max-w-md overflow-y-auto mx-auto bg-white rounded-lg shadow ">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
            {item === "book" ? "ADD BOOK" : "ADD MEMBER"}
          </h1>
          {item === "member" ? (
            <form
              class="max-w-sm mx-auto"
              onSubmit={(e) => {
                e.preventDefault();
                addItemCallback(
                  item === "member" ? userFormData : bookFormData
                );
              }}
            >
              <div class="mb-5 flex flex-col tiny:flex-row justify-between">
                <div className="mb-5 tiny:mb-0">
                  {" "}
                  <label
                    for="firstName"
                    class="mb-2 text-sm font-medium text-gray-900"
                  >
                    First name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={firstName}
                    onChange={onUserFormChange}
                    placeholder="Enter member's first name"
                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                    required
                  />
                </div>
                <div className="">
                  {" "}
                  <label
                    for="lastNme"
                    class="mb-2 text-sm font-medium text-gray-900 "
                  >
                    Last name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={lastName}
                    onChange={onUserFormChange}
                    placeholder="Enter member's last name"
                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                    required
                  />
                </div>
              </div>

              <div class="mb-5">
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={onUserFormChange}
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="username@domain.com"
                  required
                />
              </div>
              <div class="mb-5">
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Password
                </label>
                <input
                  type="text"
                  id="password"
                  name="pwd"
                  value={pwd}
                  onChange={onUserFormChange}
                  placeholder="••••••••"
                  class="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                />
              </div>

              <div class="mb-8 flex flex-col tiny:flex-row justify-between">
                <div className="space-y-4 mb-5 tiny:mb-0">
                  <h3 class="block mb-2 text-sm font-medium text-gray-900">
                    Gender
                  </h3>{" "}
                  <div className="flex">
                    <div class="flex items-center me-4">
                      <input
                        id="male-radio"
                        type="radio"
                        value="MALE"
                        checked={gender === "MALE"}
                        name="gender"
                        onChange={onUserFormChange}
                        class="w-3 h-3 text-purple-600 bg-gray-100 border-gray-300"
                      />
                      <label
                        for="male-radio"
                        class="ms-2 text-sm font-medium text-gray-900 "
                      >
                        Male
                      </label>
                    </div>
                    <div class="flex items-center me-4">
                      <input
                        id="female-radio"
                        type="radio"
                        value="FEMALE"
                        checked={gender === "FEMALE"}
                        name="gender"
                        onChange={onUserFormChange}
                        class="w-3 h-3 text-purple-600 bg-gray-100 border-gray-300"
                      />
                      <label
                        for="female-radio"
                        class="ms-2 text-sm font-medium text-gray-900 "
                      >
                        Female
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <button
                  type="submit"
                  class="text-white bg-green-700 hover:bg-green-700 active:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Register member
                </button>
                <button
                  onClick={() => {
                    setIsVisible(false);
                  }}
                  type="button"
                  className="col-span-1 text-gray-500 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <form
              class="max-w-sm mx-auto"
              onSubmit={(e) => {
                e.preventDefault();
                addItemCallback(
                  item === "member" ? userFormData : bookFormData
                );
              }}
            >
              <div class="mb-5 flex flex-col tiny:flex-row justify-between">
                <div className="mb-5 tiny:mb-0">
                  {" "}
                  <label
                    for="name"
                    class="mb-2 text-sm font-medium text-gray-900"
                  >
                    Book's name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={bookFormData.name}
                    onChange={onBookFormChange}
                    placeholder="Enter the name of the book"
                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                    required
                  />
                </div>
                <div className="">
                  {" "}
                  <label
                    for="authorName"
                    class="mb-2 text-sm font-medium text-gray-900 "
                  >
                    AuthorName's name
                  </label>
                  <input
                    type="text"
                    id="authorName"
                    name="authorName"
                    value={authorName}
                    onChange={onBookFormChange}
                    placeholder="Enter AuthorName's name"
                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <button
                  type="submit"
                  class="text-white bg-green-700 hover:bg-green-700 active:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Add to the library
                </button>
                <button
                  onClick={() => {
                    setIsVisible(false);
                  }}
                  type="button"
                  className="col-span-1 text-gray-500 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
