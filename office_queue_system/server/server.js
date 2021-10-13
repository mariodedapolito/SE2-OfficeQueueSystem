const express = require('express');
const morgan = require('morgan');
const session = require('express-session');          //Session middleware
const passport = require('passport');               //Authentication middleware
const passportLocal = require('passport-local');  //Authentication strategy

const PORT = 3001;




app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/`));

