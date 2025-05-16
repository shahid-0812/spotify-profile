import React, { useEffect, useState } from 'react';
import "../styles/toptracks.css";

const Toptracks = () => {

  return (
    <div className='container'>
      <div className="page-header">
        <h1>Top Tracks</h1>
        <div className="months">
          <span>All Time</span>
          <span>Last 6 Months</span>
          <span>Last 4 Weeks</span>
        </div>
      </div>
      <div className="tracks">

        <div className="track-card">
          <div className="track-title">
            <div className="track-img">
              <img />
            </div>
            <div className="track-info">
              <span>asdf</span>
              <span>asdf</span>
            </div>
          </div>
          <span></span>
        </div>

      </div>
    </div>
  );
}

export default Toptracks;
