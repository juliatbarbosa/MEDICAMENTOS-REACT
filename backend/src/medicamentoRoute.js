const medicamentoControler = require('./medicamentoController');

module.exports = (app) => {
    app.post('/medicamento', medicamentoControler.post);
    app.put('/medicamento/:id', medicamentoControler.put);
    app.delete('/medicamento/:id', medicamentoControler.delete);
    app.get('/medicamento/', medicamentoControler.get);
    app.get('/medicamento/:id', medicamentoControler.getById);
    app.post('/medicamento/criartabela', medicamentoControler.createTable);
}