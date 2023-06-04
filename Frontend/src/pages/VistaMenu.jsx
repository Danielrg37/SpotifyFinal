import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/admin/vista_admin.css';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import  img_artistas  from './../img/admin_artistas.jpg';
import img_canciones  from './../img/admin_canciones.jpg';
import img_discos from './../img/admin_discos.png';
import BarraNav from './BarraNav';

function VistaMenu() {

    return (
        <div className="container">
            <BarraNav />

            <div className="row mt-5">
                <div className="col-4 text-center" id="datos">
                    <div className="grafico-container" style={{ height: '95vh' }}>
                        <Link to={`/adminDisco`} className="custom-underline">
                            <p style={{ fontSize:  '30px' }}>Consultar discos</p>
                            <img src={img_discos} alt="grafica-usuario" border="0" width="100%" height="420"></img>
                            <div className="row mt-3">
                                <button className={`btn btn-outline-success rounded-pill w-100`}>
                                    Acceder
                                </button>
                            </div>
                        </Link>
                    </div>
                </div>

                <div className="col-4 text-center" id="datos">
                    <div className="grafico-container" style={{ height: '95vh' }}>
                        <Link to={`/adminArtista`} className="custom-underline">
                            <p style={{ fontSize:  '30px'}}>Consultar artistas</p>
                            <img src={img_artistas} alt="grafica-usuario" border="0" width="100%" height="420"></img>
                            <div className="row mt-3">
                                <button className={`btn btn-outline-success rounded-pill w-100`}>
                                    Acceder
                                </button>
                            </div>
                        </Link>
                    </div>
                </div>

                <div className="col-4 text-center" id="datos">
                    <div className="grafico-container" style={{ height: '95vh' }}>
                        <Link to={`/adminCancion`} className="custom-underline">
                            <p style={{ fontSize: '30px' }}>Consultar canciones</p>
                            <img src={img_canciones} alt="grafica-usuario" border="0" width="100%" height="420"></img>
                            <div className="row mt-3">
                                <button className={`btn btn-outline-success rounded-pill w-100`}>
                                    Acceder
                                </button>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="row mt-5">
            <Footer />
        </div>
        </div>
    );
}

export default VistaMenu;
