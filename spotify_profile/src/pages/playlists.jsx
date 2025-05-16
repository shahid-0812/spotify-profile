import React from 'react'
import "../styles/playlists.css"


const Playlists = () => {
  return (
    <div className='container'>
      <div className="page-header">
        <h1>Your Playlists</h1>
      </div>
      <div className="playlists">

        <div className="playlisy-card">
          <div className="playlist-img"></div>
          <div className="playlist-info">
            <span>Title-1</span>
            <span>Track counts</span>
          </div>
        </div>
        
        <div className="playlisy-card">
          <div className="playlist-img"></div>
          <div className="playlist-info">
            <span>Title-1</span>
            <span>Track counts</span>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Playlists
