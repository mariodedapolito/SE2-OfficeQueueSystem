'use strict';

const sqlite = require('sqlite3');
const dayjs = require('dayjs');
const isToday = require('dayjs/plugin/isToday');

const db = new sqlite.Database('office_db.db', (err) => {
    if (err) {
        throw err;
    }
});

exports.getServedTickets = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM tickets WHERE ticket_status = \"served\" ORDER BY service_id, ticket_id ASC"
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
            }
            const tickets = rows.map((t) => ({
                ticket_id: t.ticket_id,
                service_id: t.service_id,
                desk_id: t.desk_id,
                ticket_time: t.ticket_time,
                ticket_status: t.ticket_status,
            }));
            resolve(tickets);
        });
    });
}

exports.getCalledTickets = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM tickets WHERE ticket_status = \"called\" ORDER BY service_id, ticket_id ASC"
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
            }
            const tickets = rows.map((t) => ({
                ticket_id: t.ticket_id,
                service_id: t.service_id,
                desk_id: t.desk_id,
                ticket_time: t.ticket_time,
                ticket_status: t.ticket_status,
            }));
            resolve(tickets);
        });
    });
}

exports.getWaitingTickets = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM tickets WHERE ticket_status = \"waiting\" ORDER BY service_id, ticket_id ASC"
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
            }
            const tickets = rows.map((t) => ({
                ticket_id: t.ticket_id,
                service_id: t.service_id,
                desk_id: t.desk_id,
                ticket_time: t.ticket_time,
                ticket_status: t.ticket_status,
            }));
            resolve(tickets);
        });
    });
}

exports.getTicketStatus = (ticket_id) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM tickets WHERE ticket_id = ?"
        db.get(sql, [ticket_id], (err, row) => {
            if (err) {
                reject(err);
            }
            resolve(row);
        });
    });
}

exports.generateNewTicket = (service_id) => {
    const ticket_time = dayjs().format();
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO tickets(ticket_id, service_id, desk_id, ticket_time, ticket_status) VALUES(?,?,?,?,?)"
        db.run(sql, [null, service_id, null, ticket_time, "waiting"], function (err) {
            if (err) {
                reject(err);
            }
            console.log(this);
            resolve(this.lastID);
        });
    });
}

exports.serveNextTicket = (old_ticket_id, new_ticket_id, desk_id) => {
    return new Promise((resolve, reject) => {
        const sql = "UPDATE tickets SET ticket_status = \"served\" WHERE ticket_id = ?; UPDATE tickets SET ticket_status = \"called\", desk_id = ? WHERE ticket_id = ?;"
        db.run(sql, [old_ticket_id, desk_id, new_ticket_id], function (err) {
            if (err) {
                reject(err);
            }
            console.log(this);
            resolve(true);
        });
    });
}

exports.serveFirstTicket = (new_ticket_id, desk_id) => {
    return new Promise((resolve, reject) => {
        const sql = "UPDATE tickets SET ticket_status = \"called\", desk_id = ? WHERE ticket_id = ?"
        db.run(sql, [desk_id, new_ticket_id], function (err) {
            if (err) {
                reject(err);
            }
            console.log(this);
            resolve(true);
        });
    });
}
