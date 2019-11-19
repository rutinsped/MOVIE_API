import React from 'react';
import PropTypes from 'prop-types';
import './movie-view.scss';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';



export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  
  render() {
    const { movie, onClick } = this.props;

    if (!movie) return null;

    return (
      <Container> 
        <Row>  
        <Col xs={6} md={8}>   
        <div className="movie-view">
          <div className="movie-title">
          <div className="label">Title:</div>
          <div className="value">{movie.Title}</div>
        </div>
        <div className="movie-description">
          <div className="label">Description:</div>
          <div className="value">{movie.Description}</div>
        </div>
        <img className="movie-poster" src={movie.ImagePath} />
        <div className="movie-genre">
          <div className="label">Genre:</div>
          <div className="value">{movie.Genre.Name}</div>
        </div>
        <div className="movie-director">
          <div className="label">Director:</div>
          <div className="value">{movie.Director.Name}</div>
        </div>
        <Button
         className="primary"
         onClick={onClick}
         variant="primary">Back to all Movies</Button>
       </div>
       </Col>
       </Row>
       </Container>

     );
  }
}