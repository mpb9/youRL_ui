import React, { useState } from "react";
import axios from "axios";
import { Container, Button, Col, Row } from "react-bootstrap";
import Home from "./Home"
import SignUp from "./SignUp";

const PATH = "http://localhost/podfinder/src/user-apis/userlogin.php";

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
              <h1>Log In</h1>
              <h6>User Not Found</h6>
              <form action="#">
                <label>Username</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  value={inputs.name || ""}
                  onChange={handleChange}
                />
                <br />
                <label>Password</label>
                <input
                  type="text"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={inputs.password || ""}
                  onChange={handleChange}
                ></input>
                <br/>
                <br/>
                <input type="submit" value="Log In" onClick={LoginHandler}
                />
              </form> 
              <br/>
              <h6>Don't have an account?</h6>
              <Button onClick={(event) => SignUpHandler(event)}> Signup </Button>
            </Col>      
          </Row>     
        </Container>
      );  
    } else {
      return(
        <Container fluid style={{backgroundColor: 'burlywood', margin: '0px', padding: '0px'}} >
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
              <h1>Log In</h1>
              <form action="#">
                <label>Username</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  value={inputs.name || ""}
                  onChange={handleChange}
                />
                <br />
                <label>Password</label>
                <input
                  type="text"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={inputs.password || ""}
                  onChange={handleChange}
                ></input>
                <br/>
                <br/>
                <input type="submit" value="Log In" onClick={LoginHandler}
                />
              </form> 
              <br/>
              <h6>Don't have an account?</h6>
              <Button onClick={(event) => SignUpHandler(event)}> Signup </Button>
            </Col>      
          </Row>     
        </Container>
      );  
    }
  
}

export default Login;