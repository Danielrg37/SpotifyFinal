import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import cheerio from "cheerio";
import { Button } from "react-bootstrap";
import "./css/galeria/vista_galeria.css";

function GalleryComponent() {
    const [imagenes, setImagenes] = useState([]);
    const [artista, setArtista] = useState({});

    const token = localStorage.getItem("token");

    const { id } = useParams();

    useEffect(() => {
        if (token) {
                    fetch(`http://localhost:5120/artista/${id}?si=c14fd7cce6ec4d59`, {
                        method: 'GET',
                        headers: {
                            'X-Access-Token': localStorage.getItem('token'),
                            'Origin': 'http://localhost:5173'  // Replace with your front-end application's URL and port
                        }
                    })
                        .then(response => response.json())
                        .then(data => {
                            setArtista(data);
                        });
                }
            }, [token]);

            useEffect(() => {
                if(artista.name){
                    fetch(`http://localhost:5120/galeria/${artista.name}`, {
                        method: 'GET',
                        headers: {
                            'Origin': 'http://localhost:5173'  // Replace with your front-end application's URL and port
                        }
                    })
                        .then(response => response.json())
                        .then(data => {
                            setImagenes(data);
                        }
                        )
                }
            }, [artista.name]);
        
            console.log(imagenes);


    return (
        <div className="container">
            <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
                <a
                    href="/"
                    className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
                >
                    Placeholder
                </a>
                <ul className="nav nav-pills">
                    <Button
                        className="green-color"
                        onClick={() => navigate("/registro")}
                    >
                        Placeholder
                    </Button>
                </ul>
            </header>
            <div className="row gallery-container">
                <div className="col-12">
                    <h1 className="text-center nombre">{artista.name}</h1>
                </div>
            </div>
          
            <div className="row">
            <div className="col-md-6">
                <div className="gallery-container">
                    <div className="gallery">
                        {imagenes.slice(0, Math.ceil(imagenes.length / 2)).map((imagen, index) => (
                            <div className="gallery-item" key={index}>
                                <img src={imagen} alt="" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <div className="gallery-container">
                    <div className="gallery">
                        {imagenes.slice(Math.ceil(imagenes.length / 2)).map((imagen, index) => (
                            <div className="gallery-item" key={index}>
                                <img src={imagen} alt="" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
  </div>
    );

}

export default GalleryComponent;

