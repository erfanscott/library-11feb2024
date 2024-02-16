import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../App";
import LibrarianView from "../components/LibrarianView";
import MemberView from "../components/MemberView";
import AuthService from "../REST/auth-service";

export default function Profile() {
  const { auth, updateAuth } = useContext(AuthContext);
  const { currentUser, isLoggedIn } = auth;

  const logout = async () => {
    try {
      await new AuthService({}).logOut();
      updateAuth();
    } catch (error) {
      console.log("Could not log out");
    }
  };

  if (!isLoggedIn) {
    return <Navigate to="/log-in" />;
  }
  return (
    <main>
      {currentUser.authorities.some((role) => role.name === "ROLE_MEMBER") ? (
        <MemberView logout={logout} />
      ) : (
        <LibrarianView logout={logout} />
      )}
    </main>
  );
}
