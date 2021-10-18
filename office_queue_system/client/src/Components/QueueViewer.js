import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {Table} from 'react-bootstrap';
import {Col,Row} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import Notification from "./Notification";

    /* ticket_id, service_id, desk_id, ticket_time, ticket_status */ 



function QueueTable(props) {

    return (<>
    <Notification />
    <div className={"pt-5"}>
      <Row>
      </Row>
      <Row>
        <Col>
        <Link to={"/"} >
                    <Button className="btn btn-secondary d-block my-2 mx-auto py-2 px-5">Go back</Button>
                </Link>
        </Col>
        <Col>
        <h1>Queues Situation</h1>
    
      <Table>
        <thead>
          <tr>
            <th>Service</th>
            <th>Queue Length</th>
            <th>Called tickets</th>
          </tr>
        </thead>
        <tbody>{
         /*
         props.exams.map((ex) => 
          <>
            <td>{ex[0].serviceId}</td>
            <td>{ex.lenght}</td> 
          </>)*/
          /* NOTE: exam={{...ex, name: (the above expression)}} could be a quicker (and dirtier) way to add the .name property to the exam, instead of passing the examName prop */
            

            props.queues.map((c) => <>
            <tr>
            <td>{c[0].service_id}</td>
            <td>{c.filter(element => element.ticket_status==="waiting").length + 1}</td>
            <td>
                {c.find(element => element.ticket_status === "called") ?
                    'Ticket ' + c.find(element => element.ticket_status === "called").ticket_id + ' go to desk ' + c.find(element => element.ticket_status === "called").desk_id
                    :
                    'None'
                }
            </td>
            </tr>
            </>)
        }
        </tbody>
      </Table>
      </Col>
      <Col>
      </Col>
      </Row>
      </div>
    </>

    /* ticket_id, service_id, desk_id, ticket_time, ticket_status */
  
    );
  }

  export default QueueTable;
