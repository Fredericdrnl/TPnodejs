const express = require('express');
const process = require('process');
var dateTime = require('node-datetime');
const app = express();
const port = 3000

// DOURNEL Frédéric TD1
const metrics = {
    requestsCount: {},
    startTime: 0
}
app.use(function (req, res, next) {
    dt = dateTime.create();
    dt.format('m/d/Y H:M:S');
    console.log("[" + new Date(dt.now()) + "]: " + req.path);
    next();
});

app.use(function (req, res, next) {
    metrics.requestsCount[req.path] = (metrics.requestsCount[req.path] || 0) + 1;
    next();
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/welcome', (req, res) => {
    res.send("Bienvenue sur le TP 1 du cours d'architecture logicielle");
})

app.get('/secret', (req, res) => {
    res.send("Vous ne possédez pas les droits pour accéder à ma page secrète", 404);
})

json = {
    message : "Bonjour"
}
app.get('/error', (req, res) => {
    res.send(json.message, 500);
})

app.get('/img', async (req, res) => {
    res.send("<img src=https://risibank.fr/cache/medias/0/27/2763/276340/full.png>");
});

app.get('/redirectMe', async (req, res) => {
    res.redirect("https://www.iut-littoral.fr/")
});

app.get('/users/:name', async (req, res) => {
    res.send("Bienvenue sur la page de " + req.params.name );
});

app.get('/somme', async (req, res) => {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    const somme = a + b;
    let string = somme.toString();
    res.send(string);
});

app.get("/metrics" , async (req, res) => {

    const json = {
        status: "Healthy",
        requestsCount: metrics.requestsCount,
        uptime: process.uptime()
    }
    res.json(json)
})

app.get("*", (req, res) => {
    res.send("Cette page n'existe pas", 404)
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})