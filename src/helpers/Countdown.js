import React, {useState, useEffect} from 'react';
import {Container, Row, Col, Button} from 'react-bootstrap';
import axios from 'axios';
import Feed from '../pages/Feed';
import Explore from '../pages/Explore'
import ShowPost from './ShowPost';
import './Post.css';
import '../pages/Home.css';

const PATH = "http://localhost/mediashare/src/post-apis/feed.php";

function Countdown({lastTime, username}) {
  const [inputs, setInputs] = useState({
    name: username,
    initialMinute: lastTime,
    initialHour: Math.floor(lastTime/60),
    canPost: false
  });
  const [minutes, setminutes ] = useState(Math.floor(lastTime % 60));
  const [hours, sethours ] =  useState(Math.floor(lastTime/60));

  useEffect(()=>{
    let myInterval = setInterval(() => {
      if (minutes > 0) {
        setminutes(minutes - 1);
      }
      if (minutes === 0) {
        if (hours === 0) {
          clearInterval(myInterval)
          const name = 'canPost';
          const value = true;
          setInputs(values => ({...values, [name]: value}));
        } else {
          sethours(hours - 1);
          setminutes(59);
        }
      } 
    }, 60000)
      return ()=> {
        clearInterval(myInterval);
      };
    });

    if(!inputs.canPost){
      return (
      <Row id='medrow'>
      <Col xs={4} id='yourstuff'>
        <div style={{paddingTop: '5px'}}>
          { hours === 0 && minutes === 0
              ? null
              : <h4>Next Post: {hours}:{minutes < 10 ?  `0${minutes}` : minutes}</h4> 
          }
        </div>
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
    
    } else {
      return (
        <Explore user={inputs.name} isPosting={false}/>
      );
    }
}

export default Countdown;