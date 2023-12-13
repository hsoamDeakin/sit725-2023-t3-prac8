const catModel = require('../models/cat');

const client = require("../db_conn");
let collection;

async function runDBConnection() {
  await client.connect((err, db) => {
    if (!err) {
      console.log("Database Connected");
    } else {
      console.log("[error]", err);
      process.exit(1);
    }
  });
}

const postCat = (req, res) => {
  let cat = req.body;
  collection.postCat(cat, (err, result) => {
    if (!err) {
      res.json({ statusCode: 201, data: result, message: "success" });
    }
  });
};

const getAllCats = async (req, res) => {
    try {
      const result = await catModel.getAllCats();
      res.json({ statusCode: 200, data: result, message: "success!!" });
    } catch (error) {
      res.status(500).json({ statusCode: 500, message: "Internal Server Error" });
    }
  };

  
// const getAllCats = async (req, res) => {
//     runDBConnection().then(async () => {
//     collection = client.db("Cat").collection("Cat");
//     // Use toArray() to convert the cursor to an array of documents
//     const result = await collection.find({}).toArray().catch(error => {
//         console.error('Error during find operation:', error);
//       });         
//       //console.log("Result: ", result);
//       res.json({ statusCode: 200, data: result, message: "success!!" });
//     })}; 

module.exports = { postCat, getAllCats };
