import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Register.module.css";
import UserNav from "./UserNav";

const Register = () => {
  let navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPassword] = useState("");
  const [cpassword, setConfirmPassword] = useState("");

  // let token = JSON.parse(localStorage.getItem("token"));
  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log("Submitted!");
    let user = {
      firstName,
      lastName,
      phoneNumber,
      email,
      pass,
      cpassword,
      role: "user",
      active: true,
    };

    // setUserState(user);

    // console.log(user);
    try {
      let res = await fetch("http://localhost:5000/blog", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      let resJson = await res.json();
      // console.log(resJson);
    } catch (err) {
      console.log(err);
    }
    alert("Data Added successfully");
    navigate("/login");
  };
  return (
    <>
      <UserNav />
      <div className={classes.main}>
        <form className={classes.loginForm} onSubmit={handleSubmit}>
          <h1
            style={{
              textAlign: "center",
              display: "block",
              margin: "20px",
              fontSize: "30px",
              borderBottom: "4px solid grey",
              paddingBottom: "10px",
              // color: "white",
            }}
          >
            Register Yourself
          </h1>
          <div className={classes.temp}>
            <label htmlFor="firstName" className={classes.label}>
              Name:
            </label>
            <input
              type="text"
              // id="firstName"
              value={firstName}
              className={classes.input}
              onChange={(event) => setFirstName(event.target.value)}
              required
            />
          </div>

          <div className={classes.temp}>
            <label htmlFor="lastName" className={classes.label}>
              SirName:
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              className={classes.input}
              onChange={(event) => setLastName(event.target.value)}
              required
            />
          </div>
          <div className={classes.temp}>
            <label htmlFor="phone" className={classes.label}>
              Number:
            </label>
            <input
              type="tel"
              id="phone"
              value={phoneNumber}
              className={classes.input}
              onChange={(event) => setPhone(event.target.value)}
              required
            />
          </div>
          <div className={classes.temp}>
            <label htmlFor="email" className={classes.label}>
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              className={classes.input}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className={classes.temp}>
            <label htmlFor="password" className={classes.label}>
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={pass}
              className={classes.input}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          <div className={classes.temp}>
            <label htmlFor="confirmPassword" className={classes.label}>
              Confirm:
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={cpassword}
              className={classes.input}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
            />
          </div>

          <button type="submit" className={classes.registerButton}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
