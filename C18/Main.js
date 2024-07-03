const Model = require('./model')
const View = require('./view');
const Controller = require('./controller');

const model = new Model('./university.db');
const view = new View();
const controller = new Controller(model,view);

controller.run()
