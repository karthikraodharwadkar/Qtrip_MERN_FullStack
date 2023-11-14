import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import "./CityCards.css"
import { useNavigate } from "react-router-dom";

export default function CityCards({ data, searchFilter }) {

const navigate = useNavigate()
  const [currentData, setCurrentData] = useState([]);

  const applyFilters = (searchFilter) => {
    let updatedData = [...currentData];

    if (searchFilter.length) {
      updatedData = updatedData.filter((item) =>
        item.city.toLowerCase().includes(searchFilter.toLowerCase())
      );
    }
    return updatedData;
  };

  const displayData = applyFilters(searchFilter);

  useEffect(() => {
    setCurrentData(data);
  }, [data]);

  return (
    <div className="citycard-main-container">
      <div className="grid-container">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {displayData.length===0 ?
            <div className="empty-city">
                <h4>No Cities Found</h4>
            </div>
             :
            displayData.map((item, index) => {
              return (
               // <a href={`/cities/adventures?city=${item.city}`}>
                <Grid item xs={12} sm={6} md={6} lg={3} key={index}>
                  <div className="city-card" onClick={()=>navigate(`/cities/adventures?city=${item.id}`)}>
                    <div className="city-image">
                      <img src={item.image} alt={item.city} />
                    </div>
                    <div className="city-details">
                      <h3>{item.city}</h3>
                      <p>{item.description}</p>
                    </div>
                  </div>
                </Grid>
               // </a>
              );
            })}
          </Grid>
        </Box>
      </div>
    </div>
  );
}
