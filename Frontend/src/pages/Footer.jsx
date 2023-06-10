import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/home/home.css";

function Footer() {
  return (
    <footer>

      <ul className="nav justify-content-center border-bottom pb-3 mb-3">
        <li className="nav-item">
        <Link to="/home" className="nav-link px-2 green-color2">
          Home
        </Link>
        </li>
        
        <li className="nav-item">
        <Link to="/perfil" className="nav-link px-2 green-color2">
          Perfil
        </Link>
        </li>
        
        <li className="nav-item">
        <Link to="/menuPlaylist" className="nav-link px-2 green-color2">
          Crear Playlist
        </Link>
        </li>
      </ul>
      <p className="text-center text-secondary">© 2023 SpotiStats</p>
    </footer>
  );
}

export default Footer;
