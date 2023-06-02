import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/home/home.css';

import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import logo from './../img/logo.png';






function BarraNav() {
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [userData, setUserData] = useState({});
    const [token, setToken] = useState(null);

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleDropdownClose = () => {
        setIsDropdownOpen(false);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        setToken(token);
    }, []);



    const CLIENT_ID = "ff923ecf1dad4ad3b0d5e8e5ec0deaf7";
const REDIRECT_URI = "http://localhost:5173";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";
const SCOPES = [
  "user-read-private",
  "user-read-email",
  "user-top-read",
  "user-library-read",
  "user-read-recently-played",
  "playlist-modify-public",
  "playlist-modify-private",
  "playlist-read-private",
  "playlist-read-collaborative",
  "user-follow-read",
  "user-follow-modify",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "user-read-playback-position",
];



    const handleLogin = () => {
      localStorage.removeItem('token');
      window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPES.join("%20")}`;
    };
  
  
  
    if (token) {
      localStorage.setItem('token', token);
    }


    useEffect(() => {
        if (token) {
            fetch(`http://localhost:5120/Perfil`,
                {
                    method: "GET", headers:
                    {
                        'X-Access-Token': localStorage.getItem('token'),
                        'Origin': 'http://localhost:5173'  // Replace with your front-end application's URL and port
                    }
                }).then(response => response.json())
                .then(data => {
                    console.log(data);
                    setUserData(data);
                    // Revisa la respuesta completa del endpoint setTopArtistas(data.items); // Extrayendo los artistas de la respuesta
                });
        }
    }, [token]);



    return (
        <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
            <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                <img src={logo} alt="Logo" style={{ width: '72px', height: '72px', borderRadius: '50%', marginRight: '2em'}} />
                <span className="fs-4">SpotiStats</span>
            </Link>

            <ul className="nav nav-pills">
  <div className="dropdown" onMouseLeave={handleDropdownClose}>
    {localStorage.getItem("token") ? (
      

      <img
      src="https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"
      alt="Placeholder"
      className="dropdown-img"
      style={{ width: '72px', height: '72px', borderRadius: '50%', marginRight: '2em' }}
      onMouseEnter={handleDropdownToggle}
    />
    ) : (
        <img
        src={userData?.images?.[0]?.url}
        alt="Your Image"
        className="dropdown-img"
        style={{ width: '72px', height: '72px', borderRadius: '50%', marginRight: '2em' }}
        onMouseEnter={handleDropdownToggle}
      />
    )}
                      
                    {isDropdownOpen && (
                        <div className="dropdown-content">
                            <a href="#" onClick={() => navigate('perfil')}>Perfil</a>
                            <a href="#" onClick={handleLogin}>Login con Spotify</a>
                           <a href="#" onClick={() => navigate('admin')}>Admin *tmp*</a>
                           <a href="#" onClick={() => navigate('menuPlaylist')}>Crear playlists</a>
                        </div>
                    )}
                </div>
            </ul>
        </header>
    );
}

export default BarraNav;
