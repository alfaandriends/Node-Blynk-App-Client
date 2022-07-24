var express = require('express')
var app = express()

/* Blynk Config */
var blynk_2 = require('./dist/lib/Blynk');
var blynk_1 = new blynk_2['default']('54.251.129.244', 9443);

/* Route (url) */
app.get('/login/:email/:password', function(req, res) {
    blynk_1.connect();
    let login = blynk_1.login(req.params.email, req.params.password);
    login.then(function(result) {
        res.send(result + "");
    })
})

app.get('/register/:email/:password', function(req, res) {
    blynk_1.connect();
    let register = blynk_1.register(req.params.email, req.params.password);
    register.then(function(result) {
        res.send(result + "");
    })
})

app.get('/profile', function(req, res) {
    let profile = blynk_1.loadProfileGzipped();
    profile.then(function(result) {
        res.send(result);
    })
})

app.get('/logout', function(req, res){
    blynk_1.disconnect();
    res.send("success");
})


app.get('/createDash/:dashId/:dashName', function(req, res) {
    let createDashboard = blynk_1.createDash(req.params.dashId, req.params.dashName);
    createDashboard.then(function(result) {
        res.send(result + "");
    })
})

app.get('/createDevice', function(req, res) {
    let createDevice = blynk_1.createDevice();
    createDevice.then(function(result) {
        res.send(result + "");
    })
})

/* Listen Port */
app.listen(8000, () => console.log('Listening to port 8000 at http://127.0.0.1:8000'))