const appSettings = require('../config/appSettings');
const debugLog = require('./debugLog');

class LogParser {

  constructor() {

  }

  doParse(log) {
    return new Promise((resolve, reject) => {

      let initGames = [];
      let lines = log.split(/[\n]/);

      lines.map((line) => {

        let arrayLine = line.trim().split(/[\\]/);
        let lineType = arrayLine[0].split(' ');

        switch (lineType[1]) {
          case 'InitGame:':
            newGame(initGames, arrayLine);
            break;
          case 'ClientUserinfoChanged:':
            newPlayer(initGames, arrayLine, line);
            break;
          case 'Kill:':
            countKills(initGames, arrayLine);
        }

      });

      resolve(initGames);

    }).catch((err) => {
      return {
        error: "500",
        message: err.message
      };
    });
  }

}

//Starts a new object of 'game'
function newGame(initGames, arrayLine) {
  let game = {};
  appSettings.validation.enableLocalLog === true ? debugLog("NG", initGames.length) : '';
  initGames.push(
    {
      'game': {
        map: getMapName(arrayLine),
        date: getDate(arrayLine),
        total_kills: 0,
        players: [],
        kills: {},
      },
      'validation': {
        worldKills: 0,
        selfKills: 0,
        countKills: 0
      }
    }
  );
  if (!appSettings.validation.showValidation) delete initGames[initGames.length - 1].validation;
  initGames[initGames.length - 1].game.push + 1;
}

//Control of new players
function newPlayer(initGames, arrayLine, line) {
  let startIndex = line.indexOf('n\\');
  let endIndex = line.indexOf('\\t') - 1;
  let charNumber = endIndex - startIndex;
  let player = line.trim().substr(startIndex, charNumber);
  player = player.replace(/\\/g, '');
  appSettings.validation.enableLocalLog === true ? debugLog("NP", player) : '';
  if (initGames[initGames.length - 1].game.players.indexOf(player) === -1) {
    initGames[initGames.length - 1].game.players.push(player);
    initGames[initGames.length - 1].game.kills[player] = 0;
  }
}

//Count the total kill and count a kill for player or world
function countKills(initGames, arrayLine) {
  initGames[initGames.length - 1].game.total_kills++;
  let user = arrayLine[0].includes('<world>');
  if (user) {
    countWorldKill(initGames, arrayLine);
    return;
  }
  countUserKill(initGames, arrayLine);

  //Count kills by world
  function countWorldKill(initGames, arrayLine) {
    let killed = recoverPlayer(arrayLine, 'world');
    appSettings.validation.enableLocalLog === true ? debugLog("CK", killed.player, '-') : '';
    initGames[initGames.length - 1].game.kills[killed.player]--;
    if (appSettings.validation.showValidation) {
      initGames[initGames.length - 1].validation.worldKills++
      initGames[initGames.length - 1].validation.countKills++
    }
    return;
  }

  //Count kills by player
  function countUserKill(initGames, arrayLine) {
    let killer = recoverPlayer(arrayLine, 'player');
    if (killer.validKill) {
      appSettings.validation.enableLocalLog === true ? debugLog("CK", killer.player, '+') : '';
      initGames[initGames.length - 1].game.kills[killer.player]++;
    }
    else {
      if (appSettings.validation.showValidation) {
        initGames[initGames.length - 1].validation.selfKills++
      }
      appSettings.validation.enableLocalLog === true ? debugLog("NV", killer.player, '*') : '';
    }
    return;
  }
}

//Get player name - killer and killed
function recoverPlayer(logLine, deadBy) {
  let action = { player: undefined, validKill: undefined };

  //Validate if the death is caused by world or another player
  if (deadBy === 'world') {
    let player = logLine[0].substr(logLine[0].indexOf('killed'));
    player = player.substr(7, player.indexOf('by'));
    player = player.split('by');
    action.player = player[0].trim();
    action.validKill = true;
  }
  else {
    let player = logLine[0].substr(logLine[0].lastIndexOf(':')).substr(2);
    player = player.slice(0, player.indexOf('killed')).trim();

    let killed = logLine[0].substr(logLine[0].lastIndexOf('killed')).substr(7);
    killed = killed.slice(0, killed.indexOf('by')).trim();
    action.player = player;

    //Validate if player did not kill himself
    if (player !== killed) {
      action.validKill = true;
    }
    else {
      action.validKill = false;
    }
  }
  return action;
}

//Get date of match
function getDate(arrayLine) {
  for (let i = 0; i <= arrayLine.length; i++) {
    if (arrayLine[i] === 'version') {
      let date = arrayLine[i + 1].substr(23);
      return date;
    }
  }
}

//Get mapname of match
function getMapName(arrayLine) {
  for (let i = 0; i <= arrayLine.length; i++) {
    if (arrayLine[i] === 'mapname') {
      let map = arrayLine[i + 1];
      return map;
    }
  }
}

exports.LogParser = LogParser;

