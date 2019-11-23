import React, { useState } from 'react';
import './login-view.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link } from "react-router-dom";

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://cinesider.herokuapp.com/login', {
    Username: username,
    Password: password    
  })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch(e => {
      console.log('no such user')
    });
  };

    return (
      <div className="loginForm">
      <Container>
       <Row style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "Navy",
          marginTop: 100
        }}>
        <Col xs={6} md={4}>
  <form>
  <Form.Group controlId="formBasicUsername">
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