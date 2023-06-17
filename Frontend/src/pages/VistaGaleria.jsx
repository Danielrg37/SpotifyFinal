import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import cheerio from "cheerio";
import { Button } from "react-bootstrap";
import "./css/galeria/vista_galeria.css";
import BarraNav from "./BarraNav";
import Footer from "./Footer";
import Error404 from "./Error404";
import Loader from "./Loader";

function GalleryComponent() {
    const [imagenes, setImagenes] = useState([]);
    const [artista, setArtista] = useState({});

    const token = sessionStorage.getItem("token");

    const { id } = useParams();


    if (usuarioTipo === "user") {
        return <Error404 />;
      } else if (usuarioTipo === "") {
        return <Loader />;
      }


    useEffect(() => {
        if (token) {
                    fetch(`http://ec2-3-230-86-196.compute-1.amazonaws.com:5120/artista/${id}?si=c14fd7cce6ec4d59`, {
                        method: 'GET',
                        headers: {
                            'X-Access-Token': sessionStorage.getItem('token'),
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
                    fetch(`http://ec2-3-230-86-196.compute-1.amazonaws.com:5120/galeria/${artista.name}`, {
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
          <BarraNav />
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
        <div className="row mt-5">
            <Footer />
        </div>
  </div>
    );

}

export default GalleryComponent;

