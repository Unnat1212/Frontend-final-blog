import React from "react";
import classes from "./BlogDetail.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import UserNav from "./UserNav";
// import axios from "axios";
import jwtInterceptor from "../Helper/axiosInterceptor";

function BlogDetail() {
  // let token = JSON.parse(localStorage.getItem("token"));
  const params = useParams();
  let id = params.blogId;
  // console.log(id);

  const [data, setData] = useState([]);

  useEffect(() => {
    const getDetail = async () => {
      let response = await jwtInterceptor.get(
        `http://localhost:5000/student/${id}`
      );
      setData(response.data);
    };
    getDetail();
  }, [id]);
  // console.log(data);
  // console.log(data.url);
  let src = `http://localhost:5000/images/${data.url}`;
  return (
    <div className={classes.container}>
      <UserNav />
      {/* <h1 style={{ textAlign: "center" }}>Details</h1> */}
      <h1 style={{ marginTop: "2rem" }}>{data.title}</h1>
      <img src={src} alt="dummy" style={{ width: "300px", height: "200px" }} />
      <div>{data.author}</div>
      <div>{data.category}</div>
      <p className={classes.blogData}>{data.description}</p>
    </div>
  );
}

export default BlogDetail;
