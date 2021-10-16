import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {Table} from 'react-bootstrap';

    /* ticket_id, service_id, desk_id, ticket_time, ticket_status */ 



function QueueTable(props) {

    return (<>
    <div>
        <h1>Queues Situation</h1>
      <Table>
        <thead>
          <tr>
            <th>Service</th>
            <th>Queue Lenght</th>
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
            <td>{c.length}</td>
            </tr>
            </>)
        }
        </tbody>
      </Table>
      </div>
    </>

    /* ticket_id, service_id, desk_id, ticket_time, ticket_status */
  
    );
  }

  export default QueueTable;
