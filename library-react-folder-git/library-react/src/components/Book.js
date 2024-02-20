import React from "react";

export default function Book() {
  const isAvailable = false;

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
              <div class="text-base font-semibold">White Nights</div>
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
              <div class="text-base font-semibold">Feyodor Dostoevsky</div>
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
                    isAvailable ? "bg-green-500" : "bg-red-500"
                  } me-2`}
                ></div>{" "}
                {isAvailable ? "AVAILABLE" : "BORROWED"}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <table
        class={`${
          isAvailable && "hidden"
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
              <div class="text-base font-semibold">Erfan Mirhoseini</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
