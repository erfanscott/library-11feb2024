import { useEffect, useState } from "react";
import AuthService from "../REST/auth-service.js";

export default function useAuth() {
  const [auth, setAuth] = useState({
    currentUser: null,
    isLoggedIn: false,
    isFetching: true,
  });

  const updateAuth = (user, logInStatus) => {
    setAuth((prevAuth) => ({
      ...prevAuth,
      currentUser: user,
      isLoggedIn: logInStatus,
    }));
  };

  useEffect(() => {
    async function get() {
      try {
        const user = await new AuthService({}).getUser();
        setAuth((prevAuth) => ({
          ...auth,
          currentUser: user,
          isLoggedIn: true,
          isFetching: false,
        }));
      } catch (error) {
        setAuth((prevAuth) => ({
          ...auth,
          currentUser: null,
          isLoggedIn: false,
          isFetching: false,
        }));
      }
    }
    get();
  }, []);

  return [auth, updateAuth];
}
