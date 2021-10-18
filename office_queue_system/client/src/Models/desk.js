class Desk{    

    constructor(desk_id, service_id) {
       this.desk_id=desk_id
        this.service_id=service_id
       
    }

    /**
     * Construct a Task from a plain object
     * @param {{}} json 
     * @return {Question} the newly created Task object
     */
    static from(json) {
        const d =  Object.assign(new Desk(), json);
    
        return d;
    }

}

export default Desk;
