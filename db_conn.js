const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = "mongodb+srv://s213067525:Xq2BY9gMGb72lyyL@cluster0.ryplpya.mongodb.net/";

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