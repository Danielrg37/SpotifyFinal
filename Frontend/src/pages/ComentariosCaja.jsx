import { useState } from 'react';
import { Container, Row, Col, Card, Image, Button, Form } from 'react-bootstrap';
import React from 'react';
import "./css/comentarios/comentarios.css";

const CommentSection = () => {
  const [replyText, setReplyText] = useState('');
  const [showReplyForm, setShowReplyForm] = useState(false);

  const handleReplyChange = (event) => {
    setReplyText(event.target.value);
  };

  const handleReplySubmit = (event) => {
    event.preventDefault();
    // Perform any necessary actions with the reply text (e.g., send it to a server or update the state)
    console.log('Reply:', replyText);
    setReplyText('');
    setShowReplyForm(false);
  };

  const handleReplyButtonClick = () => {
    setShowReplyForm(true);
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md="12" lg="10" xl="8">
          <Card>
            <Card.Body>
              <Card.Title>Nested comments section</Card.Title>

              <div className="d-flex flex-start">
                <Image
                  className="rounded-circle shadow-1-strong me-3"
                  src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(10).webp"
                  alt="avatar"
                  width="65"
                  height="65"
                />

                <div className="flex-grow-1 flex-shrink-1">
                  <div>
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="mb-1">
                        Maria Smantha{' '}
                        <span className="small">- 2 hours ago</span>
                      </p>
                      <Button variant="link" onClick={handleReplyButtonClick}>
                        <i className="fas fa-reply fa-xs" /> reply
                      </Button>
                    </div>
                    <p className="small mb-0">
                      It is a long established fact that a reader will be
                      distracted by the readable content of a page.
                    </p>
                  </div>

                  {/* Nested comment */}
                  <div className="d-flex flex-start mt-4">
                    <Image
                      className="rounded-circle shadow-1-strong me-3"
                      src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(11).webp"
                      alt="avatar"
                      width="65"
                      height="65"
                    />

                    <div className="flex-grow-1 flex-shrink-1">
                      <div>
                        <div className="d-flex justify-content-between align-items-center">
                          <p className="mb-1">
                            Simona Disa{' '}
                            <span className="small">- 3 hours ago</span>
                          </p>
                        </div>
                        <p className="small mb-0">
                          letters, as opposed to using 'Content here, content
                          here', making it look like readable English.
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* End of nested comment */}

                  {/* Reply form */}
                  {showReplyForm && (
                    <Form onSubmit={handleReplySubmit}>
                      <Form.Group className="mt-4">
                        <Form.Control
                          as="textarea"
                          rows={3}
                          placeholder="Write your reply"
                          value={replyText}
                          onChange={handleReplyChange}
                        />
                      </Form.Group>
                      <Button variant="primary" type="submit">
                        Submit
                      </Button>
                    </Form>
                  )}
                  {/* End of reply form */}
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );

};

export default CommentSection;
