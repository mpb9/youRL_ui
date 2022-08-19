import React, { useState } from "react";
import axios from "axios";
import { Container, Button } from "react-bootstrap";
import Profile from "./Profile";
import SignUp from "./SignUp";

const PATH = "http://localhost/podfinder/src/user-apis/userlogin.php";

// MESSES UP WHEN REFRESHING THE PAGE & ALREADY LOGGED IN... just shows "Welcome"... user forgotten
//works now!?

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

  const LogoutHandler = (event)  => {   
    event.preventDefault();
    const name = 'loggedin';
    const value = 'Nope';
    setInputs(values => ({...values, [name]: value}))
    const name2 = 'access';
    const value2 = false;
    setInputs(values => ({...values, [name2]: value2}))
  }

  const SignUpHandler = (event)  => {   
    event.preventDefault();
    const name = 'signup';
    const value = true;
    setInputs(values => ({...values, [name]: value}))
  }

   
    
  if(inputs.loggedin === inputs.name && inputs.access === true){
      console.log(inputs.loggedin);
    return(
      <Container>
          Welcome {inputs.name}
          <Profile/>
          <Button onClick={(event) => LogoutHandler(event)}> Logout </Button>        
      </Container>
      );
  } else if(inputs.signup === true){
    return(
      <SignUp/>
    );
  } else if(inputs.loggedin === 'User Not Found' ){
      return(
        <Container >
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
          <br/>
          <h6>Don't have an account?</h6>
          <Button onClick={(event) => SignUpHandler(event)}> Signup </Button>       
      </Container>
      );
    }
  
}

export default Login;