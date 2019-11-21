import React from 'react';
import PropTypes from 'prop-types';
import './director-view.scss';
import { Link } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';



export class DirectorView extends React.Component {

  render() {
    const { director } = this.props;

    return (
      <Card style={{ width: '20rem', height: '40rem', margin: '2rem' }}>
        <Card.Body>
          <Card.Title>{director.Name}</Card.Title>
          <Card.Text>{director.Bio}</Card.Text>
          <Card.Text>{director.Birth}</Card.Text>
          <Link to={`/`}></Link>
          <Button className="primary" variant="link">Back</Button>
        </Card.Body>
      </Card>
    );
  }
} 