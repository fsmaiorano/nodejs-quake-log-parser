const fs = require('fs');
const appSettings = require('../config/appSettings');

class LogReader {

  constructor() {
  }

  doReadFile() {
    return new Promise((resolve, reject) => {
      fs.readFile(appSettings.logFileName, function (err, logData) {
        if (err) {
          reject(err);
        }
        else {
          resolve(logData.toString());
        }
      })
    }).catch((err) => {
      return {
        error: "500",
        message: err.message
      };
    });
  }
}

exports.LogReader = LogReader;
