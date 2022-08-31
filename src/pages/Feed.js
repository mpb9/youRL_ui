import React, {useState, useEffect} from 'react';
import ShowPost from '../helpers/ShowPost';
import axios from 'axios';
import './Home.css';
import './Form.css';

const FRIEND_FEED = "https://you-rl.000webhostapp.com/youRLapi/post-apis/feed.php";
const POP_FEED = "https://you-rl.000webhostapp.com/youRLapi/post-apis/popfeed.php";

function Feed({username, friends, incUser, incTitle, incSource, incCaption, search, newSearch}) {
    const [inputs, setInputs] = useState({
      name: username,
      friendFeed: friends,
      filtUser: incUser,
      filtTitle: incTitle,
      filtSource: incSource,
      filtCaption: incCaption,
      query: search,
      newQuery: newSearch,
      posts: []
    });

    // update search query when user clicks 'search'
    useEffect(() => {
      setInputs(values => ({...values, filtUser: incUser}));
      setInputs(values => ({...values, filtTitle: incTitle}));
      setInputs(values => ({...values, filtSource: incSource}));
      setInputs(values => ({...values, filtCaption: incCaption}));
      setInputs(values => ({...values, query: search}));
    }, [newSearch]);
    
    // update feed when user clicks 'friends/popular' OR when new search query added to inputs state
    useEffect(() => {
      updateFeed(inputs.query);
    }, [friends, inputs.query, inputs.filtUser, inputs.filtCaption, inputs.filtSource, inputs.filtTitle]);

    const updateFeed = (updateInfo) =>{
      if(friends){
        axios({
          method: "post",
          url: `${FRIEND_FEED}`,
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
          url: `${POP_FEED}`,
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
    }
    return (
      <section style={{width:'100%', margin: '0 auto', padding:'0px'}}>
        {inputs.posts.map((post) =>
          <ShowPost key={post.id} {...post} />
        )}  
      </section>      
    );
}

export default Feed;