const { MongoClient } = require('mongodb');
const { MONGO_URL, DB_NAME } = process.env;
require('dotenv').config();

let client;
const connectToCVDB = async () => {
    if (!client) {
        client = new MongoClient(MONGO_URL);
        await client.connect();
        db = client.db(DB_NAME);
        console.log('Connected to CV DB');
    }
};

module.exports = connectToCVDB;