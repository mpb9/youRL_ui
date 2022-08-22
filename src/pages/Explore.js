import React, {useState} from 'react';
import {Container, Row, Col, Button} from 'react-bootstrap';
import axios from 'axios';
import Post from './Post';
import Feed from './Feed';
import './Home.css';
import './Form.css';

function Explore({user}) {
  const [inputs, setInputs] = useState({
    name: user,
    link: '',
    posting: false
  });

  const [newPost, setPost] = useState({
    title: '',
    url: '',
    image: '',
    description: ''
  });

  const getLink = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const getPost = (data) => {
    const n1 = 'title';
    const v1 = data.title;
    setPost(values => ({...values, [n1]: v1}));
    const n2 = 'url';
    const v2 = data.url;
    setPost(values => ({...values, [n2]: v2}));
    const n3 = 'image';
    const v3 = data.image;
    setPost(values => ({...values, [n3]: v3}));
    const n4 = 'description';
    const v4 = data.description;
    setPost(values => ({...values, [n4]: v4}));
    const n5 = 'posting';
    const v5 = true;
    setInputs(values => ({...values, [n5]: v5}))
  }

  const PostHandler = (event)  => { 
    event.preventDefault();
    if(inputs.link.length < 1) return;
    axios.post(
      'https://api.linkpreview.net',
      `key=e676560b8697f0ace6eb14828475d882&q=${inputs.link}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    ).then(function (response) {
      console.log(response.data);
      getPost(response.data);
    }).catch(function (error) {
      console.error(error);
    });
  }
  
  if(!inputs.posting){
    return (
    <Container fluid id='explorecontainer'>
        <p style={{padding: '0px', margin:'0px'}}>Hi {user}!</p>
      <Row id='explorerow'>
        <Feed username={inputs.name} />
      </Row>
      <Row fluid id='submitLinkRow'>
        <form  action="#" style={{paddingBottom: '0px', height: 'min-content'}}>
          <h6 style={{paddingTop: '5px'}}>Post:
            <input
              type="text"
              id="smallinput"
              name="link"
              placeholder="Enter your link"
              value={inputs.link || ""}
              onChange={getLink}
            />
          <input style={{marginLeft: '7px'}} type="submit" value="Next" onClick={PostHandler} />
          </h6>
        </form>
      </Row>
    </Container>
    );
  } else {
    return (
      <Post username={inputs.name} preview={newPost}/>
    );  
  }
}

export default Explore;