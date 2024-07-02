const { clientConnect } = require('../utils');

const baseController = async (req, res, collectionName) => {
    const base = req.baseUrl;
    if (base.includes('icons')) {
        res.status(404).send({ error: 'Missing file name' });
    }
    try {
        await clientConnect();
        const collection = db.collection(collectionName);
        const data = await collection.find().toArray();
        res.status(200).send(data);
    } catch (error) {
        console.error(error.stack);
        res.status(500).send({ error, message: 'Internal Server Error' });
    }
};

module.exports = baseController;