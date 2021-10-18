//api login
async function logIn(credentials) {
  let response = await fetch('http://localhost:3000/api/sessions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  if (response.ok) {
    const user = await response.json();
    return  user ;
  }
  else {
    try {
      const errDetail = await response.json();
      throw errDetail.message;
    }
    catch (err) {
      throw err;
    }
  }
}

async function logOut() {
  await fetch('http://localhost:3000/api/sessions/current', { method: 'DELETE' });
}

async function getUserInfo() {
  const response = await fetch('http://localhost:3000/api/sessions/current');
  const userInfo = await response.json();
  if (response.ok) {
    return userInfo;
  } else {
    throw userInfo;  // an object with the error coming from the server
  }
}

//GET of all officers
async function getallOfficers(){

const response=await fetch('http://localhost:3000/api/officers');
if(response.ok){
  const responseBody=await response.json();
  return responseBody;
}
 else{
     try {
       const err=await response.json();
       throw err.message;}
        catch(err){throw err;}
     }
 }
//Get ALL queues (served/called/waiting tickets in one array)
//Each row of the array contains the queue for a certain service
//returns:  [0][array of objects{ticket_id, service_id, desk_id, ticket_time, ticket_status}] --> all the serviceID for this queue are the same
//          [1][array of objects{ticket_id, service_id, desk_id, ticket_time, ticket_status}] --> all the serviceID for this queue are the same
//          ...
//          [n][array of objects{ticket_id, service_id, desk_id, ticket_time, ticket_status}] --> all the serviceID for this queue are the same
//NOTE: the row index DOES NOT correspond to the actual service_id of the objects!!
async function getAllQueues() {
  const response = await fetch('/api/queues');
  const queuesArray = await response.json();
  if (response.ok) {
    return queuesArray;
  } else {
    throw queuesArray;  // an object with the error coming from the server
  }
}

//Get the queue (served/called/waiting tickets) based on the service_id
//returns:  [array of objects{ticket_id, service_id, desk_id, ticket_time, ticket_status}]
async function getQueueByService(service_id) {
  const response = await fetch('/api/queueByService'+service_id);
  const queueArray = await response.json();
  if (response.ok) {
    return queueArray;
  } else {
    throw queueArray;  // an object with the error coming from the server
  }
}

//Get the queues of the already SERVED tickets
//Each row of the array contains the queue for a certain service
//returns:  [0][array of objects{ticket_id, service_id, desk_id, ticket_time, ticket_status = served}] --> all the serviceID for this queue are the same
//          [1][array of objects{ticket_id, service_id, desk_id, ticket_time, ticket_status = served}] --> all the serviceID for this queue are the same
//          ...
//          [n][array of objects{ticket_id, service_id, desk_id, ticket_time, ticket_status = served}] --> all the serviceID for this queue are the same
//NOTE: the row index DOES NOT correspond to the actual service_id of the objects!!
async function getServedTickets() {
  const response = await fetch('/api/servedTickets');
  const queuesArray = await response.json();
  if (response.ok) {
    return queuesArray;
  } else {
    throw queuesArray;  // an object with the error coming from the server
  }
}

//Get the queues of the CALLED tickets (called tickets = tickets that are NOW being served by a desk)
//Each row of the array contains the queue for a certain service
//returns:  [0][array of objects{ticket_id, service_id, desk_id, ticket_time, ticket_status = called}] --> all the serviceID for this queue are the same
//          [1][array of objects{ticket_id, service_id, desk_id, ticket_time, ticket_status = called}] --> all the serviceID for this queue are the same
//          ...
//          [n][array of objects{ticket_id, service_id, desk_id, ticket_time, ticket_status = called}] --> all the serviceID for this queue are the same
//NOTE: the row index DOES NOT correspond to the actual service_id of the objects!!
async function getCalledTickets() {
  const response = await fetch('/api/calledTickets');
  const queuesArray = await response.json();
  if (response.ok) {
    return queuesArray;
  } else {
    throw queuesArray;  // an object with the error coming from the server
  }
}

//Get the queues of the WAITING tickets (waiting tickets = tickets that are waiting in queue to be served)
//Each row of the array contains the queue for a certain service
//returns:  [0][array of objects{ticket_id, service_id, desk_id, ticket_time, ticket_status = waiting}] --> all the serviceID for this queue are the same
//          [1][array of objects{ticket_id, service_id, desk_id, ticket_time, ticket_status = waiting}] --> all the serviceID for this queue are the same
//          ...
//          [n][array of objects{ticket_id, service_id, desk_id, ticket_time, ticket_status = waiting}] --> all the serviceID for this queue are the same
//NOTE: the row index DOES NOT correspond to the actual service_id of the objects!!
async function getWaitingTickets() {
  const response = await fetch('/api/waitingTickets');
  const queuesArray = await response.json();
  if (response.ok) {
    return queuesArray;
  } else {
    throw queuesArray;  // an object with the error coming from the server
  }
}

//Get the ticket status given a ticketID
//returns: object{ticket_id, service_id, desk_id, ticket_time, ticket_status}
async function getTicketStatus(ticket_id) {
  const response = await fetch('/api/ticketStatus'+ticket_id);
  const status = await response.json();
  if (response.ok) {
    return status;
  } else {
    throw status;  // an object with the error coming from the server
  }
}

//Generate a new ticket given the serviceID and insert it in queue
//returns: newTicketID (the ticket number)
async function generateNewTicket(service_id) {
  const response = await fetch('/api/generateTicket'+service_id);
  const newTicketID = await response.json();
  if (response.ok) {
    return newTicketID;
  } else {
    throw newTicketID;  // an object with the error coming from the server
  }
}

//sets old ticket status to "served" and sets the new ticket status to "called" and assigns the desk to that ticket
//return TRUE if tickets were successfully updated
async function serveNextTicket(old_ticket_id, new_ticket_id, desk_id) {
  const response = await fetch('/api/serveNextTicket', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({old_ticket_id: old_ticket_id, new_ticket_id: new_ticket_id, desk_id: desk_id}),
  });
  const outcome = await response.json();
  if (response.ok) {
    return outcome;
  } else {
    throw outcome;  // an object with the error coming from the server
  }
}

//GET of services per desks
async function getallServicesPerDesk(){

const response=await fetch(`http://localhost:3000/api/servicesperdesk`);
if(response.ok){
  const responseBody=await response.json();
  return responseBody;
}
 else{
     try {
       const err=await response.json();
       throw err.message;}
        catch(err){throw err;}
     }
 }
//GET of services 
async function getallServices(){

const response=await fetch(`http://localhost:3000/api/services`);
if(response.ok){
  const responseBody=await response.json();
  return responseBody;
}
 else{
     try {
       const err=await response.json();
       throw err.message;}
        catch(err){throw err;}
     }
 }

const API = { logOut, logIn, getUserInfo, getallOfficers, getAllQueues, getQueueByService, getServedTickets, getCalledTickets, getWaitingTickets, getTicketStatus, generateNewTicket, serveNextTicket, getallServicesPerDesk,getallServices};
export default API;

