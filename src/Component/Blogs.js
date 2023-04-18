import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import axios from "axios";
import classes from "./Login.module.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import AdminNav from "./AdminNav";
import UserNav from "./UserNav";
import { useNavigate } from "react-router-dom";
import jwtInterceptor from "../Helper/axiosInterceptor";

const Blogs = () => {
  const [rowData, setRowData] = useState([]);
  const [tokenValue, setTokenValue] = useState("");

  let isLoggedIn = JSON.parse(localStorage.getItem("user"));
  // console.log(isLoggedIn);
  useEffect(() => {
    if (isLoggedIn) {
      let token = JSON.parse(localStorage.getItem("token"));
      setTokenValue(token);
    }
  }, [isLoggedIn]);
  // console.log(tokenValue);
  const navigate = useNavigate();

  const handleDeleteClick = async (id) => {
    await jwtInterceptor.delete(`http://localhost:5000/student/${id}`);
    const response = await axios.get("http://localhost:5000/student");
    setRowData(response.data);
  };

  const handleEditClick = (id) => {
    navigate(`edit/${id}`);
  };

  const idHandler = (e) => {
    return <>{e?.node?.rowIndex + 1}</>;
  };

  let columnDefs;
  if (isLoggedIn) {
    if (isLoggedIn.role === "user") {
      columnDefs = [
        { headerName: "ID", field: "id", cellRenderer: idHandler },
        { headerName: "Title", field: "title" },
        { headerName: "Description", field: "description" },
        { headerName: "Author", field: "author" },
        { headerName: "Category", field: "category" },
        { headerName: "Creator", field: "admin" },
      ];
    } else if (isLoggedIn.role === "admin") {
      columnDefs = [
        { headerName: "ID", field: "id", cellRenderer: idHandler },
        { headerName: "Title", field: "title" },
        { headerName: "Description", field: "description" },
        { headerName: "Author", field: "author" },
        { headerName: "Category", field: "category" },
        { headerName: "Creator", field: "admin" },
        isLoggedIn &&
          isLoggedIn.role === "admin" && {
            headerName: "Edit",
            field: "edit",
            cellRendererFramework: ({ data }) => (
              <div style={{ display: "flex" }}>
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
    }
  } else {
    columnDefs = [
      { headerName: "ID", field: "id", cellRenderer: idHandler },
      { headerName: "Title", field: "title" },
      { headerName: "Description", field: "description" },
      { headerName: "Author", field: "author" },
      { headerName: "Category", field: "category" },
      { headerName: "Creator", field: "admin" },
    ];
  }

  useEffect(() => {
    axios.get("http://localhost:5000/student").then((response) => {
      setRowData(response.data);
    });
  }, []);
  // console.log(rowData);

  const onRowClicked = (event) => {
    if (isLoggedIn) {
      navigate(`/${event?.data?._id}`);
    } else {
      alert("Make sure you login first !");
    }
  };

  const defaultColDef = {
    sortable: true,
    filter: true,
    floatingFilter: true,
  };

  const onGridReady = (params) => {
    const { columnApi } = params;
    columnApi.setColumnWidth("id", 90);
    columnApi.setColumnWidth("author", 130);
    columnApi.setColumnWidth("category", 130);
    columnApi.setColumnWidth("title", 200);
    columnApi.setColumnWidth("description", 350);
    columnApi.setColumnWidth("admin", 130);
    columnApi.setColumnWidth("edit", 160);
  };

  return (
    <div className="ag-theme-alpine" style={{ height: "500px", width: "100%" }}>
      {!isLoggedIn && <UserNav />}
      {isLoggedIn && isLoggedIn.role === "admin" && <AdminNav />}
      {isLoggedIn && isLoggedIn.role === "user" && <UserNav />}
      <AgGridReact
        className={classes.blog}
        columnDefs={columnDefs}
        onGridReady={onGridReady}
        rowData={rowData}
        onRowClicked={onRowClicked}
        defaultColDef={defaultColDef}
        onCellClicked={(event) => {
          if (event.colDef.field === "edit") {
            event.stopPropagation();
          }
        }}
      />
    </div>
  );
};

export default Blogs;
