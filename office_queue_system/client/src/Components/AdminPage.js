
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {LogoutButton} from '../LoginForm';
import API from '../API';
import {Container, Card,Button, Row,Col,Table, Modal, Form} from 'react-bootstrap';
import { useState} from 'react';


function DeskItem(props){
      const {desk, service} = props
      return(
        <>
      <td>{desk.desk_id}</td>
      <td>{service}</td>                  
      </>
      )
  }

  function ModalForDesks(props) {
    const { fulldesks, desks, onClose, onSave, onDelete, services } = props;
    const [selectedDesk, setSelectedDesk]=useState(1)
    const [selectedService, setSelectedService]=useState(1)

    const handleSubmit = (event) => {
      // stop event default and propagation
      event.preventDefault();
      event.stopPropagation();
  
      onSave(selectedDesk, selectedService);
      window.location.reload();
    };

    const handleDelete =(event)=>{
      event.preventDefault();
      event.stopPropagation();
  
      onDelete(selectedDesk, selectedService);
      window.location.reload();
    }
   
    
    return (
      <div className="cont">
        <Modal show onHide={onClose}>
          <Modal.Header closeButton>
            <Modal.Title>Configure Desks</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleSubmit} >
            <Modal.Body>
              <Form.Group controlId="form-description">
                <Form.Label>Select Desk</Form.Label>
                <Form.Control
                  as="select"
                  name="desk"
                  value={selectedDesk}
                  onChange={(ev) => {
                    setSelectedDesk(parseInt(ev.target.value));
                  }}
                >
                    {[...desks].map((q,index) => {
                    return <option>{q.desk_id}</option>;
                  })}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="form-description">
                <Form.Label>Select Service</Form.Label>
                <Form.Control
                  as="select"
                  name="services"
                  onChange={(ev) => {
                    let serviceId=selectedService
                    for(let i=0;i<services.length;i++){
                      if(services[i].service_name===ev.target.value){
                        serviceId=services[i].service_id
                      }
                    }
                    setSelectedService(serviceId);
                  }}
                >
                    {[...services].map((q,index) => {
                    return <option>{q.service_name}</option>;
                  })}
                </Form.Control>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleDelete}>
                Delete Service
              </Button>
              <Button variant="success" type="submit">
                Add Service
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
    );
  }  


function AdminPage(props) {
    const {desks,services, deskids}=props

    const MODAL = { CLOSED: -2, ADD: -1 };
    const [selectedTask, setSelectedTask] = useState(MODAL.CLOSED);

    const handleClose = () => {
        setSelectedTask(MODAL.CLOSED);
      }

      const handleSaveDesks = (deskId, serviceId) => {
        addDeskService(deskId, serviceId)
        setSelectedTask(MODAL.CLOSED); 
      } 

      function addDeskService (deskId,serviceId)  {
        API.addDeskService(deskId, serviceId).then((err)=>{})
      }

      const handleDeleteDesks = (deskId, serviceId) => {
        deleteDeskService(deskId, serviceId)
        setSelectedTask(MODAL.CLOSED); 
      } 

      function deleteDeskService (deskId,serviceId)  {
        API.deleteServiceOfDesk(deskId, serviceId).then((err)=>{})
      }
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

<Container fluid>
        <div className="AdminCards">
        <Row>
          <Col sm={6}>
        <Card >
            <Card.Body> <Card.Title>Configure Services of Counters</Card.Title>
                <Card.Text>Here you can add and remove possible Services of counters</Card.Text>
                <Button variant="primary" size="lg"  onClick={() => setSelectedTask(MODAL.ADD)}>Start</Button>
                {(selectedTask !== MODAL.CLOSED) && <ModalForDesks fulldesks={desks} desks={deskids} services={services} onSave={handleSaveDesks} onClose={handleClose} onDelete={handleDeleteDesks}></ModalForDesks>}
            </Card.Body>      
        </Card>
        </Col>
        <Col sm={6}>
        <Card >
            <Card.Body> <Card.Title>Configure Services</Card.Title>
                <Card.Text>Here you can add configure(change waiting time) and remove Services</Card.Text>
                <Button variant="primary">Start</Button>
            </Card.Body>      
        </Card>
        </Col>
        </Row>
        <div className="DeskItem">

           <Container fluid>
           <Table striped bordered hover>
  <thead>
    <tr>
      <th>Counter number</th>
      <th>Provided Service</th>
    </tr>
  </thead>
  <tbody>
      {
          desks.map(d => {
            let serviceName=""
            for(let i=0;i<services.length;i++){
                if(d.service_id===services[i].service_id)
                {
                    serviceName=services[i].service_name
                }
            }
            return (
                <>
                <tr>
                <DeskItem desk={d} service={serviceName} />
              </tr>
              </>
            );
          })
      }
  </tbody>
</Table>
              </Container>
            </div>
        </div>  
    </Container>
        
      
       


        </>
        )
      

};




export default AdminPage;

