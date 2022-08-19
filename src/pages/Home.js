import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import LoginHandler from './LoginHandler';
import './Home.css'

/*  NEED TO IMPLIMENT useContext (or another hook) in order to 
    return to the homepage with data obtained from login/signup.
    Right now, doesn't redirect back to home page (still at local.../login or /signup w/ Home showing).
    Sending back just the {this.props.name} element doesnt give enough functionality.
*/

function Home() {
    return (
        <Container fluid style={{backgroundColor: 'burlywood', margin: '0px', padding: '0px'}}>
            <Row fluid="true" style={{backgroundColor: 'coral', height: '10vh', margin: '0px', padding:'5px'}}>
                <Col>
                    <p>Make this a NAV BAR</p>
                </Col>
            </Row>
            <Row fluid="true" style={{height: '90vh', width: '100vw', margin: '0px', textAlign: 'center'}}>
                <Col xs={3}>
                    <p>sidebar</p>
                </Col>
                <Col xs={6}>
                    <h3>HOME PAGE</h3>
                </Col>
                <Col xs={3} id='profile'>
                    <LoginHandler/>
                </Col>
            </Row>
        </Container>
    );
}

export default Home;