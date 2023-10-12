const express = require('express')
const axios = require('axios')
const router = express.Router()

const instance = axios.create();

instance.interceptors.request.use(function (config) {
  console.log('Request Details:');
  console.log('Request Method:', config.method);
  console.log('Request URL:', config.url);
  console.log('Request Headers:', config.headers);
  console.log('Request Data:', config.data);
  console.log('---------------------------------');
  console.log(config);
  return config;
});


router.get('/:username', (req, res) => {
    res.json({message: 'success', data: req.data })
})

router.param("username", async (req, res, next, username) => {
    try {
        const API_KEY = process.env.MONKEYTYPE_APEKEY;
        const url = `https://api.monkeytype.com/users/${username}/profile`
        const response = await instance.get(url, {
            headers: {
                Authorization: `ApeKey ${API_KEY}`,
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