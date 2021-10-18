// Stile CSS

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { Row, Alert, Button } from "react-bootstrap";
import { LoginForm, LogoutButton } from "./LoginForm";
import { WaitTimePage } from "./Components/WaitTimePage";
import API from "./API";
import Modal from "react-bootstrap/Modal";
import AdminPage from "./Components/AdminPage.js";
import { officer, service, services_desks } from "./Officer";
import OfficerPage from "./Components/OfficerPage";
import MenuBar from "./Components/MenuBar.js";
import HomePage from "./Components/HomePage";
import SelectServices from "./Components/SelectServices";

import QueueTable from "./Components/QueueViewer.js";

function BLogin() {
  return (
    <>
      <Button style={{ fontSize: 20 }} variant={"light"}>
        <Link to="/login">Login</Link>
      </Button>
      <Button style={{ fontSize: 20 }} variant={"light"}>
        <Link to="/queues">Queues</Link>
      </Button>
      <Button style={{ fontSize: 20 }} variant={"light"}>
        <Link to="/waitingTime">Waiting time calculator</Link>
      </Button>
    </>
  );
}

let group = [];
let g = [];
let t = [];
function App() {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [logged, setLogged] = useState(false);
  const [username, setUsername] = useState("");
  const [recharged,setRecharged]=useState(true);
  /* LIST STRUCTURES */
  const [officersList, setOfficersList] = useState([]);

  const [servicesList, setServicesList] = useState([]);

  const [servicesDList, setServicesDList] = useState([]);

  const [waiting, setWaiting] = useState([]);
/* ADMIN PART */
const [loading, setLoading]=useState(true)//this for checking the loading at mount
const [dirty, setDirty] =useState(true)
const[deskList, setDeskList]= useState([])
const [deskIds, setDeskIds]=useState([])
const [servicesForDesk, setServicesForDesk]=useState([])
  /* QUEUE DATA STRUCTURE */
  const [queue, setQueue] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const updateRech=(x)=>{setRecharged(x)};

  useEffect(() => {
  const getQueues = async () => {
    const q = await API.getAllQueues();
    setQueue(q);
   setRecharged(false);
  };
      if(recharged){
  getQueues().catch(err => {setMessage("impossible to load your queue! please try again later..");
  console.error(err);
  console.error(message);}
  );}
  },[recharged] );

  /* USEFFECT OFFICERS*/
  useEffect(() => {
    const functest = () => {
      API.getallOfficers().then((data) => {
        data.forEach((x) => {
          group.push(new officer(x.officer_id, x.desk_id, x.username));
        });
        let temp = [...group];

        group = [];

        setOfficersList(temp);
      });
    };
    functest();
  }, []);
  /* USEFFECT SERVICES*/
  useEffect(() => {
    const func = () => {
      API.getallServices().then((data) => {
        data.forEach((x) => {
          g.push(new service(x.service_id, x.service_name, x.service_time));
        });
        let t = [...g];

        g = [];

        setServicesList(t);
      });
    };
    func();
  }, []);
  /*USEFFECT WAITING TICKETS*/
  useEffect(() => {
    const getW = async () => {
      const q = await API.getWaitingTickets();
      setWaiting(q);
    };
    getW().catch((err) => {
      setMessage(
        "impossible to load your Waiting tickets! please try again later.."
      );
      console.error(err);
      console.error(message);
    });
  }, []);

  /* USEFFECT SERVICES PER DESKS*/
  useEffect(() => {
    const fu = () => {
      API.getallServicesPerDesk().then((data) => {
        data.forEach((x) => {
          t.push(new services_desks(x.desk_id, x.service_id));
        });
        let te = [...t];

        t = [];

        setServicesDList(te);
      });
    };
    fu();
  }, []);
  
  /*USEFFECT ADMIN*/
useEffect(() => {
  if(dirty){
    API.getDesks().then(newDesk=>{
      setDeskList(newDesk)
      setDirty(false)
      setLoading(false)
     })
     API.getAllServicesInfo().then(newServiceForDesk=>{
      setServicesForDesk(newServiceForDesk)
      setDirty(false)
      setLoading(false)
     })
     API.getDeskIds().then(newDeskId=>{
      setDeskIds(newDeskId)
      setDirty(false)
      setLoading(false)
     })
    }
  }, [dirty,loading])

  /*USEFFECT LOGIN*/
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await API.getUserInfo();
      } catch (err) {
        console.error(err.error);
      }
    };
    if (officersList.length) checkAuth();
  }, [officersList.length]);

  const doLogIn = async (credentials) => {
    try {
      const user = await API.logIn(credentials);
      setLogged(true);
      handleShow();
      setMessage({ msg: `Hello, ${user.name}!`, type: "success" });
      setUsername(`${user.username}`);
    } catch (err) {
      setMessage({ msg: err, type: "danger" });
    }
  };

  const doLogOut = async () => {
    await API.logOut();
    setLogged(false);
  };

  return (
    <Router>
      <MenuBar />

      {message.type === "danger" && (
        <Row
          className="ml-auto mr-auto d-lg-block"
          style={{ width: "450px", height: "50px" }}
        >
          <Alert
            variant={message.type}
            onClose={() => setMessage("")}
            dismissible
          >
            {message.msg}
          </Alert>
        </Row>
      )}
      {/* Modale di benvenuto */}
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Welcome</Modal.Title>
        </Modal.Header>
        <Modal.Body> {message.msg}</Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>

      <Switch>
        <Route
          path="/login"
          render={() => (
            <LoginForm
              login={doLogIn}
              officersList={officersList}
              logged={logged}
            />
          )}
        />
        <Route
          path="/admin"
          render={() => <AdminPage deskids={deskIds} desks={deskList} services={servicesForDesk} setRecharged={updateRech} logout={doLogOut} />}
        />
        <Route
          path="/officer"
          render={() => (
            <OfficerPage
              logout={doLogOut}
              username={username}
              waiting={waiting}
              servicesList={servicesList}
              queue={queue}
              officersList={officersList}
              servicesDList={servicesDList}
            />
          )}
        />
        <Route path="/queues" render={() => <QueueTable queues={queue} />} />
        <Route path="/waitingTime" render={() => <WaitTimePage />} />
        <Route
          path="/selectservices"
          render={() => <SelectServices servicesList={servicesList} />}
        />

        <Route path="/" render={() => <HomePage />} />
      </Switch>
    </Router>
  );
}

export default App;
