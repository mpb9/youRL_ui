import React, {useState, useEffect} from 'react';
import {Container, Row, Col, Button} from 'react-bootstrap';
import ShowPost from '../helpers/ShowPost';
import axios from 'axios';
import './Home.css';
import './Form.css';

const PATH = "http://localhost/mediashare/src/post-apis/feed.php";

function Feed({username}) {
    const [inputs, setInputs] = useState({
      name: username,
      posts: []
    });

    useEffect(() => {
      getFeed(inputs.name);
    }, []);

    const getFeed = (user) => {
      console.log(user);
      axios({
        method: "post",
        url: `${PATH}`,
        headers: { "content-type": "application/json" },
        data: inputs
      })
      .then((result) => {
        const name = 'posts';
        const value = result.data;
        setInputs(values => ({...values, [name]: value}));
      })
      .catch((error) => {
        console.log(error);
      });
    }
    
    return (
      <section style={{width:'100%', margin: 'auto', padding:'0px'}}>
        {inputs.posts.map((post) =>
          <ShowPost key={post.id} {...post} />
        )}  
      </section>      
    );
}

export default Feed;