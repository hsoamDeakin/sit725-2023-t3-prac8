const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = "mongodb://127.0.0.1:27017";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function runDBConnection() {
  try {
    await client.connect();
    console.log("Database Connected");
  } catch (error) {
    console.error("[error]", error);
    process.exit(1);
  }
}

module.exports = { client, runDBConnection };