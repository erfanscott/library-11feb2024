import React from "react";

export default function ConfirmationModal({
  isVisible,
  setIsVisible,
  setIsConfirmed,
}) {
  return (
    <div
      className={`${
        !isVisible && "hidden"
      } fixed inset-0 z-50 flex items-start pt-8 h-dvh w-screen bg-slate-800 bg-opacity-35`}
    >
      <div className="max-h-[80%] w-[80%] max-w-md overflow-y-auto mx-auto bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Are you sure?
          </h1>
          <div className="flex space-x-2">
            <button
              onClick={() => {
                setIsConfirmed(true);
                setIsVisible(false);
              }}
              class="text-white bg-green-700 hover:bg-green-700 active:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Yes
            </button>
            <button
              onClick={() => {
                setIsVisible(false);
              }}
              type="button"
              class="text-white bg-red-600 hover:bg-red-700 active:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
