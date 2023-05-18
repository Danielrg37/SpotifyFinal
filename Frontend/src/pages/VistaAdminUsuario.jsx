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

            </div>
    )
}

export default VistaAdminUsuario