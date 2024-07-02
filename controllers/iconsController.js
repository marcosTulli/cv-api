const { clientConnect } = require('../utils');

const iconsController = async (req, res, collectionName) => {
    const name = req.params.name;
    try {
        await clientConnect();
        const collection = db.collection(collectionName);
        const data = await collection.findOne({ name });

        if (data) {
            res.send(data.key);
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