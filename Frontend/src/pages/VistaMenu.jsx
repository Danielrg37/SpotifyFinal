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

    const [usuarioTipo, setUsuarioTipo] = useState("");

    useEffect(() => {
        if (localStorage.getItem('nombreUsuario')) {
          fetch(`http://ec2-3-230-86-196.compute-1.amazonaws.com:5120/usuarios/usuarios`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Origin": "http://localhost:5173",
            }
          })
          .then(response => response.json())
          .then(data => {
            const usuario = data.find(user => user.nombreUsuario === localStorage.getItem('nombreUsuario'));
            if (usuario) {
              setUsuarioTipo(usuario.tipo);
              console.log(usuarioTipo);
            }
          })
          .catch(error => console.error(error));
        }
      }, []);

      if (usuarioTipo === "user") {
        return <Error404 />;
      } else if (usuarioTipo === "") {
        return <Loader />;
      }



    return (
        <div className="container">
            <BarraNav />

            <div className="row mt-5">
                <div className="col-4 text-center" id="datos">
                    <div className="grafico-container" style={{ height: '60vh' }}>
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
                    <div className="grafico-container" style={{ height: '60vh' }}>
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
                    <div className="grafico-container" style={{ height: '60vh' }}>
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
