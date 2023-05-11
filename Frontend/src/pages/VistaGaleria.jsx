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
            fetch(`https://api.spotify.com/v1/artists/${id}?si=c14fd7cce6ec4d59`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    setArtista(data);
                });
        }
    }, [token]);

    useEffect(() => {
        async function fetchImages() {
            if (artista && artista.name) {
                const url = `https://www.last.fm/music/${encodeURIComponent(
                    artista.name
                )}/+images?${new Date().getTime()}`;
                console.log(url);

                // send HTTP request using fetch
                const response = await fetch(url, {
                    headers: {
                        "User-Agent":
                            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
                        "Accept-Language": "en-US,en;q=0.9",
                    },
                });

                // parse HTML response using Cheerio
                const html = await response.text();
                const $ = cheerio.load(html);

                // get all image URLs and add them to an array
                const images = [];
                $(".image-list-item img").each((i, element) => {
                    const imageUrl = $(element).attr("src");

                    images.push({
                        src: imageUrl.replace("avatar170s", "avatar1920s"),
                    });
                });

                // set state with array of image URLs
                setImagenes(images);
            }
        }

        // invoke async function to fetch images
        fetchImages();
    }, [artista.name]);

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
            <img src={imagen.src} alt="" />
          </div>
        ))}
      </div>
    </div>z
  </div>
  <div className="col-md-6">
    <div className="gallery-container">
      <div className="gallery">
        {imagenes.slice(Math.ceil(imagenes.length / 2)).map((imagen, index) => (
          <div className="gallery-item" key={index}>
            <img src={imagen.src} alt="" />
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