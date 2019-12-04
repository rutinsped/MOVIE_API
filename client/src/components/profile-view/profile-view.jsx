import React from 'react';
import PropTypes from 'prop-types';
import './profile-view.scss';
import { Link } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';



export class ProfileView extends React.Component {

  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { user } = this.props;

    return (
      <Card style={{ width: '20rem', height: '40rem', margin: '2rem' }}>
        <Card.Body>
          <Card.Title>{user.Username}</Card.Title>
          <Card.Text>{user.Name}</Card.Text>
          <Card.Text>{user.Email}</Card.Text>
          <Card.Text>{user.Password}</Card.Text>
          <Link to={`/`} >
            <Button className="button-card" variant="info">Back</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
} 