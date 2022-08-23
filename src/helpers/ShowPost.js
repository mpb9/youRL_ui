import React, {useState, useEffect} from 'react';
import {Container, Row, Col, Button, NavLink} from 'react-bootstrap';
import axios from 'axios';
import './Post.css';

const PATH = "http://localhost/mediashare/src/post-apis/feed.php";

function ShowPost({poster, title, url, img, caption}) {
    
    return (
    <Container id='postCont'>     
      <Row style={{margin: 'auto'}}>
        <Col xs={5} style={{textAlign: 'center', paddingTop: '5px'}}>
          <img id='postImg' src={img} alt="Couldn't Generate"/>
        </Col>
        <Col xs={6} style={{ margin: 'auto', paddingTop:'5px'}}>
          <h6>{title}</h6>  
          <Button id='link' onClick={() => window.open(url)}>Open Link</Button>
        
        </Col>
      </Row>
      <Row style={{margin: 'auto', textAlign:'left', padding:'10px', paddingTop: '15px'}}>
        <h6 id='poster' >{poster}</h6>
        <p id='caption'>{caption}</p>
      </Row>
      <Row style={{margin: 'auto'}}>

      </Row>
      
    </Container>
    );
}

export default ShowPost;