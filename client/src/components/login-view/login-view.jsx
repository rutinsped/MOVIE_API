import React, { useState } from 'react';
import './login-view.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
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
      <form id="login">
                        <small>&nbsp;{this.state.login}</small>
                        <input id="username" type="text" placeholder="username" onChange={this.update}/>
                        <br/>
                        <input id="password" type="password" placeholder="password" onChange={this.update}/>
                        <br/>
                        <div className="wrapper">
                            <span className="group-btn">
                                <a href="#" className="btn btn-primary btn-md" onClick={this.login}>Login&nbsp;
                                    <i className="glyphicon glyphicon-off"></i>
                                </a>
                            </span>
                        </div>
                    </form>
      );
  }