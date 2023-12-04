let express = require('express');
let app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb://127.0.0.1:27017";
let port = process.env.port || 3000;
let collection;

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
  
async function runDBConnection() { 
    try {
        await client.connect();
        collection = client.db('Cat').collection('Cat');
        //console.log(collection);
    } catch(ex) {
        console.error(ex);
    }
}

app.get('/', function (req,res) {
    res.sendFile(__dirname + "/public/index_mongo.html");
    // res.render('index_mongo.html');
});

app.get('/api/cats', async (req,res) => {
    const result = await getAllCats(collection);
    console.log(result);
    res.json({statusCode:200, data:result, message:'get all cats successful'});

    // getAllCats((err,result)=>{
    //     if (!err) {
    //         console.log(result);
    //         res.json({statusCode:200, data:result, message:'get all cats successful'});
    //     }
    //     else {
    //         console.log(err);
    //     }
    // });
});

app.post('/api/cat', (req,res)=>{
    let cat = req.body;
    postCat(cat, (err, result) => {
        if (!err) {
            res.json({statusCode:201, data:result, message:'success'});
        }
    });
});

function postCat(cat,callback) {
    collection.insertOne(cat,callback);
}

async function getAllCats() {
    try {
        // Use 'find' to get all documents in the collection
        const result = await collection.find({}).toArray();
        return result;
    } catch (error) {
        // Handle any errors that occurred during the database operation
        throw new Error(error);
    }
}

app.listen(port, ()=>{
    console.log('express server started');
    runDBConnection();
});