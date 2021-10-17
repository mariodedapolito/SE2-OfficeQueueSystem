import { Button, Col, Row, Container } from "react-bootstrap";
function SelectServices(props) {
  let services=["Payments","Mail Delivery", "Investiments" ,"Customer Support"]
  const rows = [...Array(Math.ceil(services.length / 2))];
  const serviceRows = rows.map(
    (row, idx) =>
      services.slice(
        idx * 2,
        idx * 2 + 2
      ) /*I split the services array in several arrays which have a length equal to two*/
  );

  const buttonsservice = serviceRows.map((row, index) => {
    return (
      //Each small array will be mapped in Row and buttons.
      <Row key={index} className="justify-content-between">
        {row.map((service) => {
          // The  contents of the small arrays are mapped to buttons
          return (
            <Col xs={6} className="mt-3">
              <Button variant="outline-primary" size="lg" className="p-5">
                {service}
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
      </Container>
    </>
  );
}
export default SelectServices;