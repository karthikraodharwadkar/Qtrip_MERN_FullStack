import React from "react";
import TextField from "@mui/material/TextField";
import "./Hero.css";

export default function Hero({ SearchFilter, handleChange }) {

  return (
    <div className="hero-main-container">
      <div className="hero-text">
        <h2>Welcome to QTrip</h2>
        <p>Explore the world with fantastic places to venture around</p>
      </div>
      <div className="searchBar">
        <TextField
          id="outlined-basic"
          placeholder="Search a city"
          variant="outlined"
          fullWidth
          value={SearchFilter}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
