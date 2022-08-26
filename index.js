const app = require("./routes");
const port = 3000;
//Iniciando o server na porta 3000
app.listen(port, () => {
  console.log(`Server online na porta ${port}`);
});
