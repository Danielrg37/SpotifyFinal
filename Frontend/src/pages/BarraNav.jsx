import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/home/home.css';
import fernando from './../img/fernando.png';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import imagenBack from './../img/foto2.png';


function BarraNav(){

const navigate = useNavigate();

if(!localStorage.getItem('token')){
return (
    <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
    <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none" style={{ marginRight: 'auto' }}>
      Placeholder
    </a>
    <ul className="nav nav-pills" style={{ marginLeft: 'auto' }}>
      <Button className="green-color" onClick={() => navigate('login')}>
        Placeholder
      </Button>
    </ul>
    <style>
      {`@media (max-width: 767px) {
        .nav-pills {
          margin-left: 10px; /* Ajusta el valor según tus necesidades */
        }
      }`}
    </style>
  </header>
)
} else 
return (
    <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
    <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        Placeholder
    </a>
    <ul class="nav nav-pills">
        <Button className="green-color" onClick={() => navigate('login2')}>
            Placeholder
        </Button>

        <Button className="green-color" onClick={() => navigate('perfil')}>
            Perfil rápido
        </Button>

        <Button className="green-color" onClick={() => navigate('admin')}>
            Admin rápido
        </Button>
    </ul>

</header>
)

}

export default BarraNav;