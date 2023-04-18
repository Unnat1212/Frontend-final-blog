import React from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./Login.module.css";

function UserNav() {
  let navigate = useNavigate();
  let isLoggedIn = JSON.parse(localStorage.getItem("user"));
  // console.log(isLoggedIn);
  const profileHandler = () => {
    // console.log("clicked");
    navigate("/profile");
  };
  const logoutHandler = () => {
    if (isLoggedIn) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      // console.log(isLoggedIn);
    }
  };
  return (
    <div className={classes.container}>
      <span className={classes.logo}>Blogs</span>
      {isLoggedIn && (
        <span
          className={classes.profile}
          onClick={profileHandler}
          style={{ height: "33px", paddingBottom: "9px" }}
        >
          {isLoggedIn.email.charAt(0)}
        </span>
      )}
      {isLoggedIn && (
        <button className={classes.logoutBtn} style={{ height: "40px" }}>
          <Link className={classes.logout} to="/login" onClick={logoutHandler}>
            {isLoggedIn ? "Logout" : "Login"}
          </Link>
        </button>
      )}
      {!isLoggedIn && (
        <button
          className={classes.logoutBtn}
          style={{ height: "35px", marginRight: "1rem", marginTop: "8px" }}
        >
          <Link className={classes.logout} to="/login">
            login
          </Link>
        </button>
      )}
    </div>
  );
}

export default UserNav;
