const express = require('express');
require('dotenv').config();
const { routes } = require('../utils');
const controllers = require('../controllers');

const collections = routes.reduce((acc, curr) => ({
  ...acc, [curr.collection]: curr.collection
}), {});

const controllerSelector = (req, res, collectionName) => {
  switch (collectionName) {
    case collections.Users:
      controllers.userController(req, res, collectionName);
      break;
    case collections.WorkExperiences:
      controllers.workController(req, res, collectionName);
      break;
    case collections.Education:
      controllers.educationController(req, res, collectionName);
      break;
    case collections.Skills:
      controllers.skillsController(req, res, collectionName);
      break;
    // case collections.Icons:
    //   controllers.iconsController(req, res, collectionName);
    //   break;
    default:
      break;
  }
};

const dataRouter = (collectionName) => {
  const router = express.Router();

  router.route('/').get(async (req, res) => {
    controllers.baseController(req, res, collectionName);
  });

  router.route('/:lang/:id').get(async (req, res) => {
    controllerSelector(req, res, collectionName);
  });

  router.route('/:id').get(async (req, res) => {
    controllerSelector(req, res, collectionName);

  });

  // router.route('/icons/:name').get(async (req, res) => {
  //   controllers.iconsController(req, res, collectionName);
  // });

  return router;
};

module.exports = dataRouter;
