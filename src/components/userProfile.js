import React, { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { db, auth } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const [userData, setUserData] = useState(null); // Initialize as null
  const [hasUserData, setHasUserData] = useState(null); // Set initial value to null
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setHasUserData(true);

        const getUserData = async () => {
          try {
            const userQuery = query(
              collection(db, "userData"),
              where("userId", "==", user.uid)
            );
            const querySnapshot = await getDocs(userQuery);

            if (!querySnapshot.empty) {
              const userDoc = querySnapshot.docs[0];
              const userDataFromDB = userDoc.data();
              setUserData(userDataFromDB);
            } else {
              console.log("User data not found");
              setUserData(null); // Set userData to null
            }
          } catch (err) {
            console.error(err);
          }
        };

        getUserData();
      } else {
        setHasUserData(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="user-profile-container">
      {hasUserData !== null && (
        <>
          {userData ? ( // Check if userData is not null
            <div className="profile-info">
              <p>
                <strong>First Name:</strong> {userData.firstName}
              </p>
              <p>
                <strong>Last Name:</strong> {userData.lastName}
              </p>
              <p>
                <strong>Email:</strong> {userData.email}
              </p>
            </div>
          ) : (
            <p>Profile not found</p>
          )}
          <div className="navigation">
            <Link to="/dashboard" className="nav-link button-link">
              Back to Dashboard
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default UserProfile;
