import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import { Button, Col, Container, Row } from "react-bootstrap";
import Home from "./Home";
import Login from "./Login";

const PATH = "http://localhost/podfinder/src/user-apis/userlogin.php";

// MESSES UP WHEN REFRESHING THE PAGE & ALREADY LOGGED IN... just shows "Welcome"... user forgotten
//works now!?

function Profile() {
    return(
    <Container >
        <h2>User Profile</h2>    
    </Container>
    );
       
  
}

export default Profile;