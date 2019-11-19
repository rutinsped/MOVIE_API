import React, { useState } from 'react';
import './registration-view.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export function RegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ name, setName ] = useState('');
  const [ email, setEmail] = useState('');
  const [ password, setPassword ] = useState('');

  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, name, email, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onRegisteredIn(username);
    };

    return (
      <div className="registrationForm">
      <Container>
       <Row style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "CornflowerBlue "
        }}>
        <Col xs={6} md={4}>
              <form>
  <Form.Group controlId="formBasicUsername">
    <Form.Label>Username</Form.Label>
    <Form.Control type="username" placeholder="Enter Username" value={username} onChange={e => setUsername(e.target.value)} />
  </Form.Group>

  <Form.Group controlId="formBasicName">
    <Form.Label>Name</Form.Label>
    <Form.Control type="name" placeholder="Enter Name" value={name} onChange={e => setName(e.target.value)} />
  </Form.Group>

  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email</Form.Label>
    <Form.Control type="uemail" placeholder="Enter Email" value={email} onChange={e => setEmail(e.target.value)} />
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
  </Form.Group>
    <Button variant="primary" type="button" onClick={handleSubmit}>Register</Button>
      </form>
      </Col>
      </Row>
    </Container>
    </div>
       );
  }