import React, {useState, useEffect} from 'react';
import {Container, Row, Col, Button, NavLink} from 'react-bootstrap';
import axios from 'axios';
import './Post.css';
import '../pages/Profile.css'

const PATH = "http://localhost/mediashare/src/user-apis/publicprofile.php";
const FOLLOW = "http://localhost/mediashare/src/user-apis/follows.php";
const ALTFOLLOW = "http://localhost/mediashare/src/user-apis/alterfollow.php";
const LIKE = "http://localhost/mediashare/src/post-apis/like.php";
const COMMENT = "http://localhost/mediashare/src/post-apis/comment.php";
const NEWCOMMENT = "http://localhost/mediashare/src/post-apis/addcomment.php";

function ShowPost({id, viewer, poster, title, url, img, likes, comments, caption}) {
  
  const [posterProfile, setPosterProfile] = useState({
    user: viewer,
    name: poster,
    postid: id,
    show: false,
    follows: 'follow',
    showComments: false,
    commentPage: [],
    likeCount: likes,
    comCount: comments,
    newComment: '',
    data: []
  });

  useEffect(() => {
  }, [posterProfile.likeCount, posterProfile.comCount]);

  const getProfile = (event) => {
    event.preventDefault();
    axios({
      method: "post",
      url: `${PATH}`,
      headers: { "content-type": "application/json" },
      data: posterProfile
    })
    .then((result) => {
      setPosterProfile(values => ({...values, data: result.data}));
      setPosterProfile(values => ({...values, show: true}));

      axios({
        method: "post",
        url: `${FOLLOW}`,
        headers: { "content-type": "application/json" },
        data: posterProfile
      })
      .then((result) => {
        setPosterProfile(values => ({...values, follows: result.data}));
      })
      .catch((error) => {
        console.log(error);
      });

    })
    .catch((error) => {
      console.log(error);
    });
  }

  const followHandler = (event) => {
    event.preventDefault();
    axios({
      method: "post",
      url: `${ALTFOLLOW}`,
      headers: { "content-type": "application/json" },
      data: posterProfile
    })
    .then((result) => {
      setPosterProfile(values => ({...values, follows: result.data}));
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const likeHandler = (event) => {
    event.preventDefault();
    axios({
      method: "post",
      url: `${LIKE}`,
      headers: { "content-type": "application/json" },
      data: posterProfile
    })
    .then((result) => {
      if(result.data) {
        const liked = parseInt(posterProfile.likeCount)+1;
        setPosterProfile(values => ({...values, likeCount: liked}));
      } else {
        const liked = parseInt(posterProfile.likeCount)-1;
        setPosterProfile(values => ({...values, likeCount: liked}));
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }
  
  const commentPage = (event) => {
    event.preventDefault();
    axios({
      method: "post",
      url: `${COMMENT}`,
      headers: { "content-type": "application/json" },
      data: posterProfile
    })
    .then((result) => {
      setPosterProfile(values => ({...values, commentPage: result.data}));
      setPosterProfile(values => ({...values, showComments: true}));
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const noComments = (event)=>{
    event.preventDefault();
    setPosterProfile(values => ({...values, showComments: false}));
  }

  const getFeed = (event) => {
    event.preventDefault();
    setPosterProfile(values => ({...values, show: false}));
  }

  const handleComment = (event) => {
    const value = event.target.value;
    setPosterProfile(values => ({...values, newComment: value}))
  }

  const addComment = (event) => {
    event.preventDefault();
    axios({
      method: "post",
      url: `${NEWCOMMENT}`,
      headers: { "content-type": "application/json" },
      data: posterProfile
    })
    .then((result) => {
      const commented = parseInt(posterProfile.comCount)+1;
      setPosterProfile(values => ({...values, comCount: commented}));
      setPosterProfile(values => ({...values, newComment: ''}));

      axios({
        method: "post",
        url: `${COMMENT}`,
        headers: { "content-type": "application/json" },
        data: posterProfile
      })
      .then((result) => {
        setPosterProfile(values => ({...values, commentPage: result.data}));
      })
      .catch((error) => {
        console.log(error);
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }
  
  if(posterProfile.show){
    return(
      <Container id='profCont'>     
        <Row style={{margin: 'auto'}}>
          <Col xs={7} style={{padding: '2px',  paddingLeft: '7px', paddingRight: '7px', margin: '0 auto'}}>
            <Row style={{margin: 'auto', textAlign: 'left'}}>
              <input type='submit' value='Go Back' id='link' onClick={getFeed}/>
            </Row>
            <Row style={{margin: 'auto', height:'fit-content', backgroundColor:'#bcd5b8', borderRadius:'3px'}}>
              <Row style={{margin: 'auto', height:'40%'}}>
                <Col xs={5} style={{padding: '3px', textAlign: 'left'}}>
                  <img id='pubProPic' alt="User Image"/>
                  <input type='submit' value={posterProfile.follows} id='followBut' onClick={followHandler}/>
                </Col>
                <Col xs={7} style={{ padding: '2px', margin: 'auto'}}>
                  <h6 style={{paddingTop:'0px', marginBottom: '0px', fontSize: '110%'}}>{posterProfile.data.fullname}</h6>
                  <h6 style={{paddingTop:'0px', fontSize:'90%'}}>{posterProfile.name}</h6> 
                </Col>
              </Row>
              <Row style={{margin: 'auto', height:'60%'}}>
                  <Row style={{ textAlign: 'left', marginBottom:'0px', marginTop:'5px', height:'100%'}}>
                    <p>bio</p>
                  </Row>
              </Row>
            </Row>
          </Col>
          <Col xs={5} style={{ margin: '0 auto', paddingRight: '7px',  padding: '2px'}}>
            <h6>{posterProfile.data.date} <Button id='pubLink' onClick={() => window.open(url)}>Link</Button></h6>
            
              <img id='postImg' src={posterProfile.data.img} alt="Couldn't Generate"/>
              <h6 style={{paddingTop:'5px'}}>{posterProfile.data.title}</h6>  
              <p id='pubProCaption'>
                {posterProfile.data.caption}
              </p>
          </Col>
        </Row>
      </Container>
    );
  } else if(posterProfile.showComments){
    return(
      <Container id='postCont'>     
        <Row style={{margin: 'auto'}}>
          <Col xs={5} style={{textAlign: 'center', paddingTop: '5px'}}>
            <img id='postImg' src={img} alt="Couldn't Generate"/>
            <h5 style={{paddingTop:'5px'}}>{title}</h5>  
            <Button id='link' onClick={() => window.open(url)}>Open Link</Button>
          </Col>
          <Col xs={7} style={{ margin: 'auto', textAlign: 'left', paddingTop:'5px'}}>
            <p id='caption'>
              <input type='submit' value={poster} id='userLink' onClick={getProfile}/>
              {caption}
            </p>
            <Button id='link' onClick={likeHandler}>{posterProfile.likeCount} Likes</Button>
            <Button id='link' onClick={noComments}>Hide Comments</Button>
          </Col>
        </Row>
        <Row style={{margin: '0 auto', paddingTop: '2px'}}>
          <section style={{width:'100%', margin: '0 auto', padding:'0px'}}>
            {(posterProfile.commentPage).map((coms) =>
              <Col key={coms.id} style={{ margin: '0px', textAlign: 'left'}}>
                  <p id='comments'>
                    <input type='submit' value={coms.commenter} id='userLink'/>
                    {coms.comment}
                  </p>
              </Col>
            )}  
          </section>  
        </Row>
        <Row style={{margin:'0 auto', padding:'10px'}}>
          <form action='#'style={{margin:'0 auto', padding:'0px'}} >
            <textarea id='commentInput' type='text' placeholder="Comment" value={posterProfile.newComment || ""} onChange={handleComment} />
            <br/>
            <input id='commentBut' style={{margin: 'auto'}} type="submit" value="Comment" onClick={addComment} />
          </form>
        </Row>
      </Container>
    );
  } else {
    return (
    <Container id='postCont'>     
      <Row style={{margin: 'auto'}}>
        <Col xs={5} style={{textAlign: 'center', paddingTop: '5px'}}>
          <img id='postImg' src={img} alt="Couldn't Generate"/>
          <h5 style={{paddingTop:'5px'}}>{title}</h5> 
          <Button id='link' onClick={() => window.open(url)}>Open Link</Button> 
        </Col>
        <Col xs={7} style={{ margin: 'auto', textAlign: 'left', paddingTop:'5px'}}>
          <p id='caption'>
            <input type='submit' value={poster} id='userLink' onClick={getProfile}/>
            {caption}
          </p>
          <Button id='link' onClick={likeHandler}>{posterProfile.likeCount} Likes</Button>
          <Button id='link' onClick={commentPage}>{posterProfile.comCount} Comments</Button>
        </Col>
      </Row>
    </Container>
    );
  }
}

export default ShowPost;