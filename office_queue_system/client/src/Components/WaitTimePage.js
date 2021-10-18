import "../App.css";
import { Alert, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from 'react';
import API from "../API";

function WaitTimePage(props) {

    const [calculate, setCalculate] = useState(false);
    const [ticketNumber, setTicketNumber] = useState("");
    const [waitingTime, setWaitingTime] = useState("");
    const [ticketErrorMessage, setTicketErrorMessage] = useState("");
    const [serverErrorMessage, setServerErrorMessage] = useState("");

    useEffect(() => {
        if (!calculate) {
            return;
        }
        const getData = async () => {
            try {

                setCalculate(false);
                setWaitingTime("");
                setTicketErrorMessage("");
                setServerErrorMessage("");

                const ticket = await API.getTicketStatus(ticketNumber);
                if (!ticket) {
                    setTicketErrorMessage("This ticket does not exist");
                    return;
                }
                if (ticket.ticket_status === "called") {
                    setTicketErrorMessage("This ticket is now being served");
                    return;
                }
                if (ticket.ticket_status === "served") {
                    setTicketErrorMessage("This ticket has already been served");
                    return;
                }

                const services = await API.getallServices();

                const neededService = services.find(element => element.service_id === ticket.service_id);

                const queue = await API.getQueueByService(neededService.service_id);

                const desksServicesTmp = (await API.getallServicesPerDesk(ticket.desk_id)).sort((a,b)=>(a.desk_id-b.desk_id));
                let desksServices = [];
                let currentService = -1;
                let currentIndex = -1;
                desksServicesTmp.forEach(element => {
                    if (element.desk_id !== currentService) {
                        currentIndex++;
                        currentService = element.desk_id;
                        desksServices.push(new Array());
                        desksServices[currentIndex].push(element);
                    }
                    else {
                        desksServices[currentIndex].push(element);
                    }
                });

                let waitTime = neededService.service_time;

                const numPeopleInQueue = queue.filter(element => (element.ticket_id < ticket.ticket_id && element.ticket_status === "waiting")).length;

                let denominator = 0;
                desksServices.forEach(element => {
                    const deskNumServices = element.length;
                    if (element.find(el => el.service_id === neededService.service_id)) {
                        denominator += 1 / deskNumServices;
                    }
                });

                waitTime *= numPeopleInQueue / denominator + 1 / 2;

                setWaitingTime(waitTime);
            }
            catch (error) {
                console.error(error);
                setServerErrorMessage("Oops! Something went wrong and could not retrieve system data. Try again later!");
            }
        }
        getData();
    }, [calculate]);

    return (
        <Row className="mt-5">
            <Col className="col-xl-4">
                <Link to={"/"} onClick={() => { setServerErrorMessage(""); setTicketErrorMessage(""); setTicketNumber(""); setCalculate(false); }}>
                    <Button className="btn btn-secondary d-block my-2 mx-auto py-2 px-5">Go back</Button>
                </Link>
            </Col>
            <Col className="col-xl-4 text-center">
                <div>
                    <h2 className="mx-auto">Waiting time calculator</h2>
                    <hr></hr>
                </div>
                <div className="my-5">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon3">Insert your ticket number</span>
                        </div>
                        <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3" value={ticketNumber} onChange={(event) => (setTicketNumber(event.target.value.trim()))} />
                    </div>

                    <button className="btn btn-primary p-3 px-5" onClick={() => (setCalculate(true))}>Calculate</button>
                    <br />
                    {ticketErrorMessage ?
                        <Alert className="my-3" variant='danger'>{ticketErrorMessage}</Alert>
                        :
                        ''
                    }
                </div>
                {waitingTime !== "" ?
                    <div>
                        <label>Approximate waiting time:</label>
                        <h3>{parseInt(waitingTime)} minutes {parseInt((waitingTime - parseInt(waitingTime)) * 60)} seconds</h3>
                    </div>
                    :
                    ''
                }
                {serverErrorMessage ?
                    <Alert className="my-3" variant='danger'>{serverErrorMessage}</Alert>
                    :
                    ''
                }
            </Col>
            <Col className="col-xl-4" />
        </Row>
    );

}

export { WaitTimePage };
