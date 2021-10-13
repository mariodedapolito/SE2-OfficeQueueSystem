const express = require('express');
const morgan = require('morgan');
const tasksDao = require('./tasks-dao');
const usersDao = require('./users-dao');
const {check, validationResult} = require('express-validator');
const session = require('express-session');          //Session middleware
const passport = require('passport');               //Authentication middleware
const passportLocal = require('passport-local');  //Authentication strategy

const PORT = 3001;

//PASSPORT MIDDLEWARE CONFIGURATION
passport.use(new passportLocal.Strategy((username, password, done) => {
    usersDao.getUser(username, password).then((user) => {
        if (user) {               //Authentication successful, db returned user
            done(null, user);
        }
        else {                   //Authentication failed (wrong credentials)
            done(null, false, { message: 'Wrong username and/or password' });
        }
    }).catch((err) => {
        done(err);              //DB error
    });
}));

//Store id of logged in user in Session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

//Get user info from Session data
passport.deserializeUser((id, done) => {
    usersDao.getUserById(id).then((user) => {
        done(null, user);   //make user available in req.user
    }).catch((err) => {
        done(err, null);    //user authorization failed (user with that id not existing)    
    });
});

//SESSION CONFIGURATION
const isLoggedIn = (req, res, next) => {  //next is the middleware syntax
    if (req.isAuthenticated()) {
        return next();
    }
    return res.status(401).json({ error: 'User not authenticated' });
}


const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(session({
    secret: "LMRS biglab2 extra-secret key",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

//login
app.post('/sessions/login', function (req, res, next){
    passport.authenticate('local',(err,user,info)=>{
        if(err){
            return next(err);
        }
        if(!user){
            return res.status(401).json(info);
        }
        //successful credential, perform login
        req.login(user, (err)=>{
            if(err){
                return next(err);
            }
            //req.user contains info from users-dao.getUser()...send this info back
            return res.json(req.user);
        });
    })(req,res,next);
});

//logout
app.delete('/sessions/logout',(req,res)=>{
    req.logout();
    res.end();
});

//check if user is logged in or not
app.get('/sessions/current',(req,res)=>{
    console.log(req.user);
    if(req.isAuthenticated()){
        res.status(200).json(req.user);
    }
    else{
        res.status(401).json({error: "Unuathenticated user"});
    }
});


app.get('/all', async (req, res) => {
    if (!req.isAuthenticated()) {
        res.status(401).json({ error: 'Unauthorized user' });
    }
    try {
        res.json(await tasksDao.getAllTasks(req.user.id));
    } catch (error) {
        res.status(500).json(error);
    }
});

app.get('/today', async (req, res) => {
    if (!req.isAuthenticated()) {
        res.status(401).json({ error: 'Unauthorized user' });
    }
    try {
        res.json(await tasksDao.getTodayTasks(req.user.id));
    } catch (error) {
        res.status(500).json(error);
    }
});

app.get('/next7days', async (req, res) => {
    if (!req.isAuthenticated()) {
        res.status(401).json({ error: 'Unauthorized user' });
    }
    try {
        res.json(await tasksDao.getNext7DaysTasks(req.user.id));
    } catch (error) {
        res.status(500).json(error);
    }
});

app.get('/important', async (req, res) => {
    if (!req.isAuthenticated()) {
        res.status(401).json({ error: 'Unauthorized user' });
    }
    try {
        res.json(await tasksDao.getImportantTasks(req.user.id));
    } catch (error) {
        res.status(500).json(error);
    }
});

app.get('/private', async (req, res) => {
    if (!req.isAuthenticated()) {
        res.status(401).json({ error: 'Unauthorized user' });
    }
    try {
        res.json(await tasksDao.getPrivateTasks(req.user.id));
    } catch (error) {
        res.status(500).json(error);
    }
});

app.get('/id/:task_id', async (req, res) => {
    if (!req.isAuthenticated()) {
        res.status(401).json({ error: 'Unauthorized user' });
    }
    const id = req.params.task_id;
    try {
        res.json(await tasksDao.getTaskById(id,req.user.id));
    } catch (error) {
        res.status(500).json(error);
    }
})

app.get('/id', async (req, res) => {
    if (!req.isAuthenticated()) {
        res.status(401).json({ error: 'Unauthorized user' });
    }
    const id = req.query.id;
    try {
        res.json(await tasksDao.getTaskById(id,req.user.id));
    } catch (error) {
        res.status(500).json(error);
    }
});

app.post('/add', [
    check('description').not().isEmpty().trim().isLength({min: 1}),
    check('important').not().isEmpty().isInt({min:0, max:1}),
    check('private').not().isEmpty().isInt({min:0, max:1}),
    check('deadline').optional(),
    check('completed').not().isEmpty().isInt({min:0, max: 1})
], async (req, res) => {
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({ error: 'Data validation failed'});
    }
    if (!req.isAuthenticated()) {
        res.status(401).json({ error: 'Unauthorized user' });
    }

    const description = req.body.description;
    const important = req.body.important;
    const prvt = req.body.private;
    const deadline = req.body.deadline;
    const completed = req.body.completed;
    try {
        res.json(await tasksDao.addTask(description, important, prvt, deadline, completed, req.user.id));
    } catch (error) {
        res.status(500).json(error);
    }
})

app.post('/update',
[   check('id').isInt({min: 0}),
    check('description').not().isEmpty().trim().isLength({min: 1}),
    check('important').isInt({min:0, max:1}),
    check('private').isInt({min:0, max:1}),
    check('deadline').optional(),
    check('completed').isInt({min:0, max: 1})
], async (req, res) => {
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        console.log("ERROR validation");
        res.status(422).json({ error: 'Data validation failed'});
    }
    if (!req.isAuthenticated()) {
        res.status(401).json({ error: 'Unauthorized user' });
    }
    const id = req.body.id;
    const description = req.body.description;
    const important = req.body.important;
    const prvt = req.body.private;
    const deadline = req.body.deadline;
    const completed = req.body.completed;
    try {
        res.json(await tasksDao.updateTask(id, description, important, prvt, deadline, completed, req.user.id));
    } catch (error) {
        res.status(500).json(error);
    }
})

app.post('/mark', [
    check('id').isInt({min: 0}),
    check('completed').not().isEmpty().isInt({min:0, max: 1})
],async (req, res) => {
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        console.log("ERROR validation");
        res.status(422).json({ error: 'Data validation failed'});
    }
    if (!req.isAuthenticated()) {
        res.status(401).json({ error: 'Unauthorized user' });
    }
    const id = req.body.id;
    const completed = req.body.completed;
    try {
        res.json(await tasksDao.markTask(id, completed, req.user.id));
    } catch (error) {
        res.status(500).json(error);
    }
})

app.get('/delete/:task_id', [
    check('task_id').isInt({min: 0})
], async (req, res) => {
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        console.log("ERROR validation");
        res.status(422).json({ error: 'Data validation failed'});
    }
    if (!req.isAuthenticated()) {
        res.status(401).json({ error: 'Unauthorized user' });
    }
    const id = req.params.task_id;
    try {
        res.json(await tasksDao.deleteTask(id,req.user.id));
    } catch (e) {
        res.status(500).json(error);
    }
})

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/`));

