const express = require('express');
const profileRouter = require('./routes/profile');
const githubRouter = require('./routes/github');
const cors = require('cors');

const app = express()
require('dotenv').config();

app.use(cors())

app.get('/', (req, res) => {
    res.send("API Home")
})

app.use("/profile", profileRouter);
app.use("/github", githubRouter);

app.listen(4000)