const express = require('express');
require('dotenv').config();
const handler = require('./handlers');

const handlerSelector = (req, res, collectionName) => {
    switch (collectionName) {
        case 'icons':
            handler.icons(req, res, collectionName);
            break;
        default:
            break;
    }
};

const objectsRouter = (collectionName) => {
    const router = express.Router();

    router.route('/').get(async (req, res) => {
        handler.base(req, res, collectionName);
    });

    router.route('/:name').get(async (req, res) => {
        handlerSelector(req, res, collectionName);
    });

    return router;
};

module.exports = objectsRouter;
