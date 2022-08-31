import React, { useState } from "react";
import axios from "axios";
import { Container, Button, Col, Row } from "react-bootstrap";
import Home from "./Home"
import SignUp from "./SignUp";
import NotLoggedIn from "../helpers/NotLoggedIn";

const PATH = "http://localhost/mediashare/src/user-apis/userlogin.php";

function Login() {

  const [inputs, setInputs] = useState({
    name: '',
    password: '',
    access: false,
    loggedin: 'Nope',
    signup: false
  });


  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const LoginHandler = (event)  => {    
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

  const SignUpHandler = (event)  => {   
    event.preventDefault();
    const name = 'signup';
    const value = true;
    setInputs(values => ({...values, [name]: value}))
  }

   
    
  if(inputs.loggedin === inputs.name && inputs.access === true){
    return(
          <Home username={inputs.loggedin}/>
      );
  } else if(inputs.signup === true){
      return(
        <SignUp/>
      );
  } else if(inputs.loggedin === 'User Not Found' ){
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
              <h3>Log In</h3>
              <h6>User Not Found</h6>
              <form action="#">
                <label>Username</label>
                <input
                  type="text"
                  id="newUserInput"
                  name="name"
                  placeholder="Enter name"
                  value={inputs.name || ""}
                  onChange={handleChange}
                />
                <br />
                <label>Password</label>
                <input
                  type="password"
                  id="newUserInput"
                  name="password"
                  autoComplete="on"
                  placeholder="Enter password"
                  value={inputs.password || ""}
                  onChange={handleChange}
                ></input>
                <br/>
                <br/>
                <input type="submit" id="postBut" value="Log In" onClick={LoginHandler}
                />
              </form> 
              <br/>
              <h6>Don't have an account?</h6>
              <Button id="switchBut" onClick={(event) => SignUpHandler(event)}> Signup </Button>
            </Col>      
          </Row>     
        </Container>
      );  
    } else {
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
              <h4>Log In</h4>
              <form action="#">
                <label>Username</label>
                <input
                  type="text"
                  id="newUserInput"
                  name="name"
                  placeholder="Enter name"
                  value={inputs.name || ""}
                  onChange={handleChange}
                />
                <br />
                <label>Password</label>
                <input
                  type="password"
                  id="newUserInput"
                  name="password"
                  autoComplete="on"
                  placeholder="Enter password"
                  value={inputs.password || ""}
                  onChange={handleChange}
                ></input>
                <br/>
                <br/>
                <input type="submit" id="postBut" value="Log In" onClick={LoginHandler}
                />
              </form> 
              <br/>
              <h6>Don't have an account?</h6>
              <Button id="switchBut" onClick={(event) => SignUpHandler(event)}> Signup </Button>
            </Col>      
          </Row>     
        </Container>
      );  
    }
  
}

export default Login;