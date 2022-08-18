import React, { useReducer, useContext, Children } from 'react';
import {Container, Row, Col, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Login from './Login';
import './Home.css'

/*  NEED TO IMPLIMENT useContext (or another hook) in order to 
    return to the homepage with data obtained from login/signup.
    Right now, doesn't redirect back to home page (still at local.../login or /signup w/ Home showing).
    Sending back just the {this.props.name} element doesnt give enough functionality.
*/

const initialState = {show: "login"}  

function reducer(state, action) {
switch (action.type) {
    case 'loggedin':
        return {show: "loggedin"};
    case 'signup':
        return {show: "signup"};
    case 'login':
        return initialState(action.payload);
    default:
        throw new Error();
}
}

function Profile() {
    const [state, dispatch] = useReducer(reducer, initialState);

    switch (state.show){
        case 'loggedin':
            return (
                <Container fluid style={{ margin: '0px', padding: '3px'}}>
                    loggedin
                </Container>
            );
        case 'signup':
            return (
                <Container fluid style={{ margin: '0px', padding: '3px'}}>
                    signup
                </Container>
            );
        case 'login':
            return (
                <Container fluid style={{ margin: '0px', padding: '3px'}}>
                    <Login/>
                </Container>
            );
        default:
            throw new Error();
    }

}

export default Profile;