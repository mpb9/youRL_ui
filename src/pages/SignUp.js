import React, { Component } from "react";
import axios from "axios";
import { Col, Container, Row } from "react-bootstrap";
import Home from "./Home";

const PATH = "http://localhost/podfinder/src/user-apis/newuser.php";

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name: "",
        email: "",
        password: "",
        loggedin: ""
    };
    this.newUserHandler = this.newUserHandler.bind(this);
  }

  newUserHandler(event) {    
    event.preventDefault();
    axios({
      method: "post",
      url: `${PATH}`,
      headers: { "content-type": "application/json" },
      data: this.state
    })
    .then((result) => {
        console.log(result.data);
        this.setState({
            loggedin: result.data
        });
    })
    .catch((error) => this.setState({ error: error.message }));
  }

  render() {
    if(this.state.loggedin === 'Username Taken' ){

    return(
        <Container></Container>
    );  

    }else if(this.state.loggedin !== ''){
        return(
        <Home name={this.state.loggedin}/>
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
              value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value })}
            />
            <br />
            <label>Email</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
            />
            <br />
            <label>Password</label>
            <input
              type="text"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={this.state.password}
              onChange={(e) => this.setState({password: e.target.value })}
            ></input>
            <br/>
            <input
              type="submit"
              value="Create"
              onClick={(e) => this.newUserHandler(e)}
            />
          </form>
      </Container>
    );
    }
  }
}
