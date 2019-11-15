import React, { useState } from 'react';
import './login-view.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
    };

    return (
      <div className="loginForm">
      <Container>
       <Row>
        <Col xs={6} md={4}>
              <form>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Username</Form.Label>
    <Form.Control type="username" placeholder="Enter Username" value={username} onChange={e => setUsername(e.target.value)} />
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
  </Form.Group>
    <Button variant="primary" type="button" onClick={handleSubmit}>Login</Button>
      </form>
      </Col>
      </Row>
    </Container>
    </div>
       );
  }