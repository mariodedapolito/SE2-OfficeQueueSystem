'use strict';

const sqlite = require('sqlite3');
const dayjs = require('dayjs');
const isToday = require('dayjs/plugin/isToday');

const db = new sqlite.Database('office_db.db', (err) => {
    if (err) {
        throw err;
    }
});

exports.getAllQueues = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM tickets ORDER BY service_id, ticket_id ASC"
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
            }
            const queues = rows.map((t) => ({
                ticket_id: t.ticket_id,
                service_id: t.service_id,
                desk_id: t.desk_id,
                ticket_time: t.ticket_time,
                ticket_status: t.ticket_status,
            }));
            resolve(queues);
        });
    });
}

exports.getQueueByService = (service_id) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM tickets WHERE service_id  = ? ORDER BY ticket_id ASC"
        db.all(sql, [service_id], (err, rows) => {
            if (err) {
                reject(err);
            }
            const queues = rows.map((t) => ({
                ticket_id: t.ticket_id,
                service_id: t.service_id,
                desk_id: t.desk_id,
                ticket_time: t.ticket_time,
                ticket_status: t.ticket_status,
            }));
            resolve(queues);
        });
    });
}