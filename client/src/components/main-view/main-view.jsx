import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './main-view.scss';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {

  constructor() {
    super();

    this.state = {
      movies: null,
      selectedMovie: null,
      user: null
    };
  }

  componentDidMount() {
    axios.get('https://cinesider.herokuapp.com/movies')
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  goBack = () => {
    this.setState({ 
      selectedMovie: null 
    })
  }



  render() {
    const { movies, selectedMovie, user } = this.state;
    console.log(movies)

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    // Before the movies have been loaded
    if (!movies) return <div className="main-view"/>;

    return (
      <div className="main-view">
       {selectedMovie
          ? <MovieView movie={selectedMovie}  onClick={this.goBack}/>
          : movies.map(movie => (
            <Row>
              <Col xs={6} md={4}>
               <MovieCard key={movie._id}
                 movie={movie}
                 onClick={movie => this.onMovieClick(movie)}
               />
              </Col>
            </Row>
          ))
       }
      </div>
    );
  }
}
