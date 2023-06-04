import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/home/home.css';
import fernando from './../img/fernando.png';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import imagenBack from './../img/foto2.png';
import imagen2 from './../img/foto3.png';
import BarraNav from './BarraNav';
import Footer from './Footer';

function Home() {
    const [token, setToken] = useState("")
    const navigate = useNavigate();

  

    useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")

        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

            window.location.hash = ""
            window.localStorage.setItem("token", token)
        }

        setToken(token)
    }, [])


    return (
        <div class="container">
           <BarraNav />

            <div className="containers_info">
                <div class="row">
                    <div class="col-md-8 col-lg-6 text-center">
                        <h1 class="display-5 fw-bold">Ten más control de tus gustos</h1>
                        <p class="fs-3">¡Descubre un nuevo mundo de datos sobre tus gustos musicales en Spotify! Regístrate ahora para acceder a información detallada sobre tus artistas, géneros y canciones favoritas. ¡Haz clic abajo y adéntrate en el apasionante universo de la música!</p>
                    
                    </div>
                    <div class="col-md-12 col-lg-6 d-flex align-items-center justify-content-center">
                        <img src={imagenBack}  alt="Imagen del artista" style={{ width: '100%', height: '100%', borderRadius: '50px'}} />
                    </div>
                </div>
            </div>

            <div className="containers_info mt-4">
  <div class="row">
    <div class="col-md-6 d-flex align-items-center">
      <img src={imagen2} class="img-fluid rounded" alt="..." style={{height: '500px', borderRadius: '50px'}} />
    </div>
  


                    <div class="col-md-6 mt-2">
                        <h1>Consulta tus tops de Spotify</h1>
                        <p>¿Quieres saber cuáles son tus canciones y artistas más escuchados en Spotify? Aquí podrás acceder a esta información de forma fácil y rápida.</p>
                        <h1 className='mt-5'>Obten más información de tus artistas y canciones favoritos</h1>
                        <p>Descubre más sobre tus artistas y canciones favoritos aquí. Obtén información detallada sobre ellos y sus canciones.</p>
                        <h1 className='mt-5'>Infórmate acerca de conciertos u noticias</h1>
                        <p>No te pierdas los eventos o conciertos de tus artistas favoritos. Aquí, podrás estar al tanto de las últimas noticias y fechas de conciertos en todo el mundo.</p>

                    </div>
                </div>
            </div>
        <div className="row mt-5">
            <Footer />
        </div>
        </div>
    );
}



export default Home;


