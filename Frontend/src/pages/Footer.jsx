
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/home/home.css";

function Footer() {
    return (

<footer class="footer">
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <h3>Enlaces</h3>
        <ul class="footer-links">
          <li><a href="#">Inicio</a></li>
          <li><a href="#">Explorar</a></li>
          <li><a href="#">Mis Favoritos</a></li>
          <li><a href="#">Artistas</a></li>
        </ul>
      </div>
      <div class="col-md-6">
        <h3>Contacto</h3>
        <p>¡Nos encantaría saber de ti!</p>
        <p>Correo electrónico: info@example.com</p>
      </div>
    </div>
  </div>
  <div class="footer-bottom">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <p class="text-center">&copy; 2023 Tu Sitio Web | Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  </div>
</footer>

    );
}

export default Footer;