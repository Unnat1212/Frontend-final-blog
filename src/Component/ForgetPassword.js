import React from "react";
import UserNav from "./UserNav";
import { useState } from "react";
import styles from "./FinalLogin.module.css";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(email);
    const res = await fetch("http://localhost:5000/sendPassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    // console.log(res.status);
    if (res.status === 404) {
      return alert("Invalid email");
    }
    alert("Email send successfully");
  };
  return (
    <>
      <UserNav />
      <div className={styles.mainContainer}>
        <div className={styles.loginFormContainer} style={{ height: "280px" }}>
          <form onSubmit={handleSubmit}>
            <div style={{ marginTop: "2rem" }}>
              <h4 style={{ marginLeft: "4rem" }}>Enter your email</h4>
              <label htmlFor="email" className={styles.loginLabel}>
                Email:
              </label>
              <input
                type="email"
                id="email"
                value={email}
                style={{ color: "black" }}
                className={styles.inputField}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <button className={styles.loginButton} type="submit">
              Send
            </button>
            {/* {message && <h5>Email send successfully</h5>} */}
          </form>
        </div>
      </div>
    </>
  );
}

export default ForgetPassword;
