
import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/admin/vista_admin.css';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

function VistaArtista() {

    return (

        <div className="container">
            <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
                <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    Placeholder
                </a>

                <ul className="nav nav-pills">
                    <Button className="green-color" onClick={() => navigate('/registro')}>
                        Placeholder
                    </Button>
                </ul>
            </header>


            <div class="row mt-3">

                <div class="col-12 text-center" id="datos">
                    <div className="grafico-container">
                    <Link to={`/adminUsuario`} className="custom-underline">
                    <p style={{fontSize: '22px'}}>Consultar usuarios</p>
                    </Link>
                    </div>
                </div>

            </div>


            <div className="row mt-5">

                <div class="col-6 text-center" id="datos">
                    <div className="grafico-container">
                        <p>Placeholder</p>
                    </div>
                </div>

                <div class="col-6 text-center" id="datos">
                    <div className="grafico-container">
                        <p>Placeholder</p>
                    </div>
                </div>
            </div>

            <div class="row mt-5">
                
            <div class="col-6 text-center" id="datos">
                    <div className="grafico-container">
                    <Link to={`/adminCancion`} className="custom-underline">
                    <p style={{fontSize: '22px'}}>Consultar canción</p>
                  </Link>
                    </div>
                </div>

                <div class="col-6 text-center" id="datos">
                    <div className="grafico-container">
                    <Link to={`/adminArtista`} className="custom-underline">
                    <p style={{fontSize: '22px'}}>Consultar artista</p>
                  </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VistaArtista;
