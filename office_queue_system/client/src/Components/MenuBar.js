

const MenuBar = function(props) {
    return (
      
        <div className="header">
        <div className="menu-bar">
          <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container-fluid">
              <a className="navbar-brand" href="#">{props.me} Office Queue Management</a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>        
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="/home">Home</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/Queues">Queues</a>
                  </li>
                  <li className="nav-item">
                  <a className="nav-link" href="/selectservices">Services</a>
                  </li>
                  <li className="nav-item">
                  <a className="nav-link" href="/waitingTime">Waiting Time Calculator</a>
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
