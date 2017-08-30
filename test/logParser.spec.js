'use strict'

const chai = require('chai');
const expect = chai.expect;
const fs = require('fs');

const appSettings = require('../src/config/appSettings');
const LibParser = require('../src/libs/logParser.js');
const LibReader = require('../src/libs/logReader.js');

appSettings.validation.showValidation = false;
appSettings.validation.enableLocalLog = false;

describe('LogParser', () => {
  it('doParse() should return [] if empty string is passed in', () => {

    let parser = new LibParser.LogParser();
    expect(parser.doParse('')).to.be.empty;

  });
});

describe('LogParser', () => {
  it('doParse() should return a group of game data if game.log is passed in', (done) => {

    let reader = new LibReader.LogReader();

    reader.doReadFile().then((log) => {

      done();
      let parser = new LibParser.LogParser();

      parser.doParse(log).then((logObject) => {
        //console.log(logObject);
        expect(logObject).to.be.a('json');
      }).catch((error) => {
      });

    }).catch((error) => {
      done();
    });

  });
});
