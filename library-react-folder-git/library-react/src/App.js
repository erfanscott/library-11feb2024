import React, { createContext, useEffect } from "react";
import MemberService from "./REST/member-service";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./routes/Login";
import Profile from "./routes/Profile";
import Register from "./routes/Register";
import useAuth from "./hooks/useAuth";
import Dummy from "./routes/Dummy";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AuthContext = createContext();

function App() {
  const [auth, updateAuth] = useAuth();
  const { currentUser, isFetching, isLoggedIn } = auth;

  if (isFetching) {
    return <h1>Loading.....</h1>;
  } else {
    return (
      <div id="App">
        <AuthContext.Provider value={{ auth, updateAuth }}>
          <Routes>
            {/* <Route element={<Dummy />} path="/dummy" /> */}
            <Route element={<Login />} path="/log-in" />
            <Route element={<Register />} path="/register" />
            <Route element={<Profile />} path="/profile" />
            <Route element={<Navigate to="/profile" />} path="*" />
          </Routes>
        </AuthContext.Provider>
        <ToastContainer />
      </div>
    );
  }
}

export default App;
