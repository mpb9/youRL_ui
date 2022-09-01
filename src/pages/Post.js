import React, {useState} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import axios from 'axios';
import Explore from './Explore';
import './Home.css';
import './Form.css';

const NEW_POST = "https://you-rl.000webhostapp.com/youRLapi/post-apis/newpost.php";
// post doesnt include: time or tags

function Post({username, preview}) {
  const [inputs, setInputs] = useState({
    name: username,
    title: preview.title,
    url: preview.url,
    image: preview.image,
    description: preview.description,
    posted: false
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const cancelPost = (event) => {
    const name = 'posted';
    const value = true;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    axios({
      method: "post",
      url: `${NEW_POST}`,
      headers: { "content-type": "application/json" },
      data: inputs
    })
    .then((result) => {
      const name = 'posted';
      const value = true;
      setInputs(values => ({...values, [name]: value}));
    })
    .catch((error) => {
      console.log(error);
    });
  }

  
  if(!inputs.posted){
    return (
    <Row  id='medrow'>
    <Col xs={4} id='yourstuff'>
      <input style={{marginTop: '7px'}} id="submitBut" type="submit" value="Cancel Post" onClick={cancelPost} />
    </Col>
    <Col xs={8} id='middlecol'>
      <Container fluid id='explorecontainer'>
        <h3>Your Post</h3>
        <form onSubmit={handleSubmit}>
        <Row style={{margin: 'auto'}}>
          <Col xs={8} style={{textAlign: 'left', paddingTop:'3px'}}>
            <h6 style={{overflow: 'hidden', marginBottom: '0px'}}>URL:</h6>
            <p style={{overflowX: 'hidden', marginTop: '0px', marginBottom: '15px', color: '#4c4c4c'}}>{inputs.url}</p>
            <h6>Title: 
              <input id='titleinput' type='text' name='title' maxLength="80" value={inputs.title} onChange={handleChange} />
            </h6>
          </Col>
          <Col xs={4} style={{margin: 'auto', overflow: 'hidden'}}>
            <img id='previewimg' src={inputs.image} alt="Couldn't Auto-Generate"/>
          </Col>
        </Row>
        <Row style={{margin: 'auto', textAlign:'left', padding:'10px', paddingTop: '0px'}}>
          <h6 style={{marginLeft:'-10px'}}>Caption: </h6>
          <textarea id='captioninput' type='text' name='description' maxLength="300" value={inputs.description} onChange={handleChange} />
        </Row>
        <Row style={{textAlign: 'center', padding:'10px'}}>
          <input id='submitBut' style={{margin: 'auto'}} type="submit" value="Post" onClick={handleSubmit} />
          <h6 style={{paddingTop: '5px'}}>{inputs.name}</h6>
        </Row>
        </form>
      </Container>
    </Col>
    </Row>
    );
  
  } else {
    return (
      <Explore user={inputs.name} isPosting={false}/>
    );
  }
}

export default Post;