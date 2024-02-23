import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../App";
import LibrarianView from "../components/role-view/LibrarianView";
import MemberView from "../components/role-view/MemberView";
import NewMemberView from "../components/role-view/NewMemberViwe";
import AuthService from "../REST/auth-service";
import UserService from "../REST/user-service";
import populate from "../dummy";

export default function Profile() {
  // useEffect(() => {
  //   populate();
  // }, []);

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
  async function editProfile(formData) {
    try {
      await UserService.EditProfile(
        formData,
        currentUser.authorities.some((role) => role.name === "ROLE_MEMBER")
          ? "ROLE_MEMBER"
          : "ROLE_LIBRARIAN",
        currentUser.id
      );
      toast.success("Your profile has been successfully updated");
      updateAuth();
    } catch (error) {
      toast.error(error.message);
    }
  }

  if (!isLoggedIn) {
    return <Navigate to="/log-in" />;
  }
  return (
    <main>
      {currentUser.authorities.some((role) => role.name === "ROLE_MEMBER") ? (
        <NewMemberView logout={logout} editProfile={editProfile} />
      ) : (
        <LibrarianView logout={logout} editProfile={editProfile} />
      )}
    </main>
  );
}
