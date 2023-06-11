import { useState, useEffect } from 'react';
import { Card, Image, Button, Form } from 'react-bootstrap';
import React from 'react';
import ben from "./../img/ben.png";
import fernando from "./../img/fernando.png";
import "./css/comentarios/comentarios.css";

const CommentSection = () => {
  const [respuesta, setRespuesta] = useState('');
  const [mostrarForm, setMostrarForm] = useState(false);
  const [comentarios, setComentarios] = useState([]);

  const ManejarRespuesta = (event) => {
    setRespuesta(event.target.value);
  };

  const AñadirRespuesta = (event) => {
    event.preventDefault();
    // Create a new comment object
    const nuevoComentario = {
      Escritor: 'Nombre', // Set the author of the comment here
      Momento: new Date().toLocaleString(), // Set the timestamp of the comment
      Comentario: respuesta, // Get the reply text from the state
    };

    // Update the comments state with the new comment
    setComentarios([...comentarios, nuevoComentario]);

    // Reset the reply text and hide the reply form
    setRespuesta('');
    setMostrarForm(false);
  };

  const BotonResponder = () => {
    setMostrarForm(true);
  };

  useEffect(() => {
    fetch('http://localhost:5120/comentarios/comentarios', {
      method: 'GET',
      headers: {
        Origin: 'http://localhost:5173',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setComentarios(data);
      });
  }, []);

  

  const comentariosFiltrados = comentarios.filter((comentario) => comentario.idCancion === idCancion);

  return (
    <div className='comentarios-container'>
      <div className="d-flex justify-content-center">
        <button className='btn btn-success rounded-pill w-100 mt-2 mb-2' onClick={BotonResponder}>
          Nuevo comentario
        </button>
      </div>
      <Card className='comentarios-container'>
        <Card.Body>
          {/* Nested comment */}
          {comentariosFiltrados.map((comentario, index) => (
            <div className="d-flex flex-start mt-4 comentarios-container" key={index}>
              <Image
                className="rounded-circle shadow-1-strong me-3"
                src={fernando}
                alt="avatar"
                width="65"
                height="65"
              />

              <div className="flex-grow-1 flex-shrink-1">
                <div>
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="mb-1" style={{ color: 'black' }}>
                      {comentario.Escritor} <span className="small">- {comentario.Momento}</span>
                    </p>
                  </div>
                  <p className="small mb-0" style={{ color: 'black' }}>
                    {comentario.Comentario}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {/* End of nested comment */}

          {/* Reply form */}
          {mostrarForm && (
            <Form onSubmit={AñadirRespuesta}>
              <Form.Group className="mt-4">
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Escribe aquí tu respuesta"
                  value={respuesta}
                  onChange={ManejarRespuesta}
                />
              </Form.Group>
              <Button className='btn btn-success rounded-pill w-43 mt-2 mb-2' type="submit">
                Responder
              </Button>
            </Form>
          )}
          {/* End of reply form */}
        </Card.Body>
      </Card>
    </div>
  );
};

export default CommentSection;
