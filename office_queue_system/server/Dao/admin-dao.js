'use strict';

const sqlite = require('sqlite3');

const db = new sqlite.Database('office_db.db', (err) => {
    if (err) {
        throw err;
    }
});

//////////// Desks_Services /////////////////////////////

/// Getting all desks(desk id & service id)//////////

exports.listAllDesks = () => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT  * FROM desks_services ORDER BY desk_id ASC ';
      db.all(sql, [], (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        const desks = rows.map((desk) => ({ desk_id: desk.desk_id, service_id: desk.service_id  }));
        resolve(desks);
      });
    });
  };

/// Getting desk ids//////////

exports.listDeskIds = () => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT desk_id FROM desks ';
      db.all(sql, [], (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        const desks = rows.map((desk) => ({ desk_id: desk.desk_id  }));
        resolve(desks);
      });
    });
  };


  /// Getting all services for each desk//////////

  exports.listServicesByDesk = (deskId) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT service_id FROM desks_services WHERE desk_id=?  ';
      db.all(sql, [deskId], (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        const desks = rows.map((desk) => ({ desk_id: desk.desk_id, service_id: desk.service_id  }));
        resolve(desks);
      });
    });
  };

 
  /// Adding service for to selected desk //////

  exports.createServiceForDesk=(survey)=>{
    return new Promise((resolve, reject)=>{
      const sql = 'INSERT INTO desks_services(desk_id, service_id) VALUES(?,?)'
      //const sql= 'INSERT INTO tasks(description,user) VALUES(?,?))';
  
      db.run(sql, [survey.desk_id, survey.service_id], function(err){
        if(err){
          reject(err);
          return;
        }
        console.log(this.lastID);
        resolve(this.lastID)
      });
    });
  };

///// Deleting service for selected desk
exports.deleteServiceOfDesk = function(deskId, serviceId) {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM desks_services WHERE desk_id = ? AND service_id=?';
        db.run(sql, [deskId, serviceId], (err) => {
            if(err)
                reject(err);
            else 
                resolve(null);
        })
    });
  }


  /////////////////// Services //////////////////////////////
  /// Getting all services//////////

exports.listAllServices = () => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM services ';
      db.all(sql, [], (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        const services = rows.map((service) => ({ service_id: service.service_id, service_name:service.service_name, service_time: service.service_time  }));
        resolve(services);
      });
    });
  };


  ////// Create new Service /////////////////
  exports.createService=(service)=>{
    return new Promise((resolve, reject)=>{
      const sql = 'INSERT INTO services(service_id, service_name, service_time) VALUES(?,?,?)'
      //const sql= 'INSERT INTO tasks(description,user) VALUES(?,?))';
  
      db.run(sql, [service.service_id, service.service_name, service.service_time], function(err){
        if(err){
          reject(err);
          return;
        }
        console.log(this.lastID);
        resolve(this.lastID)
      });
    });
  };


  ////////////// Update waiting time for selected Service /////////////////
  
exports.updateServiceTime = (serviceId, time) => {
    return new Promise((resolve, reject) => {
      const sql = 'UPDATE services SET service_time=? WHERE service_id = ? ';
      db.run(sql, [time, serviceId], function (err) {
        if (err) {
          console.log(err)
          reject(err);
          return;
        }
        resolve(this.lastID); // changed from resolve(exports.getTask(this.lastID) because of error "not found" (wrong lastID)
      });
    });
  };
