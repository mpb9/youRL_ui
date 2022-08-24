import React, {useState, useEffect} from 'react';
import {Container, Row, Col, Button} from 'react-bootstrap';
import axios from 'axios';
import Feed from '../pages/Feed';
import Explore from '../pages/Explore'
import ShowPost from './ShowPost';
import './Post.css';
import '../pages/Home.css';

function Countdown({lastTime, username}) {
  const [minutes, setminutes ] = useState(Math.floor(lastTime % 60));
  const [hours, sethours ] =  useState(Math.floor(lastTime/60));

  const [inputs, setInputs] = useState({
    name: username,
    initialMinute: lastTime,
    initialHour: Math.floor(lastTime/60),
    canPost: false,
    friendFeed: false,
    newSearch: 0,
    lastSearch: ''
  });
  
  const [filter, setFilters] = useState({
    friends: false,
    popular: true,
    user: true,
    userStr: 'user',
    source: true,
    sourceStr: 'source',
    title: true,
    titleStr: 'title',
    caption: true,
    captionStr: 'caption',
    query: ''
  });
  

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

  const showPop = () => {
    setInputs(values => ({...values, friendFeed: false}));
    setFilters(values => ({...values, friends: false}));
    setFilters(values => ({...values, popular: true}));
  }
  const showFriend = () => {
    setInputs(values => ({...values, friendFeed: true}));
    setFilters(values => ({...values, friends: true}));
    setFilters(values => ({...values, popular: false}));
  }
  const getFilters = (event) => {
    event.preventDefault();
    const name = event.target.name;
    if(name === filter.userStr){
      if(filter.user === true){
        setFilters(values => ({...values, [name]: false}));
      } else {
        setFilters(values => ({...values, [name]: true}));
      }
    } else if(name === filter.sourceStr){
      if(filter.source === true){
        setFilters(values => ({...values, [name]: false}));
      } else {
        setFilters(values => ({...values, [name]: true}));
      }
    } else if(name === filter.titleStr){
      if(filter.title === true){
        setFilters(values => ({...values, [name]: false}));
      } else {
        setFilters(values => ({...values, [name]: true}));
      }
    } else {
      if(filter.caption === true){
        setFilters(values => ({...values, [name]: false}));
      } else {
        setFilters(values => ({...values, [name]: true}));
      }
    }
  }
  const searchHandler = (event) => {
    const value = event.target.value;
    setFilters(values => ({...values, query: value}))
  }
  const getSearch = (event) => {
    event.preventDefault();
    const numSearch = inputs.newSearch+1;
    setInputs(values => ({...values, newSearch: numSearch}));
    setInputs(values => ({...values, lastSearch: filter.query}));
  }

  if(!inputs.canPost){
    return (
    <Row id='medrow'>
    <Col xs={4} id='yourstuff'>
      <Row style={{margin:'auto', height:'max-content', paddingBottom:'20px', borderBottom: '1px solid black'}}>
        <Container style={{margin:'0 auto', height:'min-content', padding:'0px'}}>
          <h4 id='youRFeedHeader'>youR Feed</h4>
          <Row style={{margin:'0 auto', paddingBottom:'10px'}}>
            <h5>
              <input name='friend' type='submit' value='Friends' id='friendsFeedBut' 
                style={{ backgroundColor: filter.friends ? '#315c47' : '#8eb1a0'}} onClick={showFriend}/>

              <input name='popular' type='submit' value='Popular' id='popularFeedBut' 
                style={{ backgroundColor: filter.popular ? '#315c47' : '#8eb1a0'}} onClick={showPop}/>
            </h5>
            <Container style={{textAlign:'center', paddingLeft:'8px', paddingTop:'10px'}}>
              <h5>Search Feed:</h5>
              <form action='#'>
                <input type='text' placeholder="Search" value={filter.query || ""} 
                        id='searchInput' onChange={searchHandler}/>

                <h6 style={{marginLeft: '10px', paddingTop:'10px'}}>
                  Filter Results:
                  <br/>
                  <input type='submit' name='user' value='user' id='searchType'
                    style={{ backgroundColor: filter.user ? '#315c47' : '#8eb1a0'}} onClick={getFilters}/>
                  <input type='submit' name='source' value='youRL source' id='searchType'
                    style={{ backgroundColor: filter.source ? '#315c47' : '#8eb1a0'}} onClick={getFilters}/>
                  <input type='submit' name='title' value='title' id='searchType' 
                  style={{ backgroundColor: filter.title ? '#315c47' : '#8eb1a0'}} onClick={getFilters}/>
                  <input type='submit' name='caption' value='caption' id='searchType'
                  style={{ backgroundColor: filter.caption ? '#315c47' : '#8eb1a0'}} onClick={getFilters}/>
                </h6>

                <input style={{marginLeft: '7px'}} type="submit" value="Search" id='postBut' onClick={getSearch} />

              </form>
            </Container>
          </Row>
        </Container>
      </Row>
      <Row style={{margin:'0 auto', height:'min-content', paddingTop:'0px'}}>
        { hours === 0 && minutes === 0
            ? null
            : <div>
                <h3 id='nextyouRLHeader'>Upload Next youRL in: </h3>
                <h1>{hours}hr {minutes < 10 ?  `0${minutes}` : minutes}min</h1>
              </div> 
        }
      </Row>
    </Col>
    <Col xs={8} id='middlecol'>                    
      <Container id='explorecontainer'>
        <Row id='explorerow'>
          <Feed username={inputs.name} friends={inputs.friendFeed} 
              incUser={filter.user} incTitle={filter.title} 
              incSource={filter.source} incCaption={filter.caption}
              search={inputs.lastSearch} newSearch={inputs.newSearch}/>
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