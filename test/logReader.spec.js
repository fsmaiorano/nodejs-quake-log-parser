'use strict'

const chai = require('chai');
const expect = chai.expect;
const fs = require('fs');
const appSettings = require('../src/config/appSettings');
const LibReader = require('../src/libs/logReader.js');

appSettings.validation.showValidation = false;
appSettings.validation.enableLocalLog = false;

describe('LogReader', () => {
  it('doReadFile() should return [] if empty string is passed in', () => {
    let reader = new LibReader.LogReader();
    expect(reader.doReadFile('')).to.be.empty;
  });
});

describe('LogReader', () => {
  it('doReadFile() should read and return a content of log file', (done) => {
    let reader = new LibReader.LogReader();
    reader.doReadFile().then((log) => {
      // console.log(log);
      expect(data.toString()).to.be.a('string');
    }).catch((error) => {
      done();
    });
  });
});
