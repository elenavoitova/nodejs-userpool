const express = require('express');
var user = require('./takeUserHere');
var i = 0;


const app = express();

app.listen(3001, function() {
    console.log('listening on 3001')
});

app.get('/', function(req, res, next) {
    if (i === user.full){ i = 0;}
    i++;
    res.send('Userok: ' + user.userPull[i-1]);
    next();
});

