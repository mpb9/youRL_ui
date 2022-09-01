import React, { useState } from "react";
import axios from "axios";
import { Container, Button, Col, Row } from "react-bootstrap";
import Home from "./Home";
import Login from "./Login";
import './Home.css';
import NotLoggedIn from "../helpers/NotLoggedIn";

const NEW_USER = "http://youRL.site/youRLapi/user-apis/newuser.php";

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
    url: `${NEW_USER}`,
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
            <h6>Username or Email Taken</h6>
            <form action="#">
                <input type="submit" id="loginBut" value="Create Account" onClick={newUserHandler} />
                  
                <Container id='topNewUserCircle'>
                  <input type="text" id="newUserInput" name="name" placeholder="username" maxLength="30"
                  value={inputs.name || ""} onChange={handleChange} />
                </Container>

                <Container id='middleNewUserCircle'>
                  <input type="password" id="newUserInput" name="password" placeholder="password" autoComplete="on" maxLength="30"
                  value={inputs.password || ""} onChange={handleChange} />
                  <br/>
                </Container>

                <Container id='bottomLoginCircle'>
                  <input type="text" id="newUserInput" name="email" placeholder="email" maxLength="50"
                  value={inputs.email || ""} onChange={handleChange} />
                </Container>

                <br/>
                 
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
              <form action="#">
                <input type="submit" id="loginBut" value="Create Account" onClick={newUserHandler} />
                  
                <Container id='topNewUserCircle'>
                  <input type="text" id="newUserInput" name="name" placeholder="username" maxLength="30"
                  value={inputs.name || ""} onChange={handleChange} />
                </Container>

                <Container id='middleNewUserCircle'>
                  <input type="password" id="newUserInput" name="password" placeholder="password" autoComplete="on" maxLength="30"
                  value={inputs.password || ""} onChange={handleChange} />
                  <br/>
                </Container>

                <Container id='bottomLoginCircle'>
                  <input type="text" id="newUserInput" name="email" placeholder="email" maxLength="50"
                  value={inputs.email || ""} onChange={handleChange} />
                </Container>

                <br/>
                 
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