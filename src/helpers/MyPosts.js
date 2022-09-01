import React, {useState, useEffect} from 'react';
import {Container, Row } from 'react-bootstrap';
import ShowMyPosts from './ShowMyPosts';
import axios from 'axios';
import '../pages/Home.css';
import '../pages/Form.css';

const MY_POSTS = "https://you-rl.000webhostapp.com/youRLapi/post-apis/myposts.php";

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
        url: `${MY_POSTS}`,
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
        <h6 style={{backgroundColor:'#2297ff', border:'2px solid black', color:'black', width: 'inherit', marginBottom: '0px', paddingBottom: '2px'}}>{inputs.name}RLs</h6>
        <Row id='mypostrow'>
          <section style={{width:'100%', margin: '0 auto', padding:'0px'}}>
            {inputs.posts.map((post) =>
              <ShowMyPosts key={post.id} {...post} />
            )}  
          </section>    
        </Row>  
      </Container>
    );
}

export default MyPosts;