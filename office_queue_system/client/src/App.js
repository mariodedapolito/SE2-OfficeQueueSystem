// Stile CSS

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch,Link } from 'react-router-dom';
import {Row,Alert, Button} from 'react-bootstrap';
import {LoginForm,LogoutButton} from './LoginForm';
import { WaitTimePage } from './Components/WaitTimePage';
import API from './API';
import Modal from 'react-bootstrap/Modal'
import AdminPage from './Components/AdminPage.js'
import officer from './Officer';
import MenuBar from './Components/MenuBar.js'
import HomePage from './Components/HomePage';

import QueueTable from './Components/QueueViewer.js'




function BLogin(){
 return(<>
<Button style={{fontSize: 20}}variant={"light"} ><Link to="/login">Login</Link></Button>
</>
);}
 

let group=[]; 

function App() {
const [show, setShow] = useState(false);
const [message,setMessage]=useState('');
const handleClose = () => setShow(false); 
const handleShow = () => setShow(true);
const [logged,setLogged]=useState(false);

/* OFFICERS LIST STRUCTURE */
const [officersList,setOfficersList]=useState([]);


/* QUEUE DATA STRUCTURE */
const [queue, setQueue] = useState([]);







useEffect(() => {
  const getQueues = async () => {
    const q = await API.getAllQueues();
    setQueue(q);
  };
  getQueues().catch(err => {setMessage("impossible to load your queue! please try again later..");
  console.error(err);
  console.error(message);
});
},[] );


 /* USEFFECT OFFICERS*/
  useEffect(()=>{
    const functest=()=>{
    API.getallOfficers().then(data=>{
      data.forEach((x) => {
     group.push(new officer(x.officer_id,x.desk_id,x.username));
        
                 });
      let temp=[...group];
      
      group=[]; 
     
      setOfficersList(temp);
     
   
    })};  functest();
 
  },[]);
 



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
      setLogged(true);
      handleShow(); 
      setMessage({ msg: `Hello, ${user}!`, type: 'success' });
      
    } catch (err) {
    
      setMessage({ msg: err, type: 'danger' });
    }
  }


  const doLogOut = async () => {
    await API.logOut();
     setLogged(false);
  }

return (
  <Router>
           <MenuBar />

  {message.type === "danger" && <Row className="ml-auto mr-auto d-lg-block" style={{ width: '450px', height: '50px' }}>
        <Alert variant={message.type} onClose={() => setMessage('')} dismissible>{message.msg}</Alert>
      </Row>}
 {/* Modale di benvenuto */}
        <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Welcome</Modal.Title>
        </Modal.Header>
        <Modal.Body> {message.msg}</Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
        
        <Switch>
          
              <Route path="/login" render={()=><LoginForm login={doLogIn} officersList={officersList} logged={logged} />}/>
              <Route path="/admin" render={()=><LogoutButton logout={doLogOut}/>}/>
              <Route path="/officer" render={()=><LogoutButton logout={doLogOut}/>}/>
              <Route path="/queues" render={()=><QueueTable queues = {queue}/>}/>
              <Route path="/waitingTime" render={() => <WaitTimePage />} />

           <Route path="/" render={()=><BLogin/>}/>

        </Switch>

  </Router>
    
  );
}

export default App;
