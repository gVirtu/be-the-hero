const express = require('express');
const ngoController = require('./controllers/ngoController');

const routes = express.Router();

routes.get('/', (_request, response) => {
  return response.json({
    message: 'Hello world!'
  });
});

routes.get('/ngos', ngoController.index);
routes.post('/ngos', ngoController.create);

module.exports = routes;
