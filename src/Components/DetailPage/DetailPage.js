import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import Footer from "../Footer/Footer";
import "./DetailPage.css";
import DetailPageForm from "./DetailPageForm";
import SoldOut from "./SoldOut";
import { useNavigate } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";

export default function DetailPage({ formData, setFormData }) {
  const [adventureDetail, setAdventureDetail] = useState([]);
  const [soldout, setSoldOut] = useState(false);
  const [reservationData, setReservationData] = useState([]);
  const navigate = useNavigate();

  async function fetchAdventureDetail() {
    let URL = new URLSearchParams(window.location.search);
    let adventure = URL.get("adventure");
    try {
      // let result = await axios.get(
      //   `http://localhost:8082/cities/adventures/detail?adventure=${adventure}`
      // );
      let result = await axios.get(
        `https://qtr-backend.onrender.com/cities/adventures/detail?adventure=${adventure}`
      );
      setAdventureDetail(result.data[0]);
    } catch (error) {
      alert(error);
    }
  }

  async function fetchReservationData() {
    try {
      // let response = await axios.get(
      //   "http://localhost:8082/cities/adventures/detail/reservations"
      // );
      let response = await axios.get(
        `https://qtr-backend.onrender.com/cities/adventures/detail/reservations`
      );
      setReservationData(response.data);
    } catch (error) {
      alert(error);
    }
  }

  function findReservation(adventureDetail) {
    let exist = reservationData.filter(
      (item) => item.adventure === adventureDetail.name
    );
    if (exist.length > 0) {
      return true;
    } else {
      return false;
    }
  }
  const showReservation = findReservation(adventureDetail);


  useEffect(() => {
    fetchAdventureDetail();
    fetchReservationData();
  }, []);


  return (
    <div className="detailPage-main-container">
      <div className="detailPage-navbar">
        <Navbar />
      </div>
      {showReservation === true ? (
        <div className="confirmation-banner">
          <p>
            Greetings! Reservation for this adventure is successful. (Click{" "}
            <span
              className="confirmation-banner-span"
              onClick={() => navigate("/cities/adventures/reservations")}
            >
              here
            </span>{" "}
            to view your reservations)
          </p>
        </div>
      ) : soldout === true ? (
        <div className="confirmation-banner">
          <p>
            Greetings! Reservation for this adventure is successful. (Click{" "}
            <span
              className="confirmation-banner-span"
              onClick={() => navigate("/cities/adventures/reservations")}
            >
              here
            </span>{" "}
            to view your reservations)
          </p>
        </div>
      ) : (
        <></>
      )}

      <div className="detailPage-container">
        <div className="detailPage-leftsection">
          <div className="detailPage-header">
            <h2>{adventureDetail.name}</h2>
          </div>
          <div className="detailPage-title">
            <h4>{adventureDetail.subtitle}</h4>
          </div>
          <div>
            <img
              src={adventureDetail.images}
              alt={adventureDetail.name}
              className="detailpage-img"
            />
          </div>
          <hr />
          <div className="detailPage-description">
            <h3>About the Experience</h3>
            <p>{adventureDetail.content}</p>
          </div>
        </div>
        <div className="detailPage-rightsection">
          {showReservation === true ? (
            <SoldOut />
          ) : soldout === true ? (
            <>
              <SoldOut />
            </>
          ) : (
            <DetailPageForm
              formData={formData}
              setFormData={setFormData}
              adventureDetail={adventureDetail}
              setSoldOut={setSoldOut}
              soldout={soldout}
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
