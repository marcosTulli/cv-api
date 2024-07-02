const { clientConnect } = require('../utils');
const { ObjectId } = require('mongodb');

const iconsController = async (req, res, collectionName) => {
    const name = req.params.name;
    console.log(req.params);
    console.log(name);

    try {
        await clientConnect();
        const collection = db.collection(collectionName);
        const data = await collection.findOne({ name: name });
        // const data = await collection.find().toArray();

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
};

module.exports = iconsController;