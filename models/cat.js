const { client, runDBConnection } = require("../db_conn");

async function postCat(cat) {
  await runDBConnection();

  const collection = client.db("Cat").collection("Cat");
  return new Promise((resolve, reject) => {
    collection.insertOne(cat, (err, result) => {
      if (err) {
        console.error('Error during insert operation:', err);
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

async function getAllCats() {
  await runDBConnection();

  const collection = client.db("Cat").collection("Cat");
  return collection.find({}).toArray();
}

module.exports = { postCat, getAllCats };
