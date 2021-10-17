function officer(officer_id,desk_id, username){
    this.officer_id=officer_id; 
    this.desk_id=desk_id;
    this.username=username;
    }

function service(service_id, service_name, service_time){
    
    this.service_id=service_id;
    this.service_name=service_name;
    this.service_time=service_time;
    }
function services_desks(desk_id, service_id){
    this.desk_id=desk_id;
    this.service_id=service_id;
   
    }
export  {officer,service,services_desks};
