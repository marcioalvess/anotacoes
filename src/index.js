const express = require ('express');
const routes = require ('./routes');
const cors = require ('cors');

const app = express();
/* o require vai buscar o arquivo no caminho que indico
e já deixa a comunicação feita */
require('./config/dbConfig');

app.use(cors());
app.use(express.json()); 
app.use(routes);

//recebendo na porta 3333
app.listen(3333);