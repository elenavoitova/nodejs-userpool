const express = require('express');
const bodyParser= require('body-parser');

//TEST MOCK
let arr = [];
let user = {
    username : "username1",
    password : "password1"
};
let user2 = {
    username : "username2",
    password : "password2"
};
arr.push(user);
arr.push(user2);

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000, function() {
    console.log('listening on 3000')
});

app.get('/', function(req, res) {
        res.sendFile(__dirname + '/index.html')
    });

app.get('/users', function(req, res) {
    res.send(arr)
});

app.get('/addUser', (req, res) => {
    res.sendFile(__dirname + '/form.html')
});

app.post('/quotes', (req, res) => {
    console.log('Hellooooooooooooooooo!')
});

app.post('/addUser', (req, res) => {
    console.log(req.body);
    arr.push(req.body);
    res.send("Ok")
});