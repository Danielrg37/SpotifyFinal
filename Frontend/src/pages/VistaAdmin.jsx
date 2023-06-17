
import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/admin/vista_admin.css';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import usuario from './../img/usuario.png';
import img_zona2 from './../img/300x300.png';
import BarraNav from './BarraNav';
import admin_artistadisco from './../img/adminAD.jpg';
import Error404 from './Error404';
import Loader from './Loader';




function Admin() {

    


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


            <div class="row mt-5">

                <div class="col-6 text-center" id="datos">
                    <div className="grafico-container" style={{ height: '70vh' }}>
                        <Link to={`/adminUsuario`} className="custom-underline">
                            <p style={{ fontSize: '30px' }}>Consultar usuarios e historial</p>

                            <img src={usuario} alt="grafica-usuario" border="0" width="80%" height="400"></img>

                            <div className="row mt-3">
                                <button className={`btn btn-outline-success rounded-pill w-100`}>
                                    Acceder
                                </button>
                            </div>
                        </Link>

                    </div>
                </div>

                <div class="col-6 text-center" id="datos">
                    <div className="grafico-container" style={{ height: '70vh' }}>
                        <Link to={`/adminMenu2`} className="custom-underline">
                            <p style={{ fontSize: '30px' }}>Consultar artistas/canciones...</p>

                            <img src={admin_artistadisco} alt="grafica-usuario" border="0" width="80%" height="400"></img>
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


export default Admin;
