
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/home/home.css";

function Footer() {
    return (

<footer class="py-3 my-4" className="">
    <ul class="nav justify-content-center border-bottom pb-3 mb-3">
      <li class="nav-item"><a href="#" class="nav-link px-2 text-body-secondary">Inicio</a></li>
      <li class="nav-item"><a href="#" class="nav-link px-2 text-body-secondary">Perfil</a></li>
      <li class="nav-item"><a href="#" class="nav-link px-2 text-body-secondary">Crear playlists</a></li>
    </ul>
    <p class="text-center text-body-secondary">© 2023 SpotiStats</p>
  </footer>

    );
}

export default Footer;