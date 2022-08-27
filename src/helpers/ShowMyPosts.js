import React, {useState, useEffect} from 'react';
import {Container, Row, Col, Button, NavLink} from 'react-bootstrap';
import axios from 'axios';
import './Post.css';

function ShowMyPosts({poster, title, url, img, caption, date}) {
    
    return (
    <Container id='myPostCont'> 
      <Row id='myDays'>
        <h6 style={{padding:'0px', marginBottom:'1px', color:'black'}}>{date}</h6>
      </Row>    
      <Row style={{margin: 'auto'}}>
        <Col xs={12} style={{textAlign: 'center', margin: 'auto', paddingTop: '5px'}}>
          <img id='myImg' src={img} alt="Couldn't Generate"/>
        </Col>
        
      </Row>
      <Row style={{margin: 'auto', textAlign:'center', padding:'10px', paddingBottom:'0px'}}>
        <h6>{title} <Button id='myLink' onClick={() => window.open(url)}>Link</Button></h6>  
      </Row>
      <Row style={{margin: 'auto', textAlign:'left', paddingLeft: '10px', paddingRight:'10px'}}>
      <p id='myCaption'>{caption}</p>

      </Row>
      
    </Container>
    );
}

export default ShowMyPosts;