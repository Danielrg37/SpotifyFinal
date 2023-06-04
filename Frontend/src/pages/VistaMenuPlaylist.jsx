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
                <div className="col-6 text-center" id="datos">
                    <div className="grafico-container" style={{ height: '95vh' }}>
                        <Link to={`/playlistC`} className="custom-underline">
                        <p style={{ fontSize:  '30px'}}>Crear playlist en base a canción</p>
                            <img src={img_canciones} alt="" style={{ width: '100%', height: '78%' }} />
                            <div className="row mt-3">
                                <button className={`btn btn-outline-success rounded-pill w-100`}>
                                    Acceder
                                </button>
                            </div>
                        </Link>
                    </div>
                </div>

                <div className="col-6 text-center" id="datos">
                    <div className="grafico-container" style={{ height: '95vh' }}>
                        <Link to={`/playlistA`} className="custom-underline">
                            <p style={{ fontSize:  '30px'}}>Crear playlist en base a artista</p>
                           <img src={img_artistas} alt="grafica-usuario" border="0" width="100%" height="420"></img>
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
