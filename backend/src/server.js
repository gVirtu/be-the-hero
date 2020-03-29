const app = require('./app');

const PORT = 3333;

app.listen(PORT, function(){
  console.log("[info]", `Server is running at port: ${PORT}`);
});
