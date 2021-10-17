import { Button, Alert } from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";

function Notification(props) {
   const [show,setShow] = useState(false) 

   useEffect(() => {
    if(show===true){
      setTimeout(()=>{
        setShow(false)
      },5000);
    }
  },[show]);
  
  return (
    <>
      <Alert show={show} variant="primary">
        <Alert.Heading style={{ textAlign: "center" }}>
          New Customer
        </Alert.Heading>
      </Alert>
      {show ? <></> : <Button onClick={()=>setShow(true)}>show</Button>}
    </>
  );
}
export default Notification;