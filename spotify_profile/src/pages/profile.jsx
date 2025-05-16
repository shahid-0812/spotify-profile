import React, { useEffect, useState } from 'react';
import "../styles/profile.css";

const Profile = () => {

    console.log("Proilfe Render")

    return (
        <div className="container">
            <div className="profile-header">
                <div className="profile-icon">
                    <i className="bi bi-person-fill"></i>
                    <span>username</span>
                </div>
                <div className="profile-details">
                    <div className="detail">
                        <span>1</span>
                        <span>Followers</span>
                    </div>
                    <div className="detail">
                        <span>5</span>
                        <span>Followings</span>
                    </div>
                    <div className="detail">
                        <span>5</span>
                        <span>Playlists</span>
                    </div>
                </div>
                <button className="page-btn">Logout</button>
            </div>
            <div className="spotify-details">
                <div className="section">
                    <div className="heading">
                        <span>Top Artists of All Time</span>
                        <button className="page-btn-small">see more</button>
                    </div>

                    <div className="list">

                        <div className="artist-icon">
                            <img />
                            <span>artist name</span>
                        </div>
                        <div className="artist-icon">
                            <img />
                            <span>artist name</span>
                        </div>
                        <div className="artist-icon">
                            <img />
                            <span>artist name</span>
                        </div>

                    </div>
                </div>

                <div className="section">
                    <div className="heading">
                        <span>Top Tracks of All Time</span>
                        <button className="page-btn-small">see more</button>
                    </div>

                    <div className="list">

                        <div className="artist-icon" >
                            <img />
                            <span>track name</span>
                        </div>
                        <div className="artist-icon" >
                            <img />
                            <span>track name</span>
                        </div>
                        <div className="artist-icon" >
                            <img />
                            <span>track name</span>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
