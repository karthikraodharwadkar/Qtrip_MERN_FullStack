import React from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

import Modal from "../Modal/Modal";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <div className="navbar-main-container">
      <div className="navbar-container">
        <div className="logo" onClick={() => navigate("/")}>QTrip</div>
        <div className="navbar-items">
          <p onClick={() => navigate("/")}>Home</p>
          <p onClick={() => navigate("/cities/adventures/reservations")}>Reservations</p>
        </div>
        <div className="toggle-btn">
          <Modal />
        </div>
      </div>
    </div>
  );
}
