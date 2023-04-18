import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import axios from "axios";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import SecondAdminNav from "./SecondAdminNav";
import jwtInterceptor from "../Helper/axiosInterceptor";

const Admin = () => {
  let isLoggedIn = JSON.parse(localStorage.getItem("user"));
  let token = JSON.parse(localStorage.getItem("token"));
  // console.log(token);
  const [rowData, setRowData] = useState([]);

  const roleHandler = async (data) => {
    if (data.role === "user") {
      data.role = "admin";
    } else {
      data.role = "user";
    }
    // console.log(data);
    let id = data._id;
    await jwtInterceptor.put(`http://localhost:5000/blog/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
        // Authorization: "Bearer " + token,
      },
    });
    jwtInterceptor
      .get(
        "http://localhost:5000/blog"
        //  {
        //   headers: {
        //     Authorization: "Bearer " + token,
        //   },
        // }
      )
      .then((response) => {
        setRowData(response.data);
      });
  };

  const idHandler = (e) => {
    return <>{e?.node?.rowIndex + 1}</>;
  };

  const columnDefs = [
    { headerName: "ID", field: "id", cellRenderer: idHandler },
    { headerName: "First Name", field: "firstName" },
    { headerName: "Last Name", field: "lastName" },
    { headerName: "PhoneNumber", field: "phoneNumber" },
    { headerName: "Email", field: "email" },
    { headerName: "Role", field: "role" },
    {
      headerName: "Edit",
      field: "edit",
      cellRendererFramework: ({ data }) => (
        <div>
          <button
            onClick={() => roleHandler(data)}
            style={{
              display: "flex",
              textAlign: "center",
              height: "33px",
              marginTop: "2px",
              justifyContent: "center",
            }}
          >
            Change role
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    jwtInterceptor.get("http://localhost:5000/blog").then((response) => {
      setRowData(response.data);
    });
  }, [token]);

  let defaultColDef = {
    flex: 2,
  };

  return (
    <div>
      {isLoggedIn.role === "admin" && <SecondAdminNav />}
      <div
        className="ag-theme-alpine"
        style={{ height: "500px", width: "100%" }}
      >
        <AgGridReact
          columnDefs={columnDefs}
          rowData={rowData}
          defaultColDef={defaultColDef}
        />
      </div>
    </div>
  );
};

export default Admin;
