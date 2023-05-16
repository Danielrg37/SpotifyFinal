import { useState } from 'react';
import { Card, Image, Button, Form } from 'react-bootstrap';
import React from 'react';
import ben from "./../img/ben.png";
import fernando from "./../img/fernando.png";

const CommentSection = () => {
  const [respuesta, setRespuesta] = useState('');
  const [mostrarForm, setmostrarForm] = useState(false);
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
    setmostrarForm(false);
  };

  const BotonResponder = () => {
    setmostrarForm(true);
  };

  
  return (
    <div className='cancion-container'>
      <Card className='cancion-container'>
        <Card.Body>
          <h2 className="mb-3">Comentarios</h2>
  
          <div className="d-flex flex-start cancion-container">
            <Image
              className="rounded-circle shadow-1-strong me-3"
              src={ben}
              alt="avatar"
              width="65"
              height="65"
            />
  
            <div className="flex-grow-1 flex-shrink-1 cancion-container">
              <div>
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-1">
                    Ben Yart{' '}
                    <span className="small">- Hace 2 horas</span>
                  </p>
                  <Button variant="link" onClick={BotonResponder}>
                    <i className="fas fa-reply fa-xs" /> Responder
                  </Button>
                </div>
                <p className="small mb-0">
                  Mañaneo Mañaneo Mañaneo Mañaneo Mañaneo Mañaneo Mañaneo Mañaneo
                </p>
              </div>
            </div>
          </div>
  
          {/* Nested comment */}
          <div className="d-flex flex-start mt-4 cancion-container">
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
                  <p className="mb-1">
                    Lorem ipsum{' '}
                    <span className="small">- Hace 3 horas</span>
                  </p>
                </div>
                <p className="small mb-0">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, officia!
                </p>
              </div>
            </div>
          </div>
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
              <Button className='green-color mt-2' type="submit">
                Responder
              </Button>
            </Form>
          )}
          {/* End of reply form */}
        </Card.Body>
      </Card>
  
      {/* Display comments */}
      {comentarios.map((comentario, index) => (
        <Card className="mt-4 cancion-container" key={index}>
          <Card.Body>
            <div className="d-flex flex-start">
              <Image
                className="rounded-circle shadow-1-strong me-3"
                src={ben}
                alt="avatar"
                width="65"
                height="65"
              />
  
              <div className="flex-grow-1 flex-shrink-1">
                <div>
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="mb-1">
                      {comentario.Escritor} <span className="small">- {comentario.Momento}</span>
                    </p>
                  </div>
                  <p className="small mb-0">{comentario.Comentario}</p>
                        </div>
                          </div>
                          </div>
                          </Card.Body>
                          </Card>
      ))}
      {/* End of display comments */}
        </div>
  );
};

export default CommentSection;
