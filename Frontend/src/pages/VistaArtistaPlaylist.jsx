import React from "react";
import { useState, useEffect } from "react";
import BarraBusqueda from "./BarraBusquedaArtista";
import { Button } from "react-bootstrap";



function VistaCancionA () {
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

        <div className="row mt-5">
            <BarraBusqueda></BarraBusqueda>
         </div>


       
        <footer>
            <p class="float-end"><a href="#">Back to top</a></p>
            <p>Placeholder <a href="#">Placeholder</a> · <a href="#"></a></p>

        </footer>
    </div>
    )
}

export default VistaCancionA;