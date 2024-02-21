import React, { useState } from "react";
import Member from "../Member";
import Book from "../Book";
export default function DummyModal({ isVisible, setIsVisible, item, id }) {
  return (
    <div
      className={`${
        !isVisible && "hidden"
      } fixed overflow-y-auto inset-0 z-50 h-dvh w-screen bg-slate-800 bg-opacity-35`}
    >
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            {item === "book" ? <Book /> : <Member />}
            <button
              onClick={() => {
                setIsVisible(false);
              }}
              type="button"
              className="col-span-1 text-gray-500 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
