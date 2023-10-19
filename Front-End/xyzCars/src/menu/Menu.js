import React, { useEffect } from "react";
import "../styles/Menu.css";
import { MdOutlineHome, MdOutlineFolderCopy } from "react-icons/md";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "antd";

function Menu() {
  const navigate=useNavigate()
  
  const handleHome=()=>{
    navigate("/")
    navigate(0);
  }

  const handlePasswordChange=()=>{
    navigate("/changepassword")
    navigate(0);
  }
  return (
    <main className="menuMain">
      <Link to={"/"}>
        <img
          style={{ width: "100%" }}
          src="https://i.hizliresim.com/ggq2cle.jpg"
        />
      </Link>

      <NavLink onClick={handleHome}  to={"/"}>
        <section>
       
          <MdOutlineHome style={{ width: "25px", height: "25px" }} /> Home
        </section>
      </NavLink>
      {localStorage.getItem("token") ? (
        <NavLink onClick={handlePasswordChange} to={"/changepassword"}>
          <section>
            <MdOutlineFolderCopy style={{ width: "25px", height: "25px" }} />{" "}
            Change Password
          </section>
        </NavLink>
      ) : (
        ""
      )}

      <section></section>

      {localStorage.getItem("token") ? (
        ""
      ) : (
        <>
          <NavLink to={"/login"}>
            <section>
              <MdOutlineFolderCopy style={{ width: "25px", height: "25px" }} />{" "}
              Log In
            </section>
          </NavLink>
          <NavLink to={"/register"}>
            <section>
              <MdOutlineFolderCopy style={{ width: "25px", height: "25px" }} />{" "}
              Sign Up
            </section>
          </NavLink>
        </>
      )}
    </main>
  );
}

export default Menu;
