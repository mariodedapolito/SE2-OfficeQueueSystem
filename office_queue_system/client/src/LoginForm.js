import { Form, Button, Alert, Col, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import { useState } from 'react';
import{ Redirect,Link } from 'react-router-dom';
function LoginForm(props) {
    const [username, setUsername] = useState('giulia.rocca@office.it');
    const [password, setPassword] = useState('officeworker');
    const [errorMessage, setErrorMessage] = useState('');
    

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrorMessage('');
        
        const credentials = { username, password };

        
        let valid = true;
        if(username === '' || password === '' || password.length < 6)
            valid = false;
        
        if(valid)
        {
          props.login(credentials);
          
          
        }
        else {
          
          setErrorMessage('Password and/or email are not correct')
        }
    };
  


    return (
        <>
            {/* Visualizzazione del form */}
            <br />
            {!props.logged?
            <Form className="ml-auto mr-auto d-lg-block" style={{ width: '450px', height: '50px' }}>
                {errorMessage ? <Alert variant='danger'>{errorMessage}</Alert> :<></>}
                
                <Form.Group controlId='username'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email' value={username} onChange={ev => setUsername(ev.target.value)} />
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' value={password} onChange={ev => setPassword(ev.target.value)} />
                </Form.Group>
                <ToggleButtonGroup type="checkbox" >
                    <ToggleButton variant='primary' onClick={handleSubmit}>Login</ToggleButton>
                </ToggleButtonGroup>

            </Form>:<>{props.officersList.find(s=>(s.username===username))?<Redirect to="/officer"/>:<Redirect to="/admin"/>}</>}
        </>)}

    function LogoutButton(props) {
        return (
            <Col>
                <Button variant={"light"}style={{fontSize: 20}} onClick={props.logout}><Link to="/">Logout</Link></Button>
            </Col>
        )
    }

    export { LoginForm, LogoutButton };