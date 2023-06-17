
import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/disco/vista_disco.css';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import CommentSection from './ComentariosCaja';
import BarraNav from './BarraNav';
import Footer from './Footer';

function VistaDisco() {

    const [disco, setDisco] = useState([]);
    const [cancionesDisco, setCancionesDisco] = useState([]);
    const [url, setUrl] = useState(``);

    const token = sessionStorage.getItem('token');

    const { id } = useParams();

    useEffect(() => {
        if (token) {
          fetch(`http://ec2-3-230-86-196.compute-1.amazonaws.com:5120/Disco/${id}`, {
            method: "GET",
            headers: {
              'X-Access-Token': sessionStorage.getItem('token'),
              'Origin': 'http://localhost:5173'  // Replace with your front-end application's URL and port
            }
          })
            .then(response => response.json())
            .then(data => {
              console.log(data);
              const album = JSON.parse(data.album); // Parse the album JSON string into an object
              const tracks = JSON.parse(data.tracks); // Parse the tracks JSON string into an object
              setDisco(album);
              setCancionesDisco(tracks.items);
              const baseUrl = "https://www.amazon.es/s?k=";
              if(album.artists.length > 0) {
              var searchQuery = `${album.artists[0].name}+${album.name}`;
              }
              const url = baseUrl + searchQuery;
              setUrl(url);
            })
            .catch(error => console.error(error));
        }
      }, [token]);

        const [UsuarioID, setUsuarioID] = useState("");
        const [CancionID, setCancionID] = useState("");
        const [ArtistaID, setArtistaID] = useState("");
        const [DiscoID, setDiscoID] = useState("");

        useEffect(() => {
            setCancionID("-");
            setArtistaID("-");
            setDiscoID(id);
          }, [id]);


      useEffect(() => {
        if (sessionStorage.getItem('nombreUsuario')) {
          fetch(`http://ec2-3-230-86-196.compute-1.amazonaws.com:5120/usuarios/usuarios`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Origin": "http://localhost:5173",
            }
          })
          .then(response => response.json())
          .then(data => {
            const usuario = data.find(user => user.nombreUsuario === sessionStorage.getItem('nombreUsuario'));
            if (usuario) {
              const usuarioID = usuario.Id;
              console.log(usuarioID);
              setUsuarioID(usuarioID);
            }
          })
          .catch(error => console.error(error));
        }
      }, []);
  
      
      useEffect(() => {
        if (sessionStorage.getItem('nombreUsuario')) {
          fetch("http://ec2-3-230-86-196.compute-1.amazonaws.com:5120/acciones/acciones_anadir", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Origin": "http://localhost:5173",
            },
            body: JSON.stringify({
              CancionID: "-",
              ArtistaID: "-",
              DiscoID: id,
              UsuarioID: UsuarioID,
              NombreUsuario: sessionStorage.getItem('nombreUsuario')
            }),
          })
          .then(response => response.json())
          .then(data => {
            console.log(data);
          })
          .catch(error => console.error(error));
        }
      }, [disco]);
      
      
         
    console.log(disco);
    const embedUrl = `https://open.spotify.com/embed/album/${id}`;
    console.log(url);

    console.log(cancionesDisco);


    return (
       !disco ? (
          <Loader /> 
          ) : (
        <div className="container">
          <BarraNav />

            <div className="cancion-container">
                <div className="row">
                    <div className="col-4">
                        <img src={disco?.images?.[1]?.url} alt="Artista 1" className="img-fluid" />
                    </div>
                    <div className="col-8">
                        <h2>
                            {disco.artists && disco.artists.length > 0 &&
                                <span>
                                    {disco.artists.map((artista) => (
                                        <Link key={artista.id} className="custom-underline" to={`/artista/${artista.id}`}>
                                            {artista.name}
                                        </Link>
                                    )).reduce((prev, curr) => [prev, ", ", curr])}
                                </span>
                            }
                        </h2>

                        <h1>{disco.name}</h1>
                        {/* // Añadir url */}
                        {url !== null && <Button href={url} className="green-color mt-2">Compra en Amazon</Button>}

                    </div>
                </div>
            </div>

            <div className='disco-container mt-3'>
                <div class="row mt-3">
                    <h1>Canciones que pertenecen al disco</h1>
                    <div className="col-12" style={{ overflowX: 'scroll', whiteSpace: 'nowrap', height: '300px' }}>
                        {cancionesDisco.map((cancion, index) => (
                            <div key={index} className="d-inline-block mx-2">
                                <Link to={`/cancion/${cancion.id}`} className="custom-underline">
                                    <img src={disco?.images?.[1]?.url} alt={`Canción ${index}`} className="img-fluid" width="250" height="250" />

                                    <p>{cancion.name}</p>
                                </Link>
                            </div>

                        ))}
                    </div>
                </div>
            </div>
            <div class="row mt-5 mb-3">
                <div class="col-6 canciones-container mr-1">
                   <CommentSection idPagina = {id}/>
                </div>

                <div class="col-6 cancion-container">
                    <h1 style={{textAlign: 'center'}}>Vista del disco</h1>
                    <iframe
                        id="spotify-iframe"
                        src={embedUrl}
                        width="100%"
                        height="500"
                        frameBorder="0"
                        allowtransparency="true"
                        allow="encrypted-media"
                    />
                </div>
            </div>
            <div className="row mt-5">
            <Footer />
        </div>
        </div>

    ));

}

export default VistaDisco;

