import React, { useState } from "react";
import axios from "axios";
import { Container, Button } from "react-bootstrap";
import Profile from "./Profile";
import Login from "./Login";

const PATH = "http://localhost/podfinder/src/user-apis/newuser.php";

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

    const LogoutHandler = (event)  => {   
        event.preventDefault();
        const name = 'loggedin';
        const value = 'Nope';
        setInputs(values => ({...values, [name]: value}))
        const name2 = 'access';
        const value2 = false;
        setInputs(values => ({...values, [name2]: value2}))
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
        <Container>
            Welcome {inputs.name}
            <Profile/>
          <Button onClick={(event) => LogoutHandler(event)}> Logout </Button>   
        </Container>
        );
    } else if(inputs.login === true){
        return(
          <Login/>
        );   
    }else if(inputs.loggedin === 'Taken' ){
        return(
        <Container >
            <h1>Create Account</h1>
            <h6>Username or Email Taken</h6>
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
                <label>Email</label>
                <input
                type="text"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={inputs.email || ""}
                onChange={handleChange}
                ></input>
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
                <input
                type="submit"
                value="Create"
                onClick={newUserHandler}
                />
            </form>
            <br/>
            <h6>Already have an account?</h6>
            <Button onClick={(event) => LoginHandler(event)}> Login </Button>
        </Container>
        );  

    } else {

    return (
      <Container >
            <h1>Create Account</h1>
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
            <label>Email</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={inputs.email || ""}
              onChange={handleChange}
            ></input>
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
            <input
              type="submit"
              value="Create"
              onClick={newUserHandler}
            />
        </form>
        <br/>
        <h6>Already have an account?</h6>
        <Button onClick={(event) => LoginHandler(event)}> Login </Button>
      </Container>
    );
    
  }
}

export default SignUp;