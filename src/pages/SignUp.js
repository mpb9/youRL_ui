import React, { useState } from "react";
import axios from "axios";
import { Container, Button, Col, Row } from "react-bootstrap";
import Home from "./Home";
import Login from "./Login";

const PATH = "http://localhost/mediashare/src/user-apis/newuser.php";

// NOT GOOD
function SignUp() {

    const [inputs, setInputs] = useState({
        name: '',
        password: '',
        email: '',
        access: false,
        loggedin: 'Nope',
        login: false
    });

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const newUserHandler = (event) => {    
        event.preventDefault();
        axios({
        method: "post",
        url: `${PATH}`,
        headers: { "content-type": "application/json" },
        data: inputs
        })
        .then((result) => {
            console.log(result.data);
            const name = 'loggedin';
            const value = result.data;
            setInputs(values => ({...values, [name]: value}))
            inputs.access = true;
        })
        .catch((error) => {
            const name = 'error';
            const value = error.message;
            setInputs(values => ({...values, [name]: value}))
        });
    }
    
    const LoginHandler = (event)  => {   
    event.preventDefault();
    const name = 'login';
    const value = true;
    setInputs(values => ({...values, [name]: value}))
    }

    if(inputs.loggedin === inputs.name && inputs.access === true){
        console.log(inputs.loggedin);
        return(
            <Home username={inputs.loggedin}/>
        );
    } else if(inputs.login === true){
        return(
          <Login/>
        );   
    }else if(inputs.loggedin === 'Taken' ){
        return(
        <Container fluid id='bigcontainer'>
          <Row fluid="true" id='navrow'>
            <Col>
              <p>Make this a NAV BAR</p>
            </Col>
          </Row>
          <Row fluid="true" id='bigrow'>
            <Col xs={3} id='yourstuff'>
              <p>TOP PUBLIC GROUPS</p>
            </Col>
            <Col xs={6}>
              <h3>DEFAULT HOME PAGE</h3>
            </Col>
            <Col xs={3} id='profile'>
                <h3>Create Account</h3>
                <h6>Username or Email Taken</h6>
                <form action="#">
                  <label>Username</label>
                  <input type="text" id="name" name="name" placeholder="Enter your name"
                  value={inputs.name || ""} onChange={handleChange} />
                  <br />
                  <label>Email</label>
                  <input type="text" id="email" name="email" placeholder="Enter your email"
                  value={inputs.email || ""} onChange={handleChange} />
                  <br />
                  <label>Password</label>
                  <input type="password" id="password" name="password" placeholder="Enter your password"
                  value={inputs.password || ""} onChange={handleChange} />
                  <br/>
                  <input type="submit" value="Create"
                  onClick={newUserHandler} />
                </form>
                <br/>
                <h6>Already have an account?</h6>
                <Button onClick={(event) => LoginHandler(event)}> Login </Button>
            </Col>
          </Row>
        </Container>
        );  

    } else {

    return (
        <Container fluid id='bigcontainer'>
        <Row fluid="true" id='navrow'>
          <Col>
            <p>Make this a NAV BAR</p>
          </Col>
        </Row>
        <Row fluid="true" id='bigrow'>
          <Col xs={3} id='yourstuff'>
            <p>TOP PUBLIC GROUPS</p>
          </Col>
          <Col xs={6}>
            <h3>DEFAULT HOME PAGE</h3>
          </Col>
          <Col xs={3} id='profile'>
              <h3>Create Account</h3>
              <form action="#">
                  <label>Username</label>
                  <input type="text" id="name" name="name" placeholder="Enter your name"
                  value={inputs.name || ""} onChange={handleChange} />
                  <br />
                  <label>Email</label>
                  <input type="text" id="email" name="email" placeholder="Enter your email"
                  value={inputs.email || ""} onChange={handleChange} />
                  <br />
                  <label>Password</label>
                  <input type="password" id="password" name="password" placeholder="Enter your password"
                  value={inputs.password || ""} onChange={handleChange} />
                  <br/>
                  <input type="submit" value="Create"
                  onClick={newUserHandler} />
              </form>
              <br/>
              <h6>Already have an account?</h6>
              <Button onClick={(event) => LoginHandler(event)}> Login </Button>
          </Col>
        </Row>
      </Container>
    );
    
  }
}

export default SignUp;