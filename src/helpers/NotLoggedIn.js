import React, {useState} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import Feed from '../pages/Feed';
import './Post.css';
import '../pages/Home.css';

function NotLoggedIn() {

  const [inputs, setInputs] = useState({
    name: 'anonymous',
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

  return (
    <Row id='medrow'>
    <Col xs={4} id='yourstuff'>
      <Row style={{margin:'auto', height:'max-content', paddingBottom:'20px', borderBottom: '2px solid black'}}>
        <Container style={{margin:'0 auto', height:'min-content', padding:'0px'}}>
          <h4 id='youRFeedHeader'>youR Feed</h4>
          <Row style={{margin:'0 auto', paddingBottom:'10px'}}>
            
            <Container style={{textAlign:'center', paddingLeft:'8px', paddingTop:'10px'}}>
              <h5>Search Feed:</h5>
              <form action='#'>
                <input type='text' placeholder="search" value={filter.query || ""} 
                        id='searchInput' onChange={searchHandler}/>

                <h6 style={{marginLeft: '10px', paddingTop:'10px', paddingBottom:'10px'}}>
                  Including:
                  <br/>
                  <input type='submit' name='user' value='users' id='searchType'
                    style={{ backgroundColor: filter.user ? '#2297ff' : '#ff8903'}} onClick={getFilters}/>
                  <input type='submit' name='source' value='sources' id='searchType'
                    style={{ backgroundColor: filter.source ? '#2297ff' : '#ff8903'}} onClick={getFilters}/>
                  <input type='submit' name='title' value='titles' id='searchType' 
                  style={{ backgroundColor: filter.title ? '#2297ff' : '#ff8903'}} onClick={getFilters}/>
                  <input type='submit' name='caption' value='captions' id='searchType'
                  style={{ backgroundColor: filter.caption ? '#2297ff' : '#ff8903'}} onClick={getFilters}/>
                </h6>

                <input style={{marginLeft: '7px', fontWeight:'500'}} type="submit" value="Search" id='postBut' onClick={getSearch} />

              </form>
            </Container>
          </Row>
        </Container>
      </Row>
      <Row style={{margin:'auto', height:'max-content'}}>
        <Container style={{margin:'0 auto', height:'min-content', padding:'0px'}}>
          <h4 id='youRFeedHeader'>About</h4>
          <Row style={{margin:'0 auto', paddingBottom:'10px'}}>
            
            <Container style={{textAlign:'left', paddingLeft:'20px', paddingRight: '20px', paddingTop:'10px'}}>
              <h6 style={{margin:'0 auto', paddingBottom: '3px'}}>Media Sharing Platform</h6>
              <li style={{paddingLeft: '8px', lineHeight:'110%'}}><span>Share links with others</span></li> 
              <li style={{paddingLeft: '8px', lineHeight:'110%'}}><span>Find new articles and content</span></li> 
              <h6 style={{margin:'0 auto', paddingBottom: '3px', paddingTop: '9px'}}>Daily Posting Limits</h6>
              <li style={{paddingLeft: '8px', lineHeight:'110%'}}><span>Post youRLs once a day</span></li> 
              <li style={{paddingLeft: '8px', lineHeight:'110%'}}><span>Allows you to track your top daily Internet content</span></li> 
              <h6 style={{margin:'0 auto', paddingBottom: '3px', paddingTop: '9px'}}>Connect with Communities</h6>
              <li style={{paddingLeft: '8px', lineHeight:'110%'}}><span>Personalized "Friends" feed</span></li>
              <li style={{paddingLeft: '8px', lineHeight:'110%'}}><span>Search for users, sources, and topics</span></li> 
            </Container>
          </Row>
        </Container>
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
  
  
}

export default NotLoggedIn;