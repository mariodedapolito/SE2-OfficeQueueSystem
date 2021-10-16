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
        const sql = "SELECT * FROM tickets WHERE ticket_status = \"Served\" GROUP BY service_id"
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
        const sql = "SELECT * FROM tickets WHERE ticket_status = \"Called\" GROUP BY service_id"
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
        const sql = "SELECT * FROM tickets WHERE ticket_status = \"Waiting\" GROUP BY service_id"
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
        db.run(sql, [ticket_id], (err) => {
            if (err) {
                reject(err);
            }
            resolve(tickets);
        });
    });
}

exports.generateNewTicket = (service_id, ticket_time) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT COALESCE(MAX(ticket_id),0) AS max_ticket_id FROM tickets WHERE service_id = ?"
        db.get(sql, [service_id], (err, row) => {
            if (err) {
                reject(err);
            }
            const sql2 = "INSERT INTO tickets(ticket_id, service_id, desk_id, ticket_time, ticket_status) VALUES(?,?,?,?,?)"
            db.run(sql, [row.max_ticket_id + 1, service_id, -1, ticket_time, "Waiting"], (err) => {
                if (err) {
                    reject(err);
                }

                resolve(row.max_ticket_id + 1);
            });
        });
    });
}

