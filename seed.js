const { MongoClient, ObjectId, Binary } = require('mongodb');
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const usersLocal = require('./data/users');
const jobsLocal = require('./data/jobs');
const educationLocal = require('./data/education');
const skillsLocal = require('./data/skills');
const { MONGO_URL, DB_NAME, OBJECTS_DB } = process.env;


const seedUsers = async () => {
  let client;
  try {
    client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log('Connected to the mongo DB');
    const db = client.db(DB_NAME);
    const usersCollection = db.collection('Users');
    await usersCollection.drop();
    await usersCollection.insertMany(usersLocal);
  } catch (error) {
    console.error(error.stack);
  } finally {
    if (client) {
      await client.close();
    }
  }
};

// seedUsers();

const seedJobs = async () => {
  let client;
  try {
    client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log('Connected to the mongo DB');
    const db = client.db(DB_NAME);
    const usersCollection = db.collection('Users');
    const jobsCollection = db.collection('WorkExperiences');
    const users = await usersCollection.find().toArray();

    const jobsWithUserId = jobsLocal.map((job, index) => {
      const user = users[index % users.length];
      return {
        userId: user._id,
        ...job
      };

    });


    await jobsCollection.drop();
    await jobsCollection.insertMany(jobsWithUserId);

  } catch (error) {
    console.error(error.stack);
  } finally {
    if (client) {
      await client.close();
    }
  }
};

// seedJobs();


const seedEducation = async () => {
  let client;
  try {
    client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log('Connected to the mongo DB');
    const db = client.db(DB_NAME);
    const usersCollection = db.collection('Users');
    const educationCollection = db.collection('Education');
    const users = await usersCollection.find().toArray();

    const educationWithUserId = educationLocal.map((job, index) => {
      const user = users[index % users.length];
      return {
        userId: user._id,
        ...job
      };

    });

    await educationCollection.drop();
    await educationCollection.insertMany(educationWithUserId);

  } catch (error) {
    console.error(error.stack);
  } finally {
    if (client) {
      await client.close();
    }
  }
};

// seedEducation();


const seedSkills = async () => {
  let client;
  try {
    client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log('Connected to the mongo DB');
    const db = client.db(DB_NAME);
    const usersCollection = db.collection('Users');
    const educationCollection = db.collection('Skills');
    const users = await usersCollection.find().toArray();

    const skillsWithUsers = skillsLocal.map((job, index) => {
      const user = users[index % users.length];
      return {
        userId: user._id,
        ...job
      };

    });

    await educationCollection.drop();
    await educationCollection.insertMany(skillsWithUsers);

  } catch (error) {
    console.error(error.stack);
  } finally {
    if (client) {
      await client.close();
    }
  }
};

// seedSkills()






const seedIcon = async () => {
  let client;
  try {
    client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log('Connected to the mongo DB');
    const db = client.db(OBJECTS_DB);
    const iconsCollection = db.collection('icons');

    const publicDir = path.join(__dirname, 'public');
    const files = fs.readdirSync(publicDir, (err, files) => {
      if (err) {
        console.log(err);
        return;
      }
      else return files;

    });
    const fileName = files[32];
    const filePath = path.join(__dirname, `public/${fileName}`);
    const fileBuffer = fs.readFileSync(filePath);

    const fileObject = {
      _id: new ObjectId(),
      name: fileName,
      file: fileBuffer
    };


    // await iconsCollection.drop();
    await iconsCollection.insertOne(fileObject);

  } catch (error) {
    console.error(error.stack);
  } finally {
    if (client) {
      await client.close();
    }
  }
};

seedIcon();