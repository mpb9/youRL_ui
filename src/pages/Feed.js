import React, {useState, useEffect} from 'react';
import {Container, Row, Col, Button} from 'react-bootstrap';
import ShowPost from '../helpers/ShowPost';
import axios from 'axios';
import './Home.css';
import './Form.css';

const FRIENDFEED = "http://localhost/mediashare/src/post-apis/feed.php";
const POPFEED = "http://localhost/mediashare/src/post-apis/popfeed.php";

function Feed({username, friends, filters}) {
    const [inputs, setInputs] = useState({
      name: username,
      friendFeed: friends,
      filts: filters,
      posts: []
    });

    useEffect(() => {
      if(friends){
        axios({
          method: "post",
          url: `${FRIENDFEED}`,
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
      } else {
        axios({
          method: "post",
          url: `${POPFEED}`,
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
    }, [friends]);
    
    return (
      <section style={{width:'98%', margin: 'auto', padding:'0px'}}>
        {inputs.posts.map((post) =>
          <ShowPost key={post.id} {...post} />
        )}  
      </section>      
    );
}

export default Feed;