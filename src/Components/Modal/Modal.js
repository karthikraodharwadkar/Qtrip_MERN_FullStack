import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import "./Modal.css"
import { useNavigate } from "react-router-dom";

export default function Modal() {
    const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <div className="toggle-main-container">
      <div className="toggle-container" onClick={handleToggle}>
        <GiHamburgerMenu />
      </div>
      {toggle === true ? (
        <>
          <div className="toggle-btn">
          <p onClick={() => navigate("/")}>Home</p>
          <p onClick={() => navigate("/cities/adventures/reservations")}>Reservations</p>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
