import React, { useState } from "react";

export default function DetailsModal({ isVisible, setIsVisible, item, id }) {
  return (
    <div
      className={`${
        !isVisible && "hidden"
      } fixed inset-0 z-50 h-dvh w-screen bg-slate-800 bg-opacity-35`}
    >
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            {item === "books" ? <h1>BOOK DETAILS</h1> : <h1>Member DETAILS</h1>}
          </div>
        </div>
      </div>
    </div>
  );
}
