import React, { useState } from "react";

export default function TextInputModal({
  isVisible,
  setIsVisible,
  title,
  inputLabel,
  actionName,
  actionMethod,
}) {
  const [inputValue, setInputValue] = useState("");
  return (
    <div
      className={`${
        !isVisible && "hidden"
      } fixed inset-0 z-50 h-screen w-screen bg-slate-800 bg-opacity-35`}
    >
      <div class=" p-4 w-full max-w-md max-h-full mx-auto">
        <div class="bg-white rounded-lg shadow">
          <div class=" p-4 md:p-5 border-b rounded-t">
            <h3 class="text-lg text-center font-semibold text-gray-900">
              {title}
            </h3>
          </div>

          <form className="p-4 md:p-5">
            <div class="grid gap-3 mb-4 grid-cols-4 space-y-4">
              <div class="col-span-4">
                <label
                  for="name"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  {inputLabel}
                </label>
                <input
                  type="text"
                  name="textInput"
                  id="textInput"
                  onChange={(e) => {
                    setInputValue(e.target.value);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Type..."
                  required=""
                />
              </div>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  actionMethod(inputValue);
                }}
                className="col-span-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-3 py-1"
              >
                {actionName}
              </button>
              <button
                onClick={() => {
                  setIsVisible(false);
                }}
                type="button"
                className="col-span-1 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-3 py-1 hover:text-gray-900 focus:z-10"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
