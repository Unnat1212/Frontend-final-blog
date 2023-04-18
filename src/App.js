import "./App.css";
import Blogs from "./Component/Blogs";
import Login from "./Component/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin from "./Component/Admin";
import Register from "./Component/Register";
import { LoginContext } from "./Context/LoginContext";
// import { useState } from "react";
import BlogDetail from "./Component/BlogDetail";
import AddBlog from "./Component/AddBlog";
import UserProfile from "./Component/UserProfile";
import EditForm from "./Component/EditForm";
import MyBlog from "./Component/MyBlog";
import ForgetPassword from "./Component/ForgetPassword";
import NewPassword from "./Component/NewPassword";
// import PasswordChange from "./Component/PasswordChange";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/:blogId" element={<BlogDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add" element={<AddBlog />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/edit/:id" element={<EditForm />} />
        <Route path="/my-blog" element={<MyBlog />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/new-password/:newId" element={<NewPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
