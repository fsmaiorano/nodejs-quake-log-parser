const server = require('./config/server');
const appSettings = require('./config/appSettings')

server.listen(appSettings.serverPort, () => {
  console.log(`Server Online - [${appSettings.serverAdress + appSettings.serverPort}]`)
});
