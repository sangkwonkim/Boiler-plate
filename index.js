const express = require('express')
const app = express()
const port = 3000

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://sangkwon:qkdtl21@cluster0.imyq0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    }).then(() => console.log('MongoDB Connceted...'))

app.get('/', (req, res) => res.send('hello world!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))