import React from "react";
import axios from "axios";

export default function DetailPageForm({
  formData,
  setFormData,
  adventureDetail,
  setSoldOut,
  soldout,
}) {
  const handleFormData = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
      adventure: adventureDetail.name,
      priceperhead: Number(adventureDetail.costPerHead),
      adventureId:adventureDetail.id
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setSoldOut(!soldout);
    // setFormData({
    //     ...formData
    //     //adventure: adventureDetail.name
    //     // price: Number(formData.personcount * adventureDetail.costPerHead),
    //     // adventureId: adventureDetail.id,
    //   });

    try {
      console.log(formData);
      // await axios.post("http://localhost:8082/cities/reservations", formData);
      await axios.post("https://qtr-backend.onrender.com/cities/reservations",formData)
      alert("Reserved Adventure Sucessfully");
    } catch (error) {
      setFormData({
        name: "",
        date: "",
        personcount: "",
        adventure: "",
      });
      alert(error);
    }
  };

  //console.log(formData)
  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleFormData}
          required
        />
        {/* <label>Adventure Name</label>
        <input
          type="text"
          name="adventure"
          value={formData.adventure}
          onChange={handleFormData}
          placeholder={`Type ${adventureDetail.name}`}
        /> */}
        <label>Pick a Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleFormData}
          required
        />
        <hr />
        <div className="formData">
          <div className="formData-leftsection">
            <p>Person(s)</p>
            <p>Rs.{adventureDetail.costPerHead} per head</p>
          </div>
          <div className="formData-rightsection">
            <input
              type="Number"
              name="personcount"
              value={formData.personcount}
              onChange={handleFormData}
              required
            />
          </div>
        </div>
        <hr />
        <div className="formData-totalsection">
          <p className="formData-total">Total</p>
          <p>Rs.{adventureDetail.costPerHead * formData.personcount}</p>
        </div>
        <div>
          <button type="submit" className="form-btn">
            Reserve
          </button>
        </div>
      </form>
    </div>
  );
}
