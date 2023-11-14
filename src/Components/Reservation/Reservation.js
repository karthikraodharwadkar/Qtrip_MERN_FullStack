import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./Reservation.css";
import axios from "axios";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";
import "./Reservation.css";

export default function Reservation() {
  const [tableData, setTableData] = useState([]);
  const navigate = useNavigate();

  async function fetchtableData() {
    try {
      // let response = await axios.get(
      //   "http://localhost:8082/cities/adventures/detail/reservations"
      // );.
      let response = await axios.get("https://qtr-backend.onrender.com/cities/adventures/detail/reservations")
      setTableData(response.data);
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    fetchtableData();
  }, []);

  return (
    <>
      <div className="reservation-main-container">
        <div className="reservation-navbar">
          <Navbar />
        </div>
        {tableData.length === 0 ? (
          <div className="reservation-banner">
            <p>
              Oops! You have not made any reservations yet! (Click{" "}
              <span
                className="reservation-banner-span"
                onClick={() => navigate("/cities")}
              >
                here
              </span>{" "}
              to explore some cities)
            </p>
          </div>
        ) : (
          <></>
        )}
        <div className="reservation-container">
          <div className="reservation-header">
            <h2>Your Reservations</h2>
          </div>
          <div className="reservation-table">
            <table>
              <thead>
                <tr>
                  <th>Transaction ID</th>
                  <th>Booking Name</th>
                  <th>Adventure</th>
                  <th>Person(s)</th>
                  <th>Date</th>
                  <th>Price</th>
                  <th>Booking Time</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item._id}</td>
                      <td>{item.name}</td>
                      <td>{item.adventure}</td>
                      <td>{item.personcount}</td>
                      <td>
                        {new Date(item.createdAt).toLocaleDateString("en-IN")}
                      </td>
                      <td>
                        {Number(item.priceperhead) * Number(item.personcount)}
                      </td>
                      <td>
                        {new Date(item.createdAt)
                          .toLocaleString("en-IN", {
                            year: "numeric",
                            day: "numeric",
                            month: "long",
                            hour: "numeric",
                            minute: "numeric",
                            second: "numeric",
                          })
                          .replace(" at", ",")}
                      </td>
                      <td>
                        <button
                          onClick={() =>
                            navigate(
                              `/cities/adventures/detail?adventure=${item.adventureId}`
                            )
                          }
                        >
                          Visit Adventure
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="reservation-footer">
        <Footer />
      </div>
    </>
  );
}
