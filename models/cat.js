const client = require("../db_conn")
let collection;

async function fetch_db() { 
    try {
        await client.connect();
        collection = client.db('Cat').collection('Cat');
        //console.log(collection);
    } catch(ex) {
        console.error(ex);
    }
}

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

module.exports = {fetch_db, postCat, getAllCats}