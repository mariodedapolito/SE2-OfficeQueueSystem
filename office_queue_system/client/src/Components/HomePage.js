import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function HomePage(props) {
    return (

        <body class= "Home">
        <div id="paragraph">
        <div class="paragraph-disclaimer">
            <div class = "title"> Welcome.</div> <br/>
            <div class = "remains"> As a new customer, do you want to receive your ticket number?<br/>
            <a href="selectservices">Select services here.</a> <br />
            <br/>
            Already got a ticket? <br/>
            <a href="WaitingTime">Learn your waiting time here.</a><br />
            <br/>
            Part of our team?<br/> 
            <a href="Login">Log in.</a><br /> </div>
        </div>
     </div>
       </body>
         
        )
    }

export default HomePage;