let express = require('express');
let app = express();
let port = process.env.port || 3000;
require('./db_conn')

let router = require('./routers/router')

app.use(express.static(__dirname + "/public"));
app.use(express.json());             // for application/json
app.use(express.urlencoded());       // for application/x-www-form-urlencoded
app.use('/api/cats', router);

app.listen(port, () => {
    console.log(`express server started on port ${port}`);
});

app.get('/', function (req, res) {
    res.render('index.html');
});