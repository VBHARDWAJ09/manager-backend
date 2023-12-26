const express = require('express');
const { swaggerServe, swaggerSetup } = require('./services/swagger')
const userRoutes = require('./routes/user');
const constants = require('./config/constants');
const connect = require('./config/db')
const cors = require("cors")
const app = express()

connect()
app.use(cors())
app.use(express.json())
app.get('/', (req, res) => {
    return res.status(200).json({ messgae: "Welcome To manager" })
})

app.use('/all-apis', swaggerServe, swaggerSetup)

app.use('/api', userRoutes)


app.listen(constants.port, (req, res) => {
    console.log("Manager is online")
})