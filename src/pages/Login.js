import React, { useState } from "react";
import axios from "axios";
import { Container, Button, Col, Row } from "react-bootstrap";
import Home from "./Home"
import SignUp from "./SignUp";
import NotLoggedIn from "../helpers/NotLoggedIn";
import youRLheader from "../youRL-header.png";

const USER_LOGIN = "http://youRL.site/youRLapi/user-apis/userlogin.php";

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
    url: `${USER_LOGIN}`,
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
            <Col xs={6} style={{margin: '0 auto', height: '100%', textAlign:'center', padding: '0px'}}>
              <img src={youRLheader} height='100%' alt=""></img>
            </Col>
            <Col xs={3} style={{textAlign: 'right'}}>
            </Col>
          </Row>
          <Row fluid="true" id='bigrow'>
            <Col xs={9} id='medcol'>
              <NotLoggedIn />
            </Col>
            <Col xs={3} id='profile'>
              <h6>User Not Found</h6>
              <form action="#">
                <input type="submit" id="loginBut" value="Log In" onClick={LoginHandler}/>
                <Container id='topLoginCircle'>
                <input type="text" id="loginInput" name="name" placeholder="username" maxLength="30"
                  value={inputs.name || ""} onChange={handleChange} />
                </Container >
                <Container id='bottomLoginCircle'>
                <input type="password" id="loginInput" name="password" autoComplete="on" maxLength="30"
                  placeholder="password" value={inputs.password || ""} onChange={handleChange}></input>

                </Container>

                <br/>
                
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
            <Col xs={6} style={{margin: '0 auto', height: '100%', textAlign:'center', padding: '0px'}}>
              <img src={youRLheader} height='100%' alt=""></img>

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
                <input type="submit" id="loginBut" value="Log In" onClick={LoginHandler}/>
                
                <Container id='topLoginCircle'>
                <input type="text" id="loginInput" name="name" placeholder="username" maxLength="30"
                  value={inputs.name || ""} onChange={handleChange} />
                </Container >
                <Container id='bottomLoginCircle'>
                <input type="password" id="loginInput" name="password" autoComplete="on" maxLength="30"
                  placeholder="password" value={inputs.password || ""} onChange={handleChange}></input>

                </Container>

                <br/>
                
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