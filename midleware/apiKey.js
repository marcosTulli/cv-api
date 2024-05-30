// middleware/apiKeyMiddleware.js
require('dotenv').config();

const apiKeyMiddleware = (req, res, next) => {
    const apiKey = req.header('x-api-key');
    const validApiKey = process.env.API_KEY;

    if (apiKey && apiKey === validApiKey) {
        next(); // API key is valid, proceed to the next middleware or route handler
    } else {
        res.status(401).send({ message: 'Invalid API key' });
    }
};

module.exports = apiKeyMiddleware;