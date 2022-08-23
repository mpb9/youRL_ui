import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import { Button, Col, Container, Row } from "react-bootstrap";
import './Profile.css';
import MyPosts from "../helpers/MyPosts";

const PATH = "http://localhost/mediashare/src/user-apis/userinfo.php";

function Profile({user}) {
  const [inputs, setInputs] = useState({
    name: user,
    edit: false
  });
  const [info, setInfo] = useState({
    email: '',
    fullname: ''
  });

  useEffect(() => {
    axios({
      method: "post",
      url: `${PATH}`,
      headers: { "content-type": "application/json" },
      data: inputs
    })
    .then((result) => {
      setInfo(values => ({...values, ['email']: result.data.email}));
      setInfo(values => ({...values, ['fullname']: result.data.fullname}));
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);

  const EditHandler = (event)  => {   
    event.preventDefault();
    const name2 = 'edit';
    const value2 = true;
    setInputs(values => ({...values, [name2]: value2}))
  }
  const DoneEditingHandler = (event)  => {   
    event.preventDefault();
    const name2 = 'edit';
    const value2 = false;
    setInputs(values => ({...values, [name2]: value2}))
  }

  if(!inputs.edit){
    return(
      <Container style={{ padding:'5px', width:'100%', height:'100%', margin: 'auto'}}>
        <Row style={{padding:'0px', height:'35%', width:'100%', margin: 'auto'}}>
          <h4>{user} 
            <Button id='editBut' onClick={(event) => EditHandler(event)}> Edit </Button>
          </h4>
          <p style={{fontSize: '12px'}}>{info.email}</p>
          <h6 style={{fontSize: '12px'}}>{info.fullname}</h6>
        </Row>
        <MyPosts username={inputs.name}/>
      </Container>
    );
  } else {
    // Use form from SignUp or something to edit everything
    return(
      <Container style={{ padding:'5px', width:'100%', margin: 'auto'}}>
          <h4>Edit: {user}</h4>
          <p>Some editing stuff</p>
          <Button id='editBut' onClick={(event) => DoneEditingHandler(event)}> Done </Button>
      </Container>
    );
  }
    
}

export default Profile;