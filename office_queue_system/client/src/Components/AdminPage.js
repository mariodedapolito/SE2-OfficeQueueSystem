
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {LogoutButton} from '../LoginForm';
import API from '../API';
import {Row, Button} from 'react-bootstrap';
import { useState} from 'react';
function AdminPage(props) {
    return (
        <>

<Row>
   <LogoutButton logout={props.logout}/>

<Button style={{ fontSize: 20 }} style={{'position':'absolute' , 'right':'10px'}}onClick={()=>{API.deleteAllTickets().then(props.setRecharged(true)); }}>RESET QUEUES</Button></Row>
        <div className="loginContainer">
        <div className="loginForm" >
       <h2>This is admin page</h2>
        </div>
        </div>
        </>
        )
      

};




export default AdminPage;

