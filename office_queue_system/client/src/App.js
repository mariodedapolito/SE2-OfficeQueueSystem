
import './App.css';
import { BrowserRouter as Router, Redirect, Route, Switch, Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import{Container, Button} from 'react-bootstrap'
import {React} from 'react'
import AdminPage from './Components/AdminPage'

function App() {
  return (
    <Router>
    <Container fluid > 
    <Switch>
    <Route path="/admin"> 
    <AdminPage/>
    </Route>
    <Route path="/"> 
    <h3>This is the main page</h3>
    <Link variant="link" to="/admin" >Go to the admin page</Link>
    </Route>
   <Redirect to="/"/>
    </Switch>
  </Container>
  </Router>
  );
}

export default App;
