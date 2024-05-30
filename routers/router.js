const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const { MONGO_URL, DB_NAME } = process.env;

const usersRouter = express.Router();

usersRouter.route('/').get((req, res) => {
  (async function mongo() {
    let client;
    try {
      client = new MongoClient(MONGO_URL);
      await client.connect();
      console.log('Connected to the mongo DB');
      const db = client.db(DB_NAME);
      const usersCollection = db.collection('Users');
      const users = await usersCollection.find().toArray();
      res.status(200).send(users);
    } catch (error) {
      console.error(error.stack);
      res.status(500).send({ message: 'Internal Server Error' });
    } finally {
      if (client) {
        await client.close();
      }
    }
  })();
});

usersRouter.route('/:id').get((req, res) => {
  const id = req.params.id;
  (async function mongo() {
    let client;
    try {
      client = new MongoClient(MONGO_URL);
      await client.connect();
      console.log('Connected to the mongo DB');

      const db = client.db(DB_NAME);
      const workExperiences = await db.collection('Users').findOne({ _id: new ObjectId(id) });
      res.send(workExperiences);
    } catch (error) {
      console.error(error.stack);
      res.status(500).send({ message: 'Internal Server Error' });
    } finally {
      if (client) {
        await client.close();
      }
    }
  })();
});

module.exports = usersRouter;
