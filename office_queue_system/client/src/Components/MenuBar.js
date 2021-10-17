const MenuBar = function(props) {
    return (
      
        <div class="header">
        <div class="menu-bar">
          <nav class="navbar navbar-expand-lg navbar-light">
            <div class="container-fluid">
              <a class="navbar-brand" href="#">{props.me} Office Queue Management</a>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>        
              </button>
              <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ml-auto">
                  <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="/home">Home</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/Queues">Queues</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/waitingTime">Waiting Time Calculator</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/selectservices">Select Services</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
      
    );
}



export default MenuBar;
