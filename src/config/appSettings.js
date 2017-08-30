const appSettings = {
  'serverAdress': 'http://localhost:',
  'serverPort': 5000,
  'logFileName': 'games.log',
  validation: {
    'showValidation': true,
    'enableLocalLog': true,
  },
  routesUrl: {
    'get': '/api/quakeLogs'
  }
}

module.exports = appSettings;
