// Profile.js

import React, { useState, useEffect } from 'react';
import Aside from '../components/a-sideBar/Aside';
import useTabNavigation from '../hooks/useTabNavigation';
import Header from '../components/header/header';
import { useAuth } from '../context/AuthContext';

function Profile() {
  const { activeTab, handleTabChange } = useTabNavigation();
  const { authToken } = useAuth();
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch('http://localhost:8080/profilePage', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, [authToken]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-2">
          <Aside activeTab={activeTab} handleTabChange={handleTabChange} />
        </div>
        <div className="col-sm-10">
          <Header />
          <div className="content">
            {profileData ? (
              <div className="profile-info">
                <h2>Profile Information</h2>
                <div className="profile-details">
                  <img src={profileData.profile_img} alt="Profile" />
                  <p><strong>Name:</strong> {profileData.user_name}</p>
                  <p><strong>Email:</strong> {profileData.user_email}</p>
                  <p><strong>Location:</strong> {profileData.user_location}</p>
                  {profileData.user_role === 2 && (
                    <p><strong>Commercial Record:</strong> {profileData.Commercial_Record}</p>
                  )}
                </div>
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

