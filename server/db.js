const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'truebrew';

const client = new MongoClient(url);

async function connect() {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB");
    const db = client.db(dbName);
    return db;
  } catch (error) {
    console.error("Could not connect to MongoDB:", error);
    process.exit(1);
  }
}

module.exports = connect;


