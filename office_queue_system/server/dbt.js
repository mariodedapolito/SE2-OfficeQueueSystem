'use strict';

const sqlite=require('sqlite3');
const db =new sqlite.Database('USER.sqlite',(err)=>{if(err)throw err;});
const bcrypt=require('bcrypt');

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
              const user = { id: row.id, username: row.email, name: row.name, admin:row.admin };
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
              const user = { id: row.id, username: row.email, name: row.name, admin:row.admin  }
              resolve(user);
          }
      });
  });
};
