const express = require('express');
require('dotenv').config();
const controllers = require('../controllers');

const dataRouter = (collectionName) => {
    const router = express.Router();

    router.route('/').get(async (req, res) => {
        controllers.baseController(req, res, collectionName);
    });

    router.route('/:name').get(async (req, res) => {
        controllers.iconsController(req, res, collectionName);

    });


    return router;
};

module.exports = dataRouter;
