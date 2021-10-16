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
    return { name: user.name, admin: user.admin };
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

//Get ALL queues (served/called/waiting tickets in one array)
//Each row of the array contains the queue for a certain service
//returns:  [0][array of objects{ticket_id, service_id, desk_id, ticket_time, ticket_status}] --> all the serviceID for this queue are the same
//          [1][array of objects{ticket_id, service_id, desk_id, ticket_time, ticket_status}] --> all the serviceID for this queue are the same
//          ...
//          [n][array of objects{ticket_id, service_id, desk_id, ticket_time, ticket_status}] --> all the serviceID for this queue are the same
//NOTE: the row index DOES NOT correspond to the actual service_id of the objects!!
async function getAllQueues() {
  const response = await fetch('http://localhost:3000/api/queues');
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
  const response = await fetch('http://localhost:3000/api/queueByService:'+service_id);
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
  const response = await fetch('http://localhost:3000/api/servedTickets');
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
  const response = await fetch('http://localhost:3000/api/calledTickets');
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
  const response = await fetch('http://localhost:3000/api/waitingTickets');
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
  const response = await fetch('http://localhost:3000/api/ticketStatus:'+ticket_id);
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
  const response = await fetch('http://localhost:3000/api/generateTicket:'+service_id);
  const newTicketID = await response.json();
  if (response.ok) {
    return newTicketID;
  } else {
    throw newTicketID;  // an object with the error coming from the server
  }
}



const API = { logOut, logIn, getUserInfo, getAllQueues, getQueueByService, getServedTickets, getCalledTickets, getWaitingTickets, getTicketStatus, generateNewTicket};
export default API;