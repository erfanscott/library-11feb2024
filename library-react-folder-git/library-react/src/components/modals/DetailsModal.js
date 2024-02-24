import React, { useEffect, useState } from "react";
import Member from "../Member";
import Book from "../Book";
import BookService from "../../REST/book-service";
import MemberService from "../../REST/member-service";
import { toast } from "react-toastify";
import { Await } from "react-router-dom";
export default function DetailsModal({ isVisible, setIsVisible, item, id }) {
  const [toBeShownEntity, setToBeShownEntity] = useState(null);

  async function fetchToBeShownEntity() {
    if (item === "book") {
      setToBeShownEntity(await BookService.fetchBookById(id));
    } else {
      setToBeShownEntity(await MemberService.fetchMemberById(id));
    }
  }

  /**
   * ISSSSSSSSSS ThiSSSSSSSSSSSSS TrYYYYYYYYYYYYYY CatcHHHHHHHHHHHHHHHH VaLiDDDDDDDDDDDDDDDDDDDDd????
   */
  useEffect(() => {
    try {
      fetchToBeShownEntity();
    } catch (error) {
      toast.error("failed while fetching the entity");
    }
  }, []);

  return toBeShownEntity == null ? (
    <h1>Waiting...</h1>
  ) : (
    <div
      className={`${
        !isVisible && "hidden"
      } fixed inset-0 z-50 flex pt-8 [@media(min-width:400px)]:items-center [@media(min-width:400px)]:pt-0 h-dvh w-screen bg-slate-800 bg-opacity-35`}
    >
      <div className="max-h-[80%] w-[80%] max-w-md overflow-y-auto mx-auto bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          {item === "book" ? (
            <Book book={toBeShownEntity} />
          ) : (
            <Member member={toBeShownEntity} />
          )}
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
  );
}
