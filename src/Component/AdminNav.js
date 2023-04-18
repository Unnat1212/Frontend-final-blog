import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import styles from "./AdminNav.module.css";

const AdminNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  let navigate = useNavigate();

  let isLoggedIn = JSON.parse(localStorage.getItem("user"));

  const handleToggle = () => setIsOpen((isOpen) => !isOpen);
  const logoutHandler = () => {
    if (isLoggedIn) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  const profileHandler = () => {
    // console.log("clicked");
    navigate("/profile");
  };
  const addBlogHandler = () => {
    navigate("/add");
  };

  return (
    <>
      <div className={styles.container}>
        <span className={styles.ham} onClick={() => handleToggle()}>
          <FaBars />
        </span>
        <span className={styles.logo}>Blog</span>
        <div
          style={{
            position: "absolute",
            right: "0",
            display: "flex",
            justifyContent: "center",
            height: "45px",
          }}
        >
          <button className={styles.logoutBtn} onClick={logoutHandler}>
            {isLoggedIn ? "Logout" : "Login"}
          </button>
          <button className={styles.addBlog} onClick={addBlogHandler}>
            Add blog
          </button>
        </div>
        {isLoggedIn && (
          <span className={styles.profile} onClick={profileHandler}>
            {isLoggedIn.email.charAt(0)}
          </span>
        )}
      </div>
      <nav className={isOpen ? styles.navOpen : styles.nav}>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link to="/" className={styles.link}>
              All blog
            </Link>
          </li>
          <li className={styles.item}>
            <Link to="/my-blog" className={styles.link}>
              My blog
            </Link>
          </li>
          <li className={styles.item}>
            <Link to="/admin" className={styles.link}>
              User
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default AdminNav;
