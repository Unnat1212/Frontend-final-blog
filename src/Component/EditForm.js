import React from "react";
import { useState, useEffect } from "react";
import styles from "./Form.module.css";
import { useNavigate, useParams } from "react-router-dom";
import SecondAdminNav from "./SecondAdminNav";
import jwtInterceptor from "../Helper/axiosInterceptor";

function EditForm() {
  let navigate = useNavigate();
  let isLoggedIn = JSON.parse(localStorage.getItem("user"));
  let token = JSON.parse(localStorage.getItem("token"));
  let username = isLoggedIn.email.substring(0, isLoggedIn.email.indexOf("@"));

  const params = useParams();
  let id = params.id;
  // console.log(id);
  const [blog, setBlog] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/student/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => setBlog(data));
    // console.log(blog);
    setTitle(blog.title);
    setDescription(blog.description);
    setAuthor(blog.author);
    setCategory(blog.category);
    setUrl(blog.url);
  }, [
    id,
    blog.title,
    blog.url,
    blog.description,
    blog.category,
    blog.author,
    token,
  ]);
  // console.log(blog);
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("author", author);
  formData.append("category", category);
  formData.append("url", url);
  formData.append("admin", username);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await jwtInterceptor.put(`http://localhost:5000/student/${id}`, formData);
    navigate("/");
  };
  return (
    <div>
      {isLoggedIn.role === "admin" && <SecondAdminNav />}
      <form
        onSubmit={handleSubmit}
        className={styles.form}
        enctype="multipart/form-data"
      >
        <div className={styles.formGroup}>
          <label htmlFor="title" className={styles.label}>
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
          <label htmlFor="title" className={styles.label}>
            URL
          </label>
          <input
            type="file"
            id="title"
            // value={url}
            name="url"
            onChange={(event) => setUrl(event.target.files[0])}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="description" className={styles.label}>
            Description
          </label>
          <textarea
            id="description"
            value={description}
            // className={styles.description}
            onChange={(event) => setDescription(event.target.value)}
            className={styles.textarea}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="author" className={styles.label}>
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
          <label htmlFor="category" className={styles.label}>
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
        <button
          type="submit"
          // className={styles.button}
          style={{
            marginBottom: "1rem",
            marginTop: "1rem",
            width: "500px",
            marginLeft: "1rem",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditForm;
