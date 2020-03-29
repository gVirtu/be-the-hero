const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const routes = require('./routes');

const app = express();

const PORT = 3333;

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());

app.listen(PORT, function(){
  console.log("[info]", `Server is running at port: ${PORT}`);
});
