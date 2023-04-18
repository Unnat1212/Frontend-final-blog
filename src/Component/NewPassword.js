import React from "react";
import UserNav from "./UserNav";
import { useState } from "react";
import styles from "./FinalLogin.module.css";
import { useParams } from "react-router-dom";

function NewPassword() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(false);
  let params = useParams();
  let id = params.newId;
  //   console.log(id);
  let data = {
    id,
    password,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(password);
    fetch(`http://localhost:5000/password-changer/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    setMessage(true);
  };
  return (
    <>
      <UserNav />
      <div className={styles.mainContainer}>
        <div className={styles.loginFormContainer} style={{ height: "280px" }}>
          <form onSubmit={handleSubmit}>
            <div style={{ marginTop: "2rem" }}>
              <h4 style={{ marginLeft: "1rem", marginBottom: "1.5rem" }}>
                Enter your New Password
              </h4>
              <label htmlFor="email" className={styles.loginLabel}>
                New Password:
              </label>
              <input
                type="password"
                id="email"
                value={password}
                style={{ color: "black" }}
                className={styles.inputField}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>

            <button className={styles.loginButton} type="submit">
              Submit
            </button>
            {message && <h6>Password changed successfully</h6>}
          </form>
        </div>
      </div>
    </>
  );
}

export default NewPassword;
