import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import "./AdventureCard.css"
import { useNavigate } from "react-router-dom";

export default function AdventureCard({
  adventureData,
  categoryFilter,
  hourfilter,
}) {
  const [currentData, setCurrentData] = useState([]);
  const navigate = useNavigate();

  const filteredAdventureData = (categoryFilter, hourfilter) => {
    let updatedData = [...currentData];

    if (categoryFilter.length) {
      updatedData = updatedData.filter((item) =>
        categoryFilter.includes(item.category)
      );
    }

    if (hourfilter.length) {
      updatedData = updatedData.filter((item) => {
        let found = false;
        hourfilter.forEach((data) => {
          let low = data.split("-")[0];
          let high = data.split("-")[1];
          if (Number(item.duration >= low) && Number(item.duration <= high)) {
            found = true;
          }
        });
        return found;
      });
    }
    return updatedData;
  };

  const displayData = filteredAdventureData(categoryFilter, hourfilter);

  useEffect(() => {
    setCurrentData(adventureData);
  }, [adventureData]);

  return (
    <div className="adventurecard-main-container">
      <div className="adventurecard-container">
      <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
        {displayData.length === 0 ? (
          <>
            <h3>No Adventures Found</h3>
          </>
        ) : (
          displayData.map((item, index) => {
            return (
                <>
            <Grid item xs={12} sm={6} md={6} lg={3} key={index}>
              <div className="adventure-card" onClick={()=>navigate(`/cities/adventures/detail?adventure=${item.id}`)}>
                <div className="adventure-category">
                    {item.category}
                 </div>
                <div className="adventure-image">
                    <img src={item.image} alt={item.name} className="adventure-img"/>
                </div>
                <div className="adventurecard-detail">
                    <div className="section-1">
                        <h5>{item.name}</h5>
                        <h5>Rs.{item.costPerHead}</h5>
                    </div>
                    <div className="section-2">
                        <h5>Duration</h5>
                       <h5>{item.duration} Hours</h5>
                    </div>
                </div>
              </div>
            </Grid>
            </>
            );
          })
        )}
        </Grid>
        </Box>
      </div>
    </div>
  );
}
