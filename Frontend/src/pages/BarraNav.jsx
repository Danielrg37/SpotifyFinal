import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import logo from './../img/logo.png';
import { useContext } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Loader from './Loader';


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

  // Establecer el tiempo de caducidad en una hora (3600000 milisegundos)
  const expirationTime = 3600000;

  // Programar la eliminación del token después de una hora
  setTimeout(function () {
    // Eliminar el token del sessionStorage
    sessionStorage.removeItem('token');
    console.log('El token ha sido eliminado después de una hora.');
  }, expirationTime);

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
    navigate('/');
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
  }

  const [usuarioTipo, setUsuarioTipo] = useState("");

  useEffect(() => {
      if (localStorage.getItem('nombreUsuario')) {
        fetch(`http://ec2-3-230-86-196.compute-1.amazonaws.com:5120/usuarios/usuarios`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Origin": "http://localhost:5173",
          }
        })
        .then(response => response.json())
        .then(data => {
          const usuario = data.find(user => user.nombreUsuario === localStorage.getItem('nombreUsuario'));
          if (usuario) {
            setUsuarioTipo(usuario.tipo);
            console.log(usuarioTipo);
          }
        })
        .catch(error => console.error(error));
      }
    }, []);

    

  
  return (
    <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
      <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
        <img src={logo} alt="Logo" style={{ width: '72px', height: '72px', borderRadius: '50%', marginRight: '2em' }} />
        <span className="fs-4">SoundScape</span>
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
              {!localStorage.getItem('nombreUsuario') && (
                <>
                  <Link to="/registro">Registro</Link>
                  <Link to="/login">Login</Link>
                </>
              )}

              {localStorage.getItem('nombreUsuario') && !sessionStorage.getItem('token') && (
                <>
                  <a href="#" onClick={handleLoginWithModal}>
                    Login con Spotify
                  </a>
                  <Link to="/#" onClick={logout}>
                    Logout
                  </Link>
                </>
              )}

              {localStorage.getItem('nombreUsuario') && sessionStorage.getItem('token') && (
                <>
                  <Link to="/perfil">Perfil</Link>
                  <Link to="/menuPlaylist">Crear Playlist</Link>
                  {usuarioTipo === "admin" && (
                    <Link to="/admin">Admin</Link>
                  )}
                  <Link to="/#" onClick={logout}>
                    Logout
                  </Link>
                </>
              )}
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
