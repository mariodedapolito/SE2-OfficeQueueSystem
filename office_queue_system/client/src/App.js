// Stile CSS

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch,Link } from 'react-router-dom';
import {  Button} from 'react-bootstrap';
import {LoginForm,LogoutButton} from './LoginForm';
import API from './API';
import Modal from 'react-bootstrap/Modal'

function BLogin(){
 return(<>
<Button style={{fontSize: 20}}variant={"light"} ><Link to="/login">Login</Link></Button>
</>
);}
 



function App() {
const [show, setShow] = useState(false);
const [message,setMessage]=useState('');
const [me,setMe]=useState('');
const [admin,setAdmin]=useState('');
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);


/*USEFFECT LOGIN*/
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await API.getUserInfo();
        
      } catch (err) {
        console.error(err.error);
      }
    };
    checkAuth();
  }, []);
 const doLogIn = async (credentials) => {
    try {
      const user = await API.logIn(credentials);
     
     
      handleShow();
      setMessage({ msg: `Welcome, ${user.name}!`, type: 'success' });
      setMe('');
     
       setAdmin(`${user.admin}`);
    } catch (err) {
     
      setMe('Password and/or email are not correct');
    }
  }


  const doLogOut = async () => {
    await API.logOut();
    
   
   
    
  }

return (
  <Router>

 {/* Modale di benvenuto */}
        <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body> {message.msg}</Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
        
        <Switch>
          
            <Route path="/login" render={()=><LoginForm me={me}login={doLogIn} admin={admin} />}/>
             <Route path="/admin" render={()=><LogoutButton logout={doLogOut}/>}/>
               <Route path="/officer" render={()=><LogoutButton logout={doLogOut}/>}/>

           <Route path="/" render={()=><BLogin/>}/>

        </Switch>

  </Router>
    
  );
}

export default App;