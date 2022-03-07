const express = require ('express');
const routes = express.Router();

//aqui eu gerencio minhas rotas, não precisando mais do app.get
const AnnotationController = require ('./controllers/AnnotationController');
const ContentController = require('./controllers/ContentController');
const PriorityController = require('./controllers/PriorityController');

//Rota Cadernos
routes.post ('/annotations', AnnotationController.create);
routes.get('/annotations', AnnotationController.read);
routes.delete('/annotations/:id', AnnotationController.delete);

//Rota prioridade
routes.get('/priorities', PriorityController.read);

//Vai buscar e alterar de true para false e vice-versa
routes.post('/priorities/:id', PriorityController.update);

//Rota do conteudo(conteudo da anotação)
routes.post('/contents/:id', ContentController.update);

module.exports = routes;