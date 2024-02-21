import React from "react";

export default function Member() {
  const isAvailable = false;

  return (
    <div className="">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-2 py-3">
              Name
            </th>
          </tr>
        </thead>

        <tbody>
          <tr class=" bg-white border-b dark:bg-gray-800 dark:border-gray-700 ">
            <td class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
              <div class="text-base font-semibold">Erfan Mirhoseini</div>
            </td>
          </tr>
        </tbody>
      </table>

      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-2 py-3">
              Email
            </th>
          </tr>
        </thead>

        <tbody>
          <tr class=" bg-white border-b dark:bg-gray-800 dark:border-gray-700 ">
            <td class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
              <div class="text-base font-semibold">erfanscott@gmail.com</div>
            </td>
          </tr>
        </tbody>
      </table>

      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-2 py-3">
              Gender
            </th>
          </tr>
        </thead>

        <tbody>
          <tr class=" bg-white border-b dark:bg-gray-800 dark:border-gray-700  ">
            <td class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
              <div class="text-base font-semibold">Male</div>
            </td>
          </tr>
        </tbody>
      </table>
      <table
        class={`w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400`}
      >
        <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-2 py-3">
              Borrowed Books
            </th>
          </tr>
        </thead>

        <tbody className="">
          <tr class=" bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
              <div class="text-base font-semibold">Notes from Underground Notes from Underground Notes from Underground</div>
            </td>
          </tr>
          <tr class=" bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
              <div class="text-base font-semibold">Notes from Underground</div>
            </td>
          </tr>
          <tr class=" bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
              <div class="text-base font-semibold">Notes from Underground</div>
            </td>
          </tr>
          <tr class=" bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
              <div class="text-base font-semibold">Notes from Underground</div>
            </td>
          </tr>
          <tr class=" bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
              <div class="text-base font-semibold">Notes from Underground</div>
            </td>
          </tr>
          <tr class=" bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
              <div class="text-base font-semibold">Notes from Underground</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
