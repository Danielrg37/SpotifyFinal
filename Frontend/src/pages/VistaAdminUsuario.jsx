import React from 'react'
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/admin/vista_admin.css';
import { useNavigate } from 'react-router-dom';
import BarraNav from './BarraNav';

function VistaAdminUsuario() {
    return (
        <div className="container">
            <BarraNav />
            <div class="row mt-3">
                <div class="col-12 text-center" id="datos">
                    <div className="grafico-container">
                        <h4>Gráficas de usuarios</h4>
                        <img src="https://i.ibb.co/0jJQY5Q/grafica-usuario.png" alt="grafica-usuario" border="0" width="80%" height="400"></img>

                    </div>
                </div>

                <div class="row mt-5">
                    <div class="col-6 text-center" id="datos">
                        <div className="grafico-container">
                            <h4>Tabla de playlist de usuarios</h4>
                            <img src="https://i.ibb.co/0jJQY5Q/grafica-usuario.png" alt="grafica-usuario" border="0" width="80%" height="400"></img>
                        </div>
                    </div>

                    <div class="col-6 text-center" id="datos">
                        <div className="grafico-container">
                            <h4>Historial de cambios de usuarios</h4>
                            <img src="https://i.ibb.co/0jJQY5Q/grafica-usuario.png" alt="grafica-usuario" border="0" width="80%" height="400"></img>
                        </div>
                    </div>


                </div>
            </div>
        </div>

    )
}

export default VistaAdminUsuario