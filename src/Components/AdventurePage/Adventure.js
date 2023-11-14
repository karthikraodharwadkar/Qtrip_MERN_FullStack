import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import AdventureFilters from "./AdventureFilters";
import axios from "axios";
import AdventureCard from "../AdventureCard/AdventureCard";
import "./Adventure.css";
import Footer from "../Footer/Footer";

export default function Adventure() {
  const [adventureData, setAdventureData] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [hourfilter, setHourFilter] = useState([]);

  const handleCategoryFilter = (event) => {
    setCategoryFilter((prevState) => [...prevState, event.target.value]);
  };

  const handleHourFilter = (event) => {
    setHourFilter((prevState) => [...prevState, event.target.value]);
  };

  const handleRemoveFilter = (event) => {
    setCategoryFilter((prevState) =>
      prevState.filter((item) => item !== event.target.id)
    );
    setHourFilter((prevState) =>
      prevState.filter((item) => item !== event.target.id)
    );
  };
  async function fetchAdventures() {
    let URL = new URLSearchParams(window.location.search);
    let city = URL.get("city");
    // let result = await axios.get(
    //   `http://localhost:8082/cities/adventures?city=${city}`
    // );
    let result = await axios.get(`https://qtr-backend.onrender.com/cities/adventures?city=${city}`)
    setAdventureData(result.data[0].adventures);
  }

  useEffect(() => {
    fetchAdventures();
  }, []);

  return (
    <div className="adventure-main-container">
      <div className="adventure-navbar">
        <Navbar />
      </div>
      <div className="adventure-container">
        <div className="adventure-header">
          <h3>Explore all adventures</h3>
          <p>Here's a list of places that you can explore in city</p>
        </div>
        <div className="adventure-filter">
          <hr />
          <AdventureFilters
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            handleCategoryFilter={handleCategoryFilter}
            hourfilter={hourfilter}
            handleHourFilter={handleHourFilter}
            setHourFilter={setHourFilter}
          />
          <hr />
          <div>
            {categoryFilter.map((item, index) => {
              return (
                <div key={index} className="filter-pills">
                  {item}
                  <sup
                    className="filter-pills-btn"
                    id={item}
                    onClick={handleRemoveFilter}
                  >
                    x
                  </sup>
                </div>
              );
            })}
          </div>
          <div>
            {hourfilter.map((item, index) => {
              return (
                <div key={index} className="filter-pills">
                  {item}
                  <sup
                    className="filter-pills-btn"
                    id={item}
                    onClick={handleRemoveFilter}
                  >
                    x
                  </sup>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <AdventureCard
        adventureData={adventureData}
        categoryFilter={categoryFilter}
        hourfilter={hourfilter}
      />
      <div>
        <Footer />
      </div>
    </div>
  );
}
