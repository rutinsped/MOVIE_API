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
import NavDropdown from 'react-bootstrap/NavDropdown'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';

export class MainView extends React.Component {

  constructor() {
    super();

    this.state = {
      movies: [],
      user: [],
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

  getUsers(token) {
    axios.get('https://cinesider.herokuapp.com/users', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // Assign the result to the state
      this.setState({
        user: response.data
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
    this.getUsers(accessToken);
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

  onLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    })
   }

  render() {
    const { movies, user } = this.state;
    
   // Before the movies have been loaded
    if (!movies) return <div className="main-view"/>;

    return (
      <Router>
      <div className="main-view">
  <Navbar bg="light" expand="lg">
  <Navbar.Brand href="#home">Cinesider</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
    <Button className="logout" variant="info" onClick={() => this.onLogout()} >
              Log out
             </Button>
      <NavDropdown title="User settings" id="basic-nav-dropdown">
        <NavDropdown.Item href="/users/:userId">User profile</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Update user</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Delete user</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
    </Nav>
    </Navbar.Collapse>
</Navbar>
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
          render={({match}) => 
          <MovieView movie={movies.find(m => m._id === match.params.movieId)}/>
        }
        />
        <Route path="users/:username" 
          render={({match}) =>
          <ProfileView user={users.find(u => u.username === match.params.username)}/>
        }
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
          return <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre}/>
        }
      }     
    />
        </Switch>
      </div>
    </Router>
    );
  }
}
