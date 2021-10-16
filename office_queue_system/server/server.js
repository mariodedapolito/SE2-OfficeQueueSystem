'use strict';

const express = require('express');
const morgan = require('morgan'); // logging middleware
const { check, validationResult } = require('express-validator'); // validation middleware
const dbt = require('./dbt'); // module for accessing the DB
const queuesDao = require('./Dao/queues-dao');
const ticketsDao = require('./Dao/tickets-dao');
const passportLocal = require('passport-local').Strategy;//Authentication strategy 
const session = require('express-session');//Session middleware
const passport = require('passport'); //Authentication middleware

// init express
const app = express();
const PORT = 3001;

// set-up the middlewares
app.use(morgan('dev'));
app.use(express.json());

/*** Set up Passport ***/
passport.use(new passportLocal(
    function (username, password, done) {
        dbt.getUser(username, password).then((user) => {
            if (!user)
                return done(null, false, { message: 'Incorrect username and/or password.' });

            return done(null, user);
        })
    }
));


// serialize and de-serialize the user
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    dbt.getUserById(id)
        .then(user => {
            done(null, user);
        }).catch(err => {
            done(err, null);
        });
});

const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated())
        return next();

    return res.status(401).json({ error: 'not authenticated' });
}


// set up the session
app.use(session({
    secret: 'a secret sentence not to share with anybody and anywhere, used to sign the session ID cookie',
    resave: false,
    saveUninitialized: false
}));

// then, init passport
app.use(passport.initialize());
/*** Users APIs ***/

// POST /sessions 
// login
app.post('/api/sessions', function (req, res, next) {
    passport.authenticate('local', (err, user, info) => {
        if (err)
            return next(err);
        if (!user) {
            return res.status(401).json(info);
        }
        req.login(user, (err) => {
            if (err)
                return next(err);

            return res.json(req.user);
        });
    })(req, res, next);
});


// GET /sessions/current
app.get('/api/sessions/current', (req, res) => {
    if (req.isAuthenticated()) {
        res.status(200).json(req.user);
    }
    else
        res.status(401).json({ code: 401, error: 'Unauthenticated user!' });;
});

// DELETE /sessions/current 
// logout
app.delete('/api/sessions/current', (req, res) => {
    req.logout();
    res.end("Logout completed!");
});


app.get("/api/queues", async (req, res) => {
    var dbQueues = await queuesDao.getAllQueues();

    let queuedServices = [];
    let currentService = -1;
    let currentIndex = -1;

    dbQueues.forEach(element => {
        if (element.service_id !== currentService) {
            currentIndex++;
            queuedServices.push(new Array());
            queuedServices[currentIndex].push(element);
        }
        else {
            queuedServices[currentIndex].push(element);
        }
    });
    
    console.log(queuedServices);

    res.json(queuedServices);
});


app.get("/api/queueByService:service_id", async (req, res) => {
    const service_id = req.params.service_id;
    res.json(await queuesDao.getQueuesByService(service_id));
});


/* CONNECTION */
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/`));

