
const express = require('express')
const app = express()
const port = 3035;
const data = require('./data');
var cors = require('cors')

app.use(cors())
app.use(express.static('public'));

app.get('/data', (req, res) => {
    res.send({ data, isSuccess: true, isError: false });
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})