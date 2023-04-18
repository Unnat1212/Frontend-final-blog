import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import axios from "axios";
import classes from "./Login.module.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import AdminNav from "./AdminNav";
import { useNavigate } from "react-router-dom";
import jwtInterceptor from "../Helper/axiosInterceptor";

const MyBlog = () => {
  const [rowData, setRowData] = useState([]);

  let isLoggedIn = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  const handleDeleteClick = async (id) => {
    await jwtInterceptor.delete(`http://localhost:5000/student/${id}`);
    const response = await axios.get("http://localhost:5000/student");
    setRowData(response.data);
    navigate("/");
  };

  const idHandler = (e) => {
    return <>{e?.node?.rowIndex + 1}</>;
  };

  const handleEditClick = (id) => {
    navigate(`/edit/${id}`);
  };
  let admin = isLoggedIn.role;

  const columnDefs = [
    { headerName: "ID", field: "id", cellRenderer: idHandler },
    { headerName: "Title", field: "title" },
    { headerName: "Description", field: "description" },
    { headerName: "Author", field: "author" },
    { headerName: "Category", field: "category" },
    isLoggedIn &&
      admin && {
        headerName: "Edit",
        field: "edit",
        cellRendererFramework: ({ data }) => (
          <div
            style={{
              display: "flex",
              textAlign: "center",
              justifyContent: "center",
              marginRight: "3rem",
            }}
          >
            <button
              className={classes.delete}
              onClick={() => handleDeleteClick(data._id)}
              style={{
                display: "flex",
                textAlign: "center",
                height: "35px",
                marginTop: "2px",
                justifyContent: "center",
              }}
            >
              Delete
            </button>
            <button
              className={classes.delete}
              onClick={() => handleEditClick(data._id)}
              style={{
                display: "flex",
                textAlign: "center",
                height: "35px",
                marginTop: "2px",
                justifyContent: "center",
              }}
            >
              Edit
            </button>
          </div>
        ),
      },
  ];
  let username = isLoggedIn.email.substring(0, isLoggedIn.email.indexOf("@"));
  // console.log(username);

  useEffect(() => {
    axios.get("http://localhost:5000/student").then((response) => {
      // console.log(response.data);
      let adminblog = response.data.map((res) => {
        // console.log(res.admin);
        if (res.admin === username) {
          return res;
        }
      });
      const filteredArray = adminblog.filter((item) => item !== undefined);
      // console.log(filteredArray);
      setRowData(filteredArray);
    });
  }, [username]);

  const onRowClicked = (event) => {
    if (isLoggedIn) {
      navigate(`/${event?.data?._id}`);
    } else {
      alert("Make sure you login first !");
    }
  };

  return (
    <div className="ag-theme-alpine" style={{ height: "500px", width: "100%" }}>
      {isLoggedIn.role === "admin" && <AdminNav />}
      <AgGridReact
        className={classes.blog}
        columnDefs={columnDefs}
        rowData={rowData}
        onRowClicked={onRowClicked}
        onCellClicked={(event) => {
          if (event.colDef.field === "edit") {
            event.stopPropagation();
          }
        }}
      />
    </div>
  );
};

export default MyBlog;
