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

                    </div>
                </div>

                <div class="row mt-5">
                    <div class="col-6 text-center" id="datos">
                        <div className="grafico-container">

                        </div>
                    </div>

                    <div class="col-6 text-center" id="datos">
                        <div className="grafico-container">

                        </div>
                    </div>


                </div>
            </div>
        </div>

    )
}

export default VistaAdminUsuario