const express = require('express');
const ngoController = require('./controllers/ngoController');
const incidentController = require('./controllers/incidentController');

const routes = express.Router();

routes.get('/', (_request, response) => {
  return response.json({
    message: 'Hello world!'
  });
});

routes.get('/ngos', ngoController.index);
routes.post('/ngos', ngoController.create);

routes.get('/incidents', incidentController.index);
routes.post('/incidents', incidentController.create);
routes.delete('/incidents/:id', incidentController.delete);

module.exports = routes;
