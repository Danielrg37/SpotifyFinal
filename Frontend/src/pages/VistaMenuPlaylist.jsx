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
import Error404 from './Error404';
import Loader from './Loader';

function VistaMenu() {

   
    if(!localStorage.getItem('nombreUsuario')){
        return <Error404 />;
      }


    return (
        <div className="container">
            <BarraNav />

            <div className="row mt-5">
            <div class="col-6 text-center" id="datos">
                    <div className="grafico-container" style={{ height: '45vw' }}>
                        <Link to={`/playlistA`} className="custom-underline">
                            <p style={{ fontSize: '30px' }}>Crear playlist basada en artista</p>

                            <img src={img_artistas} alt="grafica-usuario" border="0" width="80%" height="80%"></img>

                            <div className="row mt-3">
                                <button className={`btn btn-outline-success rounded-pill w-100`}>
                                    Acceder
                                    </button>
                            </div>
                        </Link>

                    </div>
                </div>

                <div class="col-6 text-center" id="datos">
                    <div className="grafico-container" style={{ height: '45vw' }}>
                        <Link to={`/playlistC`} className="custom-underline">
                            <p style={{ fontSize: '30px' }}>Crear playlist basada en canción</p>

                            <img src={img_canciones} alt="grafica-usuario" border="0" width="80%" height="80%"></img>

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
