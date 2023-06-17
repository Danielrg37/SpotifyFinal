import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import logo from './../img/logo.png';
import { useContext } from 'react';
import { Button, Modal } from 'react-bootstrap';


function BarraNav() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const [token, setToken] = useState(null);
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDropdownClose = () => {
    setIsDropdownOpen(false);
  };

  const checkTokenExpiration = () => {
    const expirationTime = sessionStorage.getItem('tokenExpiration');
    if (expirationTime && Date.now() >= Number(expirationTime)) {
      // Token has expired
      refreshAccessToken();
    }
  };

  const refreshAccessToken = () => {
    const refreshToken = sessionStorage.getItem('refreshToken');
    if (!refreshToken) {
      // No refresh token available, user needs to log in again
      handleLogout();
      return;
    }

    // Make a request to your server to refresh the access token
    fetch('http://ec2-3-230-86-196.compute-1.amazonaws.com:5120/refresh-token', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.access_token) {
          // Refresh successful, update the token and expiration time
          setToken(data.access_token);
          sessionStorage.setItem('token', data.access_token);
          const expirationTime = Date.now() + data.expires_in * 1000;
          sessionStorage.setItem('tokenExpiration', expirationTime);
        } else {
          // Refresh failed, user needs to log in again
          handleLogout();
        }
      })
      .catch(error => {
        console.error('Error refreshing access token:', error);
        handleLogout();
      });
  };

  const handleLogout = () => {
    // Clear the token and related data from local storage
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('tokenExpiration');
    sessionStorage.removeItem('refreshToken');
    setToken(null);
  };

  useEffect(() => {
    checkTokenExpiration();
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const expirationTime = sessionStorage.getItem('tokenExpiration');
    const refreshToken = sessionStorage.getItem('refreshToken');
    setToken(token);
    if (token && expirationTime) {
      setToken(token);
      if (Date.now() >= Number(expirationTime)) {
        // Token has expired, refresh it
        refreshAccessToken();
      }
    }
  }, []);

  const CLIENT_ID = 'ff923ecf1dad4ad3b0d5e8e5ec0deaf7';
  const REDIRECT_URI = 'http://ec2-3-230-86-196.compute-1.amazonaws.com:5173/';
  const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
  const RESPONSE_TYPE = 'token';
  const SCOPES = [
    'user-read-private',
    'user-read-email',
    'user-top-read',
    'user-library-read',
    'user-read-recently-played',
    'playlist-modify-public',
    'playlist-modify-private',
    'playlist-read-private',
    'playlist-read-collaborative',
    'user-follow-read',
    'user-follow-modify',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'user-read-playback-position',
  ];

  const handleLoginWithSpotify = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('tokenExpiration');
    sessionStorage.removeItem('refreshToken');
    window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPES.join(
      '%20'
    )}`;
  };

  useEffect(() => {
    if (token) {
      fetch(`http://ec2-3-230-86-196.compute-1.amazonaws.com:5120/Perfil`, {
        method: 'GET',
        headers: {
          'X-Access-Token': token,
          Origin: 'http://localhost:5173' // Replace with your front-end application's URL and port
        }
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setUserData(data);
          // Revisa la respuesta completa del endpoint setTopArtistas(data.items); // Extrayendo los artistas de la respuesta
        });
    }
  }, [token]);

  useEffect(() => {
    const nombreUsuario = localStorage.getItem('nombreUsuario');
    setNombreUsuario(nombreUsuario);
  }, []);

  const handleLoginRedirect = () => {
    handleLoginWithSpotify();
  };

  const logout = () => {
    localStorage.removeItem('nombreUsuario');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('tokenExpiration');
    sessionStorage.removeItem('refreshToken');
    location.reload(); // Recargar la página actual
};


  useEffect(() => {
    if (showModal) {
      setTimeout(() => {
        navigate('/'); // Redirigir a la página deseada después de mostrar el modal
      }, 5000);
    }
  }, [showModal, navigate]);

  const handleLoginWithModal = () => {
    handleLoginWithSpotify();
    setShowModal(true); // Mostrar el modal
  };

  return (
    <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
      <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
        <img src={logo} alt="Logo" style={{ width: '72px', height: '72px', borderRadius: '50%', marginRight: '2em' }} />
        <span className="fs-4">SpotiStats</span>
      </Link>

      <ul className="nav nav-pills">
        <li className="nav-item">
          <div>{nombreUsuario}</div>
        </li>
       
        <div className="dropdown" onMouseLeave={handleDropdownClose}>
          {token && userData && (
            <img
              src={userData?.images?.[0]?.url}
              alt="Your Image"
              className="dropdown-img"
              style={{ width: '72px', height: '72px', borderRadius: '50%', marginRight: '2em' }}
              onMouseEnter={handleDropdownToggle}
            />
          )}

          {!token && (
            <img
              src="https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"
              alt="Placeholder"
              className="dropdown-img"
              style={{ width: '72px', height: '72px', borderRadius: '50%', marginRight: '2em' }}
              onMouseEnter={handleDropdownToggle}
            />
          )}

          {isDropdownOpen && (
            <div className="dropdown-content">
              <Link to="/perfil">Perfil</Link>
              {!token && (
                <a href="#" onClick={handleLoginWithModal}>
                  Login con Spotify
                </a>
              )}
              <Link to ="/login">Login</Link>
              <Link to ="/#" onClick={logout} >Logout</Link>
              <Link to="/admin">Admin</Link>
              <Link to="/menuPlaylist">Crear Playlist</Link>
            </div>
          )}
        </div>
      </ul>

      {/* Modal */}
      {showModal && (
        <div style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '5px', textAlign: 'center' }}>
            <h3>Usuario logueado correctamente</h3>
          </div>
        </div>
      )}
    </header>
  );
}

export default BarraNav;
