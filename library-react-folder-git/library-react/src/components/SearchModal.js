import React, { useState } from "react";

export default function SearchModal({
  isVisible,
  setIsVisible,
  placeholder,
  searchCallBack,
}) {
  const [inputValue, setInputValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const searchOnChange = async (e) => {
    if (e.target.value === "") setSearchResult([]);
    else {
      const results = await searchCallBack(e.target.value);
      setSearchResult(results);
    }
  };

  const searchResultList = searchResult.map((book) => {
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
        <td className="px-6 py-4">{book.authorName}</td>

        <td class="px-6 py-4">{book.availability}</td>
      </tr>
    );
  });

  return (
    <div
      className={`${
        !isVisible && "hidden"
      } fixed inset-0 z-50 h-screen w-screen bg-slate-800 bg-opacity-35`}
    >
      <div class="p-4 w-full max-w-md max-h-full mx-auto">
        <div class="bg-white rounded-lg shadow dark:bg-gray-700">
          <form className="p-4 md:p-5">
            <label
              for="default-search"
              class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
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
                onChange={searchOnChange}
                type="search"
                id="default-search"
                class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={placeholder}
                required
              />
              <button
                type="submit"
                class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </form>
          <div className="p-4 md:p-5">
            <table class="block w-full overflow-x-scroll rounded-xl border-gray-300 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Book name
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Author
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Availability
                  </th>
                </tr>
              </thead>
              <tbody>{searchResultList}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
