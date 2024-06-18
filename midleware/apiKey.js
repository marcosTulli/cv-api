require('dotenv').config();
const validApiKey = process.env.API_KEY;

const apiKeyMiddleware = async (req, res, next) => {

    const incomingKey = await req.header('x-api-key');


    if (!incomingKey) {
        return res.status(401).send({ message: 'API key is missing' });
    }

    // const isApiKeyValid = await bcrypt.compare(validApiKey, incomingKey).finally((result) => { result; });
    const isApiKeyValid = validApiKey === incomingKey;

    if (isApiKeyValid) {
        next();
    } else {
        res.status(401).send({ message: 'Invalid API key' });
    }
};

module.exports = apiKeyMiddleware;