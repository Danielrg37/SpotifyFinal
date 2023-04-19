
import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/vista_artista.css';
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

            <div className="row">
              
            </div>
            <div class="row mt-3">
                <div class="col-md-4 text-center" id="datos">
                    <h4>Veces reproducido</h4>
                    <p>Placeholder</p>
                </div>
                <div class="col-md-4 text-center" id="datos">
                    <h4>Tiempo total de reproducci�n</h4>
                    <p>Placeholder horas</p>
                </div>
                <div class="col-md-4 text-center" id="datos">
                    <h4>�ltima vez escuchado</h4>
                    <p>Placeholder</p>
                </div>
            </div>
            <div class="row mt-3">
                <h1>Canciones m�s famosas</h1>
                <div className="col-12" style={{ overflowX: 'scroll', whiteSpace: 'nowrap', height: '300px' }}>
                    {[...Array(8)].map((_, index) => (
                        <div key={index} className="d-inline-block mx-2">
                            <img src="https://via.placeholder.com/150x150" alt={`Canci�n ${index}`} className="img-fluid" />
                            <p>Canci�n {index}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="row mt-3">
                
            </div>

            <div class="row mt-5">
              
            </div>






            <footer>
                <p class="float-end"><a href="#">Back to top</a></p>
                <p>Placeholder <a href="#">Placeholder</a> � <a href="#"></a></p>

            </footer>
        </div>
    );
}

export default VistaArtista;
