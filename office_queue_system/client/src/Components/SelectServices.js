import { Button, Col, Row, Container, Alert } from "react-bootstrap";
import { useState } from "react";
import API from "../API";

function SelectServices(props) {
  const [ticketIdgenerated, setTicketIdGenerated] = useState(-1);
  const [show, setShow] = useState(false);
  const rows = [...Array(Math.ceil(props.servicesList.length / 2))];
  const serviceRows = rows.map(
    (row, idx) =>
      props.servicesList.slice(
        idx * 2,
        idx * 2 + 2
      ) /*I split the services array in several arrays which have a length equal to two*/
  );

  async function createNewTicket(service_id) {
    setTicketIdGenerated(await API.generateNewTicket(service_id)); //I store the generated tickedID in a state. It's the value returned from the API call
    setShow(true);
  }
  const buttonsservice = serviceRows.map((row, index) => {
    return (
      //Each small array will be mapped in Row and buttons.
      <Row key={index} className="justify-content-between">
        {row.map((service) => {
          // The  contents of the small arrays are mapped to buttons. In this way we'll have always two buttons for row.
          return (
            <Col xs={6} className="mt-3">
              <Button
                onClick={async () => {
                  createNewTicket(service.service_id); //When the customer clicks the button, It will execute an API that creates the ticket id.
                }}
                variant="outline-primary"
                size="lg"
                className="p-5 w-75"
              >
                {service.service_name}
              </Button>
            </Col>
          );
        })}
      </Row>
    );
  });

  return (
    <>
      <Container>
        <h1 className="mt-3" style={{ textAlign: "Center" }}>
          Select your services
        </h1>
        {buttonsservice}
        <Alert show={show} className="mt-5" variant="primary">
          <Alert.Heading style={{ textAlign: "center" }}>
            New Ticket Generated : {ticketIdgenerated}
          </Alert.Heading>
        </Alert>
      </Container>
    </>
  );
}
export default SelectServices;
