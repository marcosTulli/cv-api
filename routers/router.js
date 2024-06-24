const express = require('express');
require('dotenv').config();
const handler = require('./handlers');
const routes = require('./routes');

const collections = routes.reduce((acc, curr) => ({
  ...acc, [curr.collection]: curr.collection
}), {});

const createRouter = (collectionName) => {
  const router = express.Router();

  router.route('/').get(async (req, res) => {
    handler.base(req, res, collectionName);
  });

  router.route('/:lang/:id').get(async (req, res) => {
    switch (collectionName) {
      case collections.Users:
        handler.users(req, res, collectionName);
        break;
      case collections.WorkExperiences:
        handler.work(req, res, collectionName);
        break;
      case collections.Education:
        handler.education(req, res, collectionName);
        break;
      case collections.skills:
        handler.skills(req, res, collectionName);
        break;
      default:
        break;
    }
  });

  return router;
};

module.exports = createRouter;
