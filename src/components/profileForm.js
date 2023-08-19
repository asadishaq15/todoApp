import React, { useState } from "react";
import { collection, addDoc } from "@firebase/firestore";
import { db, auth } from "../firebaseConfig";

const ProfileForm = ({ setHasUserData }) => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    
  });

  const postUserData = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const submitData = async (event) => {
    event.preventDefault();
    const { firstName, lastName,  email, } = userData;

    if (firstName && lastName && email)  {
      await addDoc(collection(db, "userData"), {
        firstName,
        lastName,
        email,
      
        userId: auth?.currentUser?.uid,
      });
      setUserData({
        firstName: "",
        lastName: "",
        email: "",
       
      });
      setHasUserData(true);
      alert("Profile Created");
    } else {
      alert("Please fill all fields");
    }
  };


  return (
    <div className="user-profile-container">
  
  <form className="profile-form">
  <h3>Fill this form to get started</h3>
    <div className="form-group">
      <label htmlFor="firstName" className="form-label">
        First Name
      </label>
      <input
        type="text"
        name="firstName"
        className="form-control user-input"
        id="firstName"
        placeholder=""
        value={userData.firstName}
        onChange={postUserData}
        autoComplete="off"
        
      />
    </div>
    <div className="form-group">
      <label htmlFor="lastName" className="form-label">
        Last Name
      </label>
      <input
        type="text"
        name="lastName"
        className="form-control user-input"
        id="lastName"
        placeholder=""
        value={userData.lastName}
        onChange={postUserData}
         autoComplete="off"
      
      />
    </div>
    <div className="form-group">
      <label htmlFor="email" className="form-label">
        Email ID
      </label>
      <input
        type="email"
        name="email"
        className="form-control user-input"
        id="email"
        placeholder=""
        value={userData.email}
        onChange={postUserData}
        autoComplete="off"
      />
    </div>
    <div className="form-check">
      <input
        className="form-check-input"
        type="checkbox"
        value=""
        id="flexCheckChecked"
      />
      <label className="form-check-label">
        I agree to use this Todo app responsibly and in accordance
        with its terms of use.
      </label>
    </div>
    <button
      type="submit"
      className="btn btn-primary btn-block mt-3 user-submit-button"
      onClick={submitData}
    >
      Submit
    </button>
  </form>
 
</div>


  );
};

export default ProfileForm;
