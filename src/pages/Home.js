import React, {useState} from 'react';
import {Container, Row, Col, Button} from 'react-bootstrap';
import Profile from './Profile';
import './Home.css';
import Login from './Login';

/*  NEED TO IMPLIMENT useContext (or another hook) in order to 
    return to the homepage with data obtained from login/signup.
    Right now, doesn't redirect back to home page (still at local.../login or /signup w/ Home showing).
    Sending back just the {this.props.name} element doesnt give enough functionality.
*/

function Home({username}) {
    const [inputs, setInputs] = useState({
        name: username,
        access: true
    });

    const LogoutHandler = (event)  => {   
        event.preventDefault();
        const name2 = 'access';
        const value2 = false;
        setInputs(values => ({...values, [name2]: value2}))
    }
    
    if(inputs.access){
        return (
        <Container fluid style={{backgroundColor: 'burlywood', margin: '0px', padding: '0px'}}>
                <Row fluid="true" style={{backgroundColor: 'coral', height: '10vh', margin: '0px', padding:'5px'}}>
                    <Col>
                        <p>Make this a NAV BAR</p>
                    </Col>
                </Row>
                <Row fluid="true" style={{height: '90vh', width: '100vw', margin: '0px', textAlign: 'center'}}>
                    <Col xs={3} id='yourstuff'>
                        <p>YOUR PODCASTS</p>
                    </Col>
                    <Col xs={6}>
                        <h3>HOME PAGE</h3>
                    </Col>
                    <Col xs={3} id='profile'>
                        <Profile user={username}/>
                        <Button onClick={(event) => LogoutHandler(event)}> Logout </Button>
                    </Col>
                </Row>
        </Container>
        );
    } else {
        return(
            <Login/>
        );
    }
    
}

export default Home;