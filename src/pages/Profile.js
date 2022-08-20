import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import { Button, Col, Container, Row } from "react-bootstrap";

const PATH = "http://localhost/podfinder/src/user-apis/userlogin.php";

// MESSES UP WHEN REFRESHING THE PAGE & ALREADY LOGGED IN... just shows "Welcome"... user forgotten
//works now!?

function Profile({user}) {
  return(
    <Container >
      <h3>{user}'s Profile</h3>    
    </Container>
  );
    
}

export default Profile;