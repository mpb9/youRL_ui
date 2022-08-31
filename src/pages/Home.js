import React, {useState} from 'react';
import {Container, Row, Col, Button} from 'react-bootstrap';
import Profile from './Profile';
import './Home.css';
import Login from './Login';
import Explore from './Explore';

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
        <Container fluid id='bigcontainer'>
            <Row fluid="true" id='navrow'>
                <Col xs={3} style={{margin:'auto', textAlign:'center'}}>
                </Col>
                <Col xs={6} style={{textAlign: 'center'}}>
                    <h2>youRL</h2>
                </Col>
                <Col xs={3} style={{textAlign: 'right'}}>
                    <Button id='logoutBut' onClick={(event) => LogoutHandler(event)}> Logout </Button>
                </Col>
            </Row>
            <Row fluid="true" id='bigrow'>
                <Col xs={9} id='medcol'>
                    <Explore user={username} isPosting={false} />
                </Col>
                <Col xs={3} id='profile'>
                    <Profile user={username}/>
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