'use strict';

const sqlite=require('sqlite3');
const db =new sqlite.Database('office_db.db',(err)=>{if(err)throw err;});
const bcrypt=require('bcrypt');

//get officers
exports.getAllOfficers=()=>{
    return new Promise((resolve,reject)=>
    {const sql='SELECT * from officers';
   
    db.all(sql,[], (err,rows)=>{
        if (err){
            reject(err);
            return;
        }
        const o=rows.map((e)=>({officer_id:e.officer_id, desk_id:e.desk_id,username :e.username}));
        resolve(o);
    });

}
    
    
    );
};
//delete 
exports.remove = async () => {
    
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM tickets ';
        db.run(sql, [], function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });

}


//get services per desk 
exports.getServicesPerDesk= () => {
   return new Promise((resolve,reject)=>
    {const sql='SELECT * from desks_services';
   
    db.all(sql,[], (err,rows)=>{
        if (err){
            reject(err);
            return;
        }
        const o=rows.map((e)=>({ desk_id:e.desk_id,service_id :e.service_id}));
        resolve(o);
    });

}
    
    
    );
};

//get services 
exports.getServices= () => {
   return new Promise((resolve,reject)=>
    {const sql='SELECT * from services';
   
    db.all(sql,[], (err,rows)=>{
        if (err){
            reject(err);
            return;
        }
        const o=rows.map((e)=>({ service_id :e.service_id, service_name :e.service_name, service_time :e.service_time }));
        resolve(o);
    });

}
    
    
    );
};


//LOGIN

exports.getUser = (email, password) => {
  return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM USER WHERE email = ?';
      db.get(sql, [email], (err, row) => {
          if (err)
              reject(err);
          else if (row === undefined) {
              resolve(false);
          }
          else {
              const user = { id: row.id, username: row.email, name: row.name };
                   bcrypt.compare(password, row.hash).then(result => {
                  if (result)
                      resolve(user);
                  else
                      resolve(false);
              }).catch();
          }
      });
  });
};


exports.getUserById = (id) => {
  return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM USER WHERE id = ?';
      db.get(sql, [id], (err, row) => {
          if (err)
              reject(err);
          else if (row === undefined)
              resolve({ error: 'User not found.' });
          else {
              const user = { id: row.id, username: row.email, name: row.name }
              resolve(user);
          }
      });
  });
};
