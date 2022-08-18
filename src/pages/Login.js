import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import { Col, Container, Row } from "react-bootstrap";
import Home from "./Home";

const PATH = "http://localhost/podfinder/src/user-apis/userlogin.php";

// MESSES UP WHEN REFRESHING THE PAGE & ALREADY LOGGED IN... just shows "Welcome"... user forgotten
//works now!?

function Login() {

    const [inputs, setInputs] = useState({
        name: '',
        password: '',
        access: false,
        loggedin: 'Nope'
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
    
    if(inputs.loggedin === 'User Not Found' ){
    return(
      <Container>User Not Found</Container>
    );  
    }else if(inputs.loggedin === inputs.name && inputs.access === true){
        console.log(inputs.loggedin);
      return(
        <Container>
            Welcome {inputs.name}
        </Container>
        );
    } else {
    return(
      <Container >
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
            <input
              type="submit"
              value="Log In"
              onClick={LoginHandler}
            />
          </form>        
      </Container>
      );
    }
  
}

export default Login;