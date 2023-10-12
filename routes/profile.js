const express = require('express')
const axios = require('axios')
const router = express.Router()

router.get('/:username', (req, res) => {
    res.json({message: 'success', data: req.data })
})

router.param("username", async (req, res, next, username) => {
    try {
        const response = await axios.get(`https://api.github.com/users/${username}`, {
            headers: {
                'Accept-Encoding': 'gzip, deflate, br'
            },
        })

        if (response.status === 200) {
            const userData = response.data;
            req.data = userData;
            next();
        } else {
            res.status(response.status).send("Error fetching user data");
        }
    } catch (error) {
        // console.error(error);
        res.status(500).send({message: "Internal Server Error", error: error});
    }
})

module.exports = router