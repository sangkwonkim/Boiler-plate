const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const { User } = require("./models/User");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.json());;
app.use(express.urlencoded({extended: true}));

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://sangkwon:qkdtl21@cluster0.imyq0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(()=> console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

app.get('/', (req, res) => res.send('hello world!'))

app.post('/register', (req, res) => {


    const user = new User(req.body)

    user.save((err, userInfo) => {
        if(err) return res.json({ succedd: false, err})
        return res.status(200).json({
            success: true
        })
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))