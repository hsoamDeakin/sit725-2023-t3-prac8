let express = require('express');
let db_conn = require("./db_conn")
let controller = require("./controllers/controller") 
let app = express();
let port = process.env.port || 3000;

const path = require('path');
// Set the views directory
app.set('views', path.join(__dirname, 'views'));
// Set the view engine to use
app.set('view engine', 'html');

let catsRoute = require('./routers/catsRoute')

app.use(express.static(__dirname + "/public"));
app.use(express.json());             // for application/json
app.use(express.urlencoded());       // for application/x-www-form-urlencoded
app.use('/api/cats', catsRoute);

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.listen(port, () => {
    console.log(`express server started on port ${port}`);
});

