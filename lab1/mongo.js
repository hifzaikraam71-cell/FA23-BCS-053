const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";

const client = new MongoClient(url);

async function connectMongo() {
    try {
        await client.connect();
        console.log("MongoDB Connected");
    } catch (error) {
        console.log("MongoDB Error:", error);
    }
}

module.exports = connectMongo;