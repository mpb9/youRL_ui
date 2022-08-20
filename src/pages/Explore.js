import React, {useState} from 'react';
import {Container, Row, Col, Button} from 'react-bootstrap';
import axios from 'axios';
import './Home.css';

/*  NEED TO IMPLIMENT useContext (or another hook) in order to 
    return to the homepage with data obtained from login/signup.
    Right now, doesn't redirect back to home page (still at local.../login or /signup w/ Home showing).
    Sending back just the {this.props.name} element doesnt give enough functionality.
*/

function Explore({user}) {
    const [inputs, setInputs] = useState({
        name: user
    });
    
    const options = {
      method: 'GET',
      url: 'https://spotify-scraper.p.rapidapi.com/v1/search',
      params: {term: 'Blank Check', type: 'podcast'},
      headers: {
        'X-RapidAPI-Key': '8685977163mshffbaa9ce06eb336p1a2ce2jsn608c0c90cd0a',
        'X-RapidAPI-Host': 'spotify-scraper.p.rapidapi.com'
      }
    };

    axios.request(options).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });
    
    return (
    <Container fluid id='explorecontainer'>
        <p>Hi {user}! Explore Pods:</p>
    </Container>
    );
}

export default Explore;