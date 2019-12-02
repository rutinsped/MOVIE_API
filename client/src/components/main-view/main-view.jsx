import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
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
      movies: [],
      user: null
    };
  }

  getMovies(token) {
    axios.get('https://cinesider.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
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

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
  if (accessToken !== null) {
    this.setState({
      user: localStorage.getItem('user')
    });
    this.getMovies(accessToken);
  }
}

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });
  
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  goBack = () => {
    this.setState({ 
      selectedMovie: null 
    })
  }



  render() {
    const { movies, user } = this.state;
    
   // Before the movies have been loaded
    if (!movies) return <div className="main-view"/>;

    return (
      <Router>
      <div className="main-view">
        <Switch>
          <Route exact path="/" 
          render={() => 
            { if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
        
          return movies.map(m => <MovieCard key={m._id} movie={m}/>)
      }
    }
  />
          <Route exact path="/register" render={() => <RegistrationView />} />
          <Route path="/login" render={() => <LoginView />} />
          <Route path="/movies/:movieId" 
          render={({match}) => <MovieView movie={movies.find(m => m._id === match.params.movieId)}/>}
        />
          <Route path="/directors/:name" 
          render={({ match }) =>
        {
          if (!movies) return <div className="main-view"/>;
          return <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director}/>
        }
          }
    />
          <Route path="/genres/:name"
           render={({ match }) => 
        {
          if (!movies) return <div className="main-view"/>;
          return <GenreView director={movies.find(m => m.Genre.Name === match.params.name).Genre}/>
        }
      }     
    />
        </Switch>
      </div>
    </Router>
    );
  }
}
