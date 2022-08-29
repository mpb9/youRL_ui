import React, { useState } from "react";
import axios from "axios";
import { Container, Button, Col, Row } from "react-bootstrap";
import Home from "./Home";
import Login from "./Login";
import './Home.css';
import NotLoggedIn from "../helpers/NotLoggedIn";

const PATH = "https://localhost/mediashare/src/user-apis/newuser.php";

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
        <Col xs={3} style={{margin:'auto', textAlign:'center'}}>
        </Col>
        <Col xs={6} style={{textAlign: 'center'}}>
            <h2>youRL</h2>
        </Col>
        <Col xs={3} style={{textAlign: 'right'}}>
        </Col>
      </Row>
      <Row fluid="true" id='bigrow'>
        <Col xs={9} id='medcol'>
          <NotLoggedIn />
        </Col>
        <Col xs={3} id='profile'>
            <h3>Create Account</h3>
            <h6>Username or Email Taken</h6>
            <form action="#">
              <label>Username</label>
              <input type="text" id="newUserInput" name="name" placeholder="Enter your name"
                value={inputs.name || ""} onChange={handleChange} />
              <br />
              <label>Password</label>
              <input type="password" id="newUserInput" name="password" placeholder="Enter your password"
                value={inputs.password || ""} onChange={handleChange} />
              <br/>
              <label>Email</label>
              <input type="text" id="newUserInput" name="email" placeholder="Enter your email"
                value={inputs.email || ""} onChange={handleChange} />
              <br />
              <br/>
                <input type="submit" id="postBut" value="Create" onClick={newUserHandler} />
            </form>
            <br/>
            <h6>Already have an account?</h6>
            <Button id="switchBut" onClick={(event) => LoginHandler(event)}> Login </Button>
        </Col>
      </Row>
    </Container>
    );  
  } else {
    return (
      <Container fluid id='bigcontainer'>
        <Row fluid="true" id='navrow'>
          <Col xs={3} style={{margin:'auto', textAlign:'center'}}>
          </Col>
          <Col xs={6} style={{textAlign: 'center'}}>
              <h2>youRL</h2>
          </Col>
          <Col xs={3} style={{textAlign: 'right'}}>
          </Col>
        </Row>
        <Row fluid="true" id='bigrow'>
          <Col xs={9} id='medcol'>
            <NotLoggedIn />
          </Col>
          <Col xs={3} id='profile'>
              <h3>Create Account</h3>
              <form action="#">
                <label>Username</label>
                <input type="text" id="newUserInput" name="name" placeholder="Enter your name"
                value={inputs.name || ""} onChange={handleChange} />
                <br />
                <label>Password</label>
                <input type="password" id="newUserInput" name="password" placeholder="Enter your password"
                value={inputs.password || ""} onChange={handleChange} />
                <br/>
                <label>Email</label>
                <input type="text" id="newUserInput" name="email" placeholder="Enter your email"
                value={inputs.email || ""} onChange={handleChange} />
                <br />
                <br/>
                <input type="submit" id="postBut" value="Create"
                onClick={newUserHandler} />
              </form>
              <br/>
              <h6>Already have an account?</h6>
              <Button id="switchBut" onClick={(event) => LoginHandler(event)}> Login </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default SignUp;