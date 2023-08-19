import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { signOut } from '../actions/auth';
import { useNavigate } from 'react-router-dom';
import UserProfile from './userProfile';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, query, where } from '@firebase/firestore';
import { db } from '../firebaseConfig';
import Todos from './todosApp';
import ProfileForm from './profileForm';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [hasUserData, setHasUserData] = useState(null); // Set initial value to null
  const [userData, setUserData] = useState({
    firstName: '',
    
  });

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userQuery = query(
          collection(db, 'userData'),
          where('userId', '==', auth?.currentUser?.uid)
        );
        const querySnapshot = await getDocs(userQuery);

        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          const userDataFromDB = userDoc.data();
          setUserData({
            firstName: userDataFromDB.firstName,
            lastName: userDataFromDB.lastName,
            email: userDataFromDB.email,
          });
        } else {
          console.log('User data not found');
        }
      } catch (err) {
        console.error(err);
      }
    };

    getUserData();
  }, []);

 
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in
      setHasUserData(true);
    } else {
      // User is signed out
      setHasUserData(false);
    }
  });

  return () => {
    unsubscribe();
  };
}, [auth]);

  useEffect(() => {
    const checkUserData = async () => {
      try {
        if (!user) {
          return;
        }

        const userQuery = query(
          collection(db, 'userData'),
          where('userId', '==', user.uid)
        );
        const querySnapshot = await getDocs(userQuery);

        if (!querySnapshot.empty) {
          setHasUserData(true); // User data exists
        } else {
          setHasUserData(false); // User data doesn't exist
        }
      } catch (err) {
        console.error(err);
      }
    };

    checkUserData();
  }, [user]);

  const handleLogout = () => {
    dispatch(signOut());
    console.log('Logout success:');
    navigate('/signin');
  };

  // Render only when hasUserData is known
  return hasUserData !== null && (
    <div className="dashboard-container">
    <div className="top-nav">
      <div className="nav-item">
        <Link to="/user-Profile" className="nav-link button-link">
          My Profile
        </Link>
      </div>
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </div>
    {hasUserData ? <h2>Welcome to the app {userData.firstName}!</h2> : " "}

    {hasUserData ?  <Todos />  : 
      <ProfileForm setHasUserData={setHasUserData} />
    }
  </div>
  );
};

export default Dashboard;

