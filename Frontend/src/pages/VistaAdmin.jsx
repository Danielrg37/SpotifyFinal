
import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/admin/vista_admin.css';
import { useNavigate } from 'react-router-dom';

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
                        <p>Placeholder</p>
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
                        <p>Placeholder</p>
                    </div>
                </div>

                <div class="col-6 text-center" id="datos">
                    <div className="grafico-container">
                    <Link to={`/admin/artista`}>
                        <p>Placeholder</p>
                  </Link>
                    </div>
                </div>
            </div>
            
            






            <footer>
                <p class="float-end"><a href="#">Back to top</a></p>
                <p>Placeholder <a href="#">Placeholder</a> � <a href="#"></a></p>

            </footer>
        </div>
    );
}

export default VistaArtista;
