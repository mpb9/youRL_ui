import React, { Component } from 'react';
import '../App.css';

class Admin extends Component {

    render(){
        return (
            <body>
                <h1>Site Management</h1>
                <ul>
                    <li><a href="http://localhost/podfinder/src/admin/users/">Manage Users</a></li>
                    <li><a href="../">Return to Main Site</a></li>
                </ul>
            </body>
            
        );
    }

}

export default Admin;