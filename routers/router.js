const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const { MONGO_URL, DB_NAME } = process.env;

let client;
let db;

const connectToMongo = async () => {
  if (!client) {
    client = new MongoClient(MONGO_URL);
    await client.connect();
    db = client.db(DB_NAME);
    console.log('Connected to the MongoDB');
  }
};

const createRouter = (collectionName) => {
  const router = express.Router();

  router.route('/').get(async (req, res) => {
    try {
      await connectToMongo();
      const collection = db.collection(collectionName);
      const data = await collection.find().toArray();
      res.status(200).send(data);
    } catch (error) {
      console.error(error.stack);
      res.status(500).send({ error, message: 'Internal Server Error' });
    }
  });

  router.route('/:lang/:id').get(async (req, res) => {
    const id = req.params.id;
    const lang = req.params.lang;

    try {
      await connectToMongo();
      const collection = db.collection(collectionName);
      const queryId = collectionName === 'Users' ? { _id: new ObjectId(id) } : { userId: new ObjectId(id) };
      const projection = {
        [`info.${lang}`]: 1, // Include the specific language info
        name: 1,
        email: 1,
        phone: 1,
        location: 1,
        availableLanguages: 1,
        cvs: 1,
        network: 1
      };

      const data = await collection.findOne(queryId, { projection });
      const hasLanguage = data.availableLanguages.includes(lang);
      if (!hasLanguage) {
        data.info = { [lang]: 'Language not available' };
      }
      if (data) {
        res.send(data);
      }
      else if (data === null || data.length === 0) {
        res.status(404).send({ error: 404, message: 'No data found, check id' });
      }
    } catch (error) {
      console.error(error.stack);
      res.status(500).send({ error, message: 'Internal Server Error' });
    }
  });

  return router;
};

module.exports = createRouter;
