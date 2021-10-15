//api login
async function logIn(credentials) {
  let response = await fetch('http://localhost:3000/api/sessions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  if(response.ok) {
    const user = await response.json();
    return {name:user.name, admin:user.admin};
  }
  else {
    try {
      const errDetail = await response.json();
      throw errDetail.message;
    }
    catch(err) {
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
const API = {logOut,logIn,getUserInfo};
 export default API;