
const { MongoClient, ObjectId } = require('mongodb');
const { MONGO_URL, DB_NAME } = process.env;
require('dotenv').config();

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

const handler = {
    base: async (req, res, collectionName) => {

        try {
            await connectToMongo();
            const collection = db.collection(collectionName);
            const data = await collection.find().toArray();
            res.status(200).send(data);
        } catch (error) {
            console.error(error.stack);
            res.status(500).send({ error, message: 'Internal Server Error' });
        }
    },

    users: async (req, res, collectionName,) => {
        const id = req.params.id;
        const lang = req.params.lang;
        const projection = {
            name: 1,
            email: 1,
            phone: 1,
            location: 1,
            availableLanguages: 1,
            cvs: 1,
            network: 1,
            info: { $objectToArray: "$info" }
        };
        try {
            await connectToMongo();
            const collection = db.collection(collectionName);
            const queryId = collectionName === 'Users' ? { _id: new ObjectId(id) } : { userId: new ObjectId(id) };
            const data = await collection.findOne(queryId, { projection });
            const info = data.info.find(x => x.k === lang);
            data.info = info ? info.v : { candidateTitle: '', about: '', languages: [] };
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
    },

    work: async (req, res, collectionName) => {
        const id = req.params.id;
        const lang = req.params.lang;
        try {
            await connectToMongo();
            const collection = db.collection(collectionName);
            const queryId = collectionName === 'wWorkExperience' ? { _id: new ObjectId(id) } : { userId: new ObjectId(id) };
            const data = await collection.findOne(queryId);

            const transformedData = {
                _id: data._id,
                userId: data.userId,
                experiences: data.experiences.map(exp => ({
                    ...exp,
                    info: exp.info[lang] || {}
                }))
            };

            if (data) {
                res.send(transformedData);
            }
            else if (data === null || data.length === 0) {
                res.status(404).send({ error: 404, message: 'No data found, check id' });
            }
        } catch (error) {
            console.error(error.stack);
            res.status(500).send({ error, message: 'Internal Server Error' });
        }
    },
    education: async (req, res, collectionName) => {
        const id = req.params.id;
        try {
            await connectToMongo();
            const collection = db.collection(collectionName);
            const queryId = collectionName === 'Education' ? { _id: new ObjectId(id) } : { userId: new ObjectId(id) };
            const data = await collection.findOne(queryId);
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
    },
    skills: async (req, res, collectionName) => {
        const id = req.params.id;
        try {
            await connectToMongo();
            const collection = db.collection(collectionName);
            const queryId = collectionName === 'Users' ? { _id: new ObjectId(id) } : { userId: new ObjectId(id) };
            const data = await collection.findOne(queryId, { projection });

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
    }
};


module.exports = handler;