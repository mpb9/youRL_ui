import React, { Component, useContext } from 'react';
import {Container, Row, Col, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Home.css'

/*  NEED TO IMPLIMENT useContext (or another hook) in order to 
    return to the homepage with data obtained from login/signup.
    Right now, doesn't redirect back to home page (still at local.../login or /signup w/ Home showing).
    Sending back just the {this.props.name} element doesnt give enough functionality.
*/

class Profile extends Component {

    render(){
        return (
            <Container fluid style={{ margin: '0px', padding: '3px'}}>
                    <Link to='/login'>Login</Link>
                         <br/>
                    <Link to='/signup'>Create Account</Link>
                    <div>{this.props.name}</div>
            </Container>
        );
    }

}

export default Profile;