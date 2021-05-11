var express = require('express');
var app = express();
const axios = require('axios');

app.get('/', (req, res)=>{
  axios.get(`url u want to acees: todo`)
    .then((response)=>{
        res.send(response.data)
    })
})

app.listen(3000);
