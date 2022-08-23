import React, {useState, useEffect} from 'react';
import {Container, Row, Col, Button} from 'react-bootstrap';
import axios from 'axios';
import Post from './Post';
import Feed from './Feed';
import Countdown from '../helpers/Countdown';
import './Home.css';
import './Form.css';

const PATH = "http://localhost/mediashare/src/user-apis/lastuserpost.php";

function Explore({user, isPosting}) {
  const [inputs, setInputs] = useState({
    name: user,
    link: '',
    posting: isPosting,
    lastPost: 0
  });

  const [newPost, setPost] = useState({
    title: '',
    url: '',
    image: '',
    description: ''
  });

  useEffect(() => {
    canUserPost();
  }, []);

  const canUserPost = () => {
    axios({
      method: "post",
      url: `${PATH}`,
      headers: { "content-type": "application/json" },
      data: inputs
    })
    .then((result) => {
      console.log(result.data);
      if(result.data !== true) {
        const currTime = new Date().getTime();
        const tempVal = new Date(result.data).getTime();
        const name = 'lastPost';
        const value = 1440 - Math.floor(((currTime - tempVal)/1000)/60);
        setInputs(values => ({...values, [name]: value}));
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

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

  
  if(!inputs.posting && inputs.lastPost < 5){
    console.log(inputs.lastPost);
    return (
    <Row id='medrow'>
      <Col xs={4} id='yourstuff'>
        <p style={{padding: '0px', margin:'0px'}}>Hi {user}!</p>
        <Row id='submitLinkRow'>
          <form  action="#" style={{padding: '5px', height: 'min-content'}}>
            <h6 style={{paddingTop: '5px'}}>Post:
              <input
                type="text"
                id="smallinput"
                name="link"
                placeholder="Enter your link"
                size='12'
                value={inputs.link || ""}
                onChange={getLink}
              />
            </h6>
            <input style={{marginLeft: '7px'}} type="submit" value="Go" onClick={PostHandler} />

          </form>
        </Row>
      </Col>
      <Col xs={8} id='middlecol'>                    
        <Container id='explorecontainer'>
          <Row id='switchfeedrow'>
          </Row>
          <Row id='explorerow'>
            <Feed username={inputs.name} />
          </Row>
        </Container>
      </Col>
    </Row>
    );
  } else if (inputs.lastPost>5){
    console.log(inputs.lastPost);
    return (
      <Countdown lastTime={inputs.lastPost} username={inputs.name} />
    );
  }else if(inputs.posting) {
    return (      
      <Post username={inputs.name} preview={newPost}/>
    );  
  }
}

export default Explore;