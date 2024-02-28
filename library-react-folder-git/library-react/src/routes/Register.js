import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthService from "../REST/auth-service";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    pwd: "",
    gender: "MALE",
    role: "MEMBER",
  });
  const { firstName, lastName, email, pwd, gender, role } = formData;

  const onFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const authService = new AuthService({});
      const createdUser = await authService.signUp(formData);
      toast.success("The user has been successfully created");
      navigate("/log-in");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section className="bg-gray-200 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign up to my library
            </h1>

            <form class="max-w-sm mx-auto" onSubmit={onSubmit}>
              <div class="mb-5 flex flex-col tiny:flex-row justify-between">
                <div className="mb-5 tiny:mb-0">
                  {" "}
                  <label
                    for="firstName"
                    class="mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your first name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={firstName}
                    onChange={onFormChange}
                    placeholder="Enter your first name"
                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    required
                  />
                </div>
                <div className="">
                  {" "}
                  <label
                    for="lastNme"
                    class="mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your last name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={lastName}
                    onChange={onFormChange}
                    placeholder="Enter your last name"
                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    required
                  />
                </div>
              </div>

              <div class="mb-5">
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={onFormChange}
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  placeholder="username@domain.com"
                  required
                />
              </div>
              <div class="mb-5">
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your password
                </label>
                <input
                  type="text"
                  id="password"
                  name="pwd"
                  value={pwd}
                  onChange={onFormChange}
                  placeholder="••••••••"
                  class="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  required
                />
              </div>

              <div class="mb-8 flex flex-col tiny:flex-row justify-between">
                <div className="space-y-4 mb-5 tiny:mb-0">
                  <h3 class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your gender
                  </h3>{" "}
                  <div className="flex">
                    <div class="flex items-center me-4">
                      <input
                        id="male-radio"
                        type="radio"
                        value="MALE"
                        checked={gender === "MALE"}
                        name="gender"
                        onChange={onFormChange}
                        class="w-3 h-3 text-purple-600 bg-gray-100 border-gray-300 dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        for="male-radio"
                        class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Male
                      </label>
                    </div>
                    <div class="flex items-center me-4">
                      <input
                        id="female-radio"
                        type="radio"
                        value="FEMALE"
                        checked={gender === "FEMALE"}
                        name="gender"
                        onChange={onFormChange}
                        class="w-3 h-3 text-purple-600 bg-gray-100 border-gray-300 dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        for="female-radio"
                        class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Female
                      </label>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Choose your role
                  </h3>{" "}
                  <div className="flex">
                    <div class="flex items-center me-4">
                      <input
                        id="member-radio"
                        type="radio"
                        value="MEMBER"
                        checked={role === "MEMBER"}
                        name="role"
                        onChange={onFormChange}
                        class="w-3 h-3 text-purple-600 bg-gray-100 border-gray-300 dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        for="member-radio"
                        class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Member
                      </label>
                    </div>
                    <div class="flex items-center me-4">
                      <input
                        id="librarian-radio"
                        type="radio"
                        value="LIBRARIAN"
                        checked={role === "LIBRARIAN"}
                        name="role"
                        onChange={onFormChange}
                        class="w-3 h-3 text-purple-600 bg-gray-100 border-gray-300 dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        for="librarian-radio"
                        class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Librarian
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                class="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Register new account
              </button>
              <p className="mt-4 text-sm font-light text-gray-500 dark:text-gray-400">
                Have an account already?{" "}
                <span
                  onClick={() => {
                    navigate("/log-in");
                  }}
                  className="cursor-pointer font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign in
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
