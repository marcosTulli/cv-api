require('dotenv').config();
const bcrypt = require('bcrypt');
const saltRounds = 10;

const validApiKey = process.env.API_KEY;

const apiKeyMiddleware = async (req, res, next) => {
    const incomingKey = req.header('x-api-key');
    const hashed = await bcrypt.hash(validApiKey, saltRounds).finally((hash) => { return hash; });

    if (!incomingKey) {
        return res.status(401).send({ message: 'API key is missing' });
    }

    const isApiKeyValid = await bcrypt.compare(validApiKey, incomingKey).finally((result) => { result; });

    if (isApiKeyValid) {
        next();
    } else {
        res.status(401).send({ message: 'Invalid API key' });
    }
};

module.exports = apiKeyMiddleware;