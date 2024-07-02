const { clientConnect } = require('../utils');
const { ObjectId } = require('mongodb');

const user = async (req, res, collectionName) => {
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
        await clientConnect();
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
};



module.exports = user;