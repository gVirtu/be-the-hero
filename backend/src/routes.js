const express = require('express');

const routes = express.Router();

routes.get('/', (_request, response) => {
  return response.json({
    message: 'Hello world!'
  });
});

module.exports = routes;
