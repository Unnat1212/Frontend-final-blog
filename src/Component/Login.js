import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./FinalLogin.module.css";
import UserNav from "./UserNav";
import axios from "axios";

const Login = () => {
  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log("Submitted!");
    let user = {
      email,
      password,
    };

    // console.log(user);

    const data = await axios.post("http://localhost:5000/login", {
      email: user.email,
      password: user.password,
    });
    // axios.defaults.headers.common["Authorization"] = `Bearer ${data["token"]}`;
    delete data.data.user.pass;
    localStorage.setItem("token", JSON.stringify(data.data.token));
    localStorage.setItem("user", JSON.stringify(data.data.user));
    navigate("/");
  };
  return (
    <>
      <UserNav />
      <div className={styles.mainContainer}>
        <div className={styles.loginFormContainer}>
          <h1 className={styles.signIn}>Sign in</h1>
          <form onSubmit={handleSubmit}>
            <div>
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
            <div>
              <label htmlFor="password" className={styles.loginLabel}>
                Password:
              </label>
              <input
                type="password"
                id="password"
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
            <Link to="/register">
              <p className={styles.registerLink}>
                Haven't account yet? Register
              </p>
            </Link>
          </form>
          <div style={{ marginLeft: "4rem", marginBottom: "2rem" }}>
            Forget Password
            <Link
              to="/forget-password"
              style={{ marginLeft: "0.5rem", color: "white" }}
            >
              Click here
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
