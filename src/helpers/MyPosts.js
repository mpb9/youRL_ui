import React, {useState, useEffect} from 'react';
import {Container, Row, Col, Button} from 'react-bootstrap';
import ShowMyPosts from './ShowMyPosts';
import axios from 'axios';
import '../pages/Home.css';
import '../pages/Form.css';

const PATH = "http://localhost/mediashare/src/post-apis/myposts.php";

function MyPosts({username}) {
    const [inputs, setInputs] = useState({
      name: username,
      posts: []
    });

    useEffect(() => {
      getFeed();
    }, []);

    const getFeed = () => {
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
      <Container style={{width: 'inherit', margin: 'auto', padding: '7px', height: '65%'}}>
        <h6 style={{backgroundColor:'#464d45', color:'#bcd5b8', width: 'inherit', marginBottom: '0px', paddingBottom: '2px'}}>{inputs.name}RLs</h6>
        <Row id='mypostrow'>
          <section style={{width:'100%', margin: 'auto', padding:'0px'}}>
            {inputs.posts.map((post) =>
              <ShowMyPosts key={post.id} {...post} />
            )}  
          </section>    
        </Row>  
      </Container>
    );
}

export default MyPosts;