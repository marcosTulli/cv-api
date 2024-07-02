const { clientConnect } = require('../utils');
const { ObjectId } = require('mongodb');

const educationController = async (req, res, collectionName) => {
    const id = req.params.id;
    const lang = req.params.lang;
    try {
        await clientConnect();
        const collection = db.collection(collectionName);
        const queryId = collectionName === 'Users' ? { _id: new ObjectId(id) } : { userId: new ObjectId(id) };
        const data = await collection.findOne(queryId);
        const modifiedData = data.education.map(i => { return { id: i._id, url: i.url, ...i[lang] }; });
        if (data) {
            res.send(modifiedData);
        }
        else if (data === null || data.length === 0) {
            res.status(404).send({ error: 404, message: 'No data found, check id' });
        }
    } catch (error) {
        console.error(error.stack);
        res.status(500).send({ error, message: 'Internal Server Error' });
    }
};

module.exports = educationController; 