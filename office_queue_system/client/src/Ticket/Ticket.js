
class Ticket{

    constructor( ticket_id, service_id, desk_id, ticket_time, ticket_status ){
        this.ticket_id = ticket_id;
        this.service_id = service_id;
        this.desk_id = desk_id;
        this.ticket_time = ticket_time;
        this.ticket_status = ticket_status;
    }

    static from (json){
        return new Ticket(json.ticket_id, json.service_id, json.desk_id, json.ticket_time, json.ticket_status);
    }
}

export {Ticket};
