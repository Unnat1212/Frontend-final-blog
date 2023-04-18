import React from "react";
import UserNav from "./UserNav";

function UserProfile() {
  let isLoggedIn = JSON.parse(localStorage.getItem("user"));
  // console.log(isLoggedIn);

  return (
    <div>
      <UserNav />
      <h1 style={{ textAlign: "center", marginTop: "1rem" }}>
        Name : {isLoggedIn.firstName}
        {isLoggedIn.lastName}
      </h1>
      <div style={{ textAlign: "center" }}>Email : {isLoggedIn.email}</div>
      <div style={{ textAlign: "center" }}>
        Phone Number : {isLoggedIn.phoneNumber}
      </div>
    </div>
  );
}

export default UserProfile;
