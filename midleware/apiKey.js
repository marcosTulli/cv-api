require('dotenv').config();
const bcrypt = require('bcrypt');

const saltRounds = 10;
const validApiKey = process.env.API_KEY;

const apiKeyMiddleware = async (req, res, next) => {
    const incomingKey = req.header('x-api-key');
    if (!incomingKey) {
        return res.status(401).send({ message: 'API key is missing' });
    }
    const isApiKeyValid = await bcrypt.compare(incomingKey, validApiKey).finally((result) => result);

    if (isApiKeyValid) {
        next(); // API key is valid, proceed to the next middleware or route handler
    } else {
        res.status(401).send({ message: 'Invalid API key' });
    }
};

module.exports = apiKeyMiddleware;