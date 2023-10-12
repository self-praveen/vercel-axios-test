const express = require('express');
const profileRouter = require('./routes/profile');
const cors = require('cors');

const app = express()

app.use(cors())

app.get('/', (req, res) => {
    res.send("API Home")
})

app.use("/profile", profileRouter);

app.listen(4000)