const appSettings = require('../config/appSettings')

const routes = (app) => {

    app.get(appSettings.routesUrl.get, (req, res) => {
        app.src.controllers.quakeLogController.getLog(app, req, res);
    });

}

module.exports = routes
