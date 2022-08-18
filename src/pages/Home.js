import React, { Component, useContext } from 'react';
import '../App.css';
import {Container, Row, Col, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';

/*  NEED TO IMPLIMENT useContext (or another hook) in order to 
    return to the homepage with data obtained from login/signup.
    Right now, doesn't redirect back to home page (still at local.../login or /signup w/ Home showing).
    Sending back just the {this.props.name} element doesnt give enough functionality.
*/

class Home extends Component {

    render(){
        return (
            <Container  style={{backgroundColor: 'burlywood',margin: '0px'}}>
                <Row style={{backgroundColor: 'coral', height: 'fit-content', margin: '0px', padding:'5px'}}>
                    <p>Make this a NAV BAR</p>
                    <Link to='/login'>Login</Link>
                    <Link to='/signup'>Create Account</Link>

                </Row>
                <Container style={{backgroundColor: 'burlywood', height: '500px', margin: '0px', padding:'0px'}}>
                    <h1>HOME PAGE</h1>
                    <div>{this.props.name}</div>
                </Container>
            </Container>
        );
    }

}

export default Home;