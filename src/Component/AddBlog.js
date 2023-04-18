import React, { useState } from "react";
import styles from "./Form.module.css";
import { useNavigate } from "react-router-dom";
import SecondAdminNav from "./SecondAdminNav";
import axios from "axios";
import jwtInterceptor from "../Helper/axiosInterceptor";

const AddBlog = () => {
  let navigate = useNavigate();
  let isLoggedIn = JSON.parse(localStorage.getItem("user"));
  let token = JSON.parse(localStorage.getItem("token"));

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [url, setUrl] = useState("");

  let username = isLoggedIn.email.substring(0, isLoggedIn.email.indexOf("@"));
  // console.log(username);
  // console.log(title);
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("author", author);
  formData.append("category", category);
  formData.append("url", url);
  formData.append("admin", username);
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await jwtInterceptor.post("http://localhost:5000/student", formData);
      alert("Data Added successfully");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {isLoggedIn.role === "admin" && <SecondAdminNav />}
      <form
        onSubmit={handleSubmit}
        className={styles.form}
        enctype="multipart/form-data"
      >
        <h1 className={styles.addBlogDiv} style={{ fontSize: "30px" }}>
          Register
        </h1>
        <div className={styles.formGroup}>
          <label
            htmlFor="title"
            className={styles.label}
            style={{ fontSize: "15px" }}
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label
            htmlFor="title"
            className={styles.label}
            style={{ fontSize: "15px" }}
          >
            URL
          </label>
          <input
            type="file"
            id="title"
            name="url"
            onChange={(event) => setUrl(event.target.files[0])}
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label
            htmlFor="description"
            className={styles.label}
            style={{ fontSize: "15px" }}
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className={styles.textarea}
          />
        </div>
        <div className={styles.formGroup}>
          <label
            htmlFor="author"
            className={styles.label}
            style={{ fontSize: "15px" }}
          >
            Author
          </label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label
            htmlFor="category"
            className={styles.label}
            style={{ fontSize: "15px" }}
          >
            Category
          </label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
