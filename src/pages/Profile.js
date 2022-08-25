import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import { Button, Col, Container, Row } from "react-bootstrap";
import './Profile.css';
import MyPosts from "../helpers/MyPosts";

const PATH = "http://localhost/mediashare/src/user-apis/userinfo.php";
const NEWPROPIC = "http://localhost/mediashare/src/user-apis/upload.php";
const CHANGEIMG = "http://localhost/mediashare/src/user-apis/newprofileimg.php";


function Profile({user}) {
  const [inputs, setInputs] = useState({
    name: user,
    edit: false,
    imgpath: ''
  });
  const [info, setInfo] = useState({
    email: '',
    fullname: '',
    bio: '',
    img: ''
  });
  const [img, setImg] = useState({});

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

  useEffect(() => {
      axios({
        method: "post",
        url: `${CHANGEIMG}`,
        headers: { "content-type": "application/json" },
        data: inputs
      })
      .then((result) => {
        console.log(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
    setInfo(values => ({...values, img: inputs.imgpath}));
  }, [inputs.imgpath]);

  const EditHandler = (event)  => {   
    event.preventDefault();
    const name2 = 'edit';
    const value2 = true;
    setInputs(values => ({...values, [name2]: value2}))
  }

  const imgHandler = (event) => {
    const value = event.target.files;
    setImg(values => ({...values, ...value}));
  }
  const addImg = (event) => {
    event.preventDefault();
    const imgData = new FormData();
    imgData.append("file[]", img[0]);
    axios({
      method: "post",
      url: `${NEWPROPIC}`,
      headers: {  "content-type": 'multipart/form-data' },
      data: imgData
    })
    .then((result) => {
      console.log(result.data);
      setInputs(values => ({...values, imgpath: result.data}));
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const bioHandler = (event) => {
    const value = event.target.value;
    setInfo(values => ({...values, bio: value}))
  }
  const nameHandler = (event) => {
    const value = event.target.value;
    setInfo(values => ({...values, fullname: value}))
  }
  const emailHandler = (event) => {
    const value = event.target.value;
    setInfo(values => ({...values, email: value}))
  }
  const DoneEditingHandler = (event)  => {   
    event.preventDefault();
    console.log(info);
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
          <h6 style={{fontSize: '12px'}}>{info.bio}</h6>
        </Row>
        <MyPosts username={inputs.name}/>
      </Container>
    );
  } else {
    // Use form from SignUp or something to edit everything
    return(
      <Container style={{ padding:'5px', width:'100%', margin: 'auto'}}>
          <h4>Edit: {user}</h4>
          <form action='#' style={{width:'90%',  margin:'auto'}}>
            <h6>Profile Picture</h6> 
            <input type="file" name="file" id="fileInput" onChange={imgHandler} />
            <input id='fileUpload' type="submit" name="submit" value="Upload" onClick={addImg}/>
          </form>
          <form action='#' style={{width:'90%', margin:'auto'}}>
            <h6>Full Name</h6>
            <input type="text" id="editNameInput" placeholder="Enter name" value={info.fullname || ""} onChange={nameHandler}/>
            <h6>Email</h6>
            <input type="text" id="editNameInput" placeholder="Enter name" value={info.email || ""} onChange={emailHandler}/>
            <h6>Bio</h6>     
            <textarea id='editBioInput' type='text' placeholder="bio" value={info.bio || ""} onChange={bioHandler} /> 
            
            <Button id='nvmBut' onClick={(event) => DoneEditingHandler(event)}> Cancel </Button>
            <Button id='editBut' onClick={(event) => DoneEditingHandler(event)}> Done </Button>
          </form>
      </Container>
    );
  }
    
}

export default Profile;