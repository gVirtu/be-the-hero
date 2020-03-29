const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const ngoController = require('./controllers/ngoController');
const profileController = require('./controllers/profileController');
const incidentController = require('./controllers/incidentController');
const sessionController = require('./controllers/sessionController');

const routes = express.Router();

routes.get('/', (_request, response) => {
  return response.json({
    message: 'Hello world!'
  });
});

routes.post('/sessions', sessionController.create);

routes.get('/ngos', ngoController.index);
routes.post('/ngos', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.number().required().min(10).max(11),
    city: Joi.string().required(),
    uf: Joi.string().required().length(2)
  })
}), ngoController.create);

routes.get('/profile', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
}), profileController.index);

routes.get('/incidents', celebrate({
  [Segments.QUERY]: Joi.object({
    page: Joi.number(),
  })
}), incidentController.index);

routes.post('/incidents', incidentController.create);

routes.delete('/incidents/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  })
}), incidentController.delete);

module.exports = routes;
