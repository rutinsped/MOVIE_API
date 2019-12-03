import React,{ useState }  from 'react';
import PropTypes from 'prop-types';
import './movie-view.scss';
import { Link } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
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
      
        <Card style={{width: '60rem', height: '42rem', margin: '2rem' }}>
        <Card.Body> 
        <div className="movie-view">         
          <div className="movie-title">
          <Card.Title>  
          <div className="label">Title:</div>
          <div className="value">{movie.Title}</div>
          </Card.Title>
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
        <Link to={`/genres/${movie.Genre.Name}`}>
        <Button className="button-card">Genre</Button>
        </Link>
        <div className="movie-director">
          <div className="label">Director:</div>
          <div className="value">{movie.Director.Name}</div>
        </div>
        <div>
        <Link to={`/directors/${movie.Director.Name}`}>
        <Button className="button-card">Director</Button>
        </Link>
        </div>
        <div>
        <Link to={"/"}>
          <Button className="button-card">Back to all Movies</Button>
          </Link>
          </div>
          </div>
       </Card.Body>
       </Card>        
     );
  }
}