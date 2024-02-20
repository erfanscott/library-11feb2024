import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../App";
import LibrarianView from "../components/role-view/LibrarianView";
import MemberView from "../components/role-view/MemberView";
import NewMemberView from "../components/role-view/NewMemberViwe";
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
        <NewMemberView logout={logout} />
      ) : (
        <LibrarianView logout={logout} />
      )}
    </main>
  );
}
