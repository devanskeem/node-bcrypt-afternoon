require('dotenv').config()
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const auth_ctrl = require('./controllers/auth_controller')
const treas_ctrl = require('./controllers/treasure_controller')
const auth = require('./middleware/auth_middleware')
const {CONNECTION_STRING, SERVER_PORT, SESSION_SECRET} = process.env 

const app = express()

app.use(express.json())


massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
    console.log('database set')
})


app.use(session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}))

app.post('/auth/register', auth_ctrl.register)
app.get('/auth/logout', auth_ctrl.logout)
app.post('/auth/login', auth_ctrl.login)
app.get('/treasure/dragon', treas_ctrl.dragonTreasure)
app.get('/treasure/user', auth.usersOnly, treas_ctrl.userTreasure)
app.post('/treasure/add', auth.usersOnly, treas_ctrl.addUserTreasure);
app.get('/treasure/all', auth.usersOnly, auth.adminsOnly, treas_ctrl.getAllTreasure);


app.listen(SERVER_PORT, () => {console.log(`Running on port ${SERVER_PORT}`)})
