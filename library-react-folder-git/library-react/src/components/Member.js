import React from "react";

export default function Member({ member }) {
  const { firstName, lastName, borrowedBooks, gender, email } = member;

  return (
    <div className="">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead class="text-xs text-gray-700 uppercase bg-gray-100  ">
          <tr>
            <th scope="col" class="px-2 py-3">
              Name
            </th>
          </tr>
        </thead>

        <tbody>
          <tr class=" bg-white border-b ">
            <td class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap ">
              <div class="text-base font-semibold">{`${firstName}\t${lastName}`}</div>
            </td>
          </tr>
        </tbody>
      </table>

      <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead class="text-xs text-gray-700 uppercase bg-gray-100  ">
          <tr>
            <th scope="col" class="px-2 py-3">
              Email
            </th>
          </tr>
        </thead>

        <tbody>
          <tr class=" bg-white border-b  ">
            <td class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap ">
              <div class="text-base font-semibold">{email}</div>
            </td>
          </tr>
        </tbody>
      </table>

      <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead class="text-xs text-gray-700 uppercase bg-gray-100  ">
          <tr>
            <th scope="col" class="px-2 py-3">
              Gender
            </th>
          </tr>
        </thead>

        <tbody>
          <tr class=" bg-white border-b ">
            <td class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap ">
              <div class="text-base font-semibold">{gender}</div>
            </td>
          </tr>
        </tbody>
      </table>
      <table class={`w-full text-sm text-left rtl:text-right text-gray-500 `}>
        <thead class="text-xs text-gray-700 uppercase bg-gray-100 ">
          <tr>
            <th scope="col" class="px-2 py-3">
              Borrowed Books
            </th>
          </tr>
        </thead>

        <tbody className="">
          {borrowedBooks &&
            borrowedBooks.map((book) => (
              <tr class=" bg-white border-b ">
                <td class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap ">
                  <div class="text-base font-semibold">{book.name}</div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
