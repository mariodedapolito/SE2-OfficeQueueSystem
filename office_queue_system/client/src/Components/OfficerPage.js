
import {LogoutButton} from "../LoginForm.js";
import {Button,Container,Row,Col,Alert} from 'react-bootstrap';
import { useState} from 'react';
function OfficerPage(props){
const [clic, setClic]=useState(false);
const [id, setId]=useState('');
const [service, setService]=useState('');
 return(<>
<LogoutButton logout={props.logout}/>

<Container fluid="sx">

  <Row className="justify-content-md-center">
<Button style={{ fontSize: 30 }} onClick={()=>{
//desk where the officer works
let ndesk=props.officersList.filter(p=>p.username===props.username).map(x=>x.desk_id);

//services done by an officer
let servicesD=props.servicesDList.filter(p=>p.desk_id===parseInt(ndesk)).map(x=>x.service_id);

let id=0;let ser;let l;let u;
let val;let sh,ph;
for(const w of servicesD){
val=props.queue.filter((c)=>c[0].service_id===w).map(c=>c.length);

 if(val>id){id=val;ser=w;}
 if(parseInt(val)===parseInt(id)){

 u=props.servicesList.filter(x=>x.service_id===w).map(x=>x.service_time);
 sh=u[0];
 l=props.servicesList.filter(x=>x.service_id===ser).map(x=>x.service_time);
ph=l[0];
if(sh<ph){id=val;ser=w;}

}}
setId(id);
setService(ser);

setClic(true);}}>NEXT TICKET</Button></Row>
<br/><br/>

{clic?
<Row className="justify-content-md-center">
<Col  xs={6} md={6}>
<Alert variant="warning"  onClose={() => setClic(false)} dismissible>
  <Alert.Heading>The Next Ticket to be Served is:  TICKET # {id} of service {service}</Alert.Heading>
  <hr />
</Alert></Col></Row>:<></>}

</Container>
</>);}


export default OfficerPage;