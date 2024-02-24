import React from "react";

export default function Book({ book }) {
  const { availability, name, authorName, borrowedBy } = book;

  return (
    <div className="">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-2 py-3">
              Title
            </th>
          </tr>
        </thead>

        <tbody>
          <tr class=" bg-white border-b dark:bg-gray-800 dark:border-gray-700 ">
            <td class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
              <div class="text-base font-semibold">{name}</div>
            </td>
          </tr>
        </tbody>
      </table>

      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-2 py-3">
              Written By
            </th>
          </tr>
        </thead>

        <tbody>
          <tr class=" bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
              <div class="text-base font-semibold">{authorName}</div>
            </td>
          </tr>
        </tbody>
      </table>

      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-2 py-3">
              Status
            </th>
          </tr>
        </thead>

        <tbody>
          <tr class=" bg-white border-b dark:bg-gray-800 dark:border-gray-700 ">
            <td class=" px-6 py-4">
              <div class="flex items-center">
                <div
                  class={`h-2.5 w-2.5 rounded-full ${
                    availability === "AVAILABLE" ? "bg-green-500" : "bg-red-500"
                  } me-2`}
                ></div>{" "}
                {availability}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <table
        class={`${
          availability === "AVAILABLE" && "hidden"
        } w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400`}
      >
        <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-2 py-3">
              Borrowed By:
            </th>
          </tr>
        </thead>

        <tbody>
          <tr class=" bg-white border-b dark:bg-gray-800 dark:border-gray-700  ">
            <td class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
              <div class="text-base font-semibold">{`${borrowedBy.firstName}\t${borrowedBy.lastName}`}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
