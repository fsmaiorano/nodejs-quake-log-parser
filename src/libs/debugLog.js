const log = (etapa, param, param2) => {

  switch (etapa) {
    case 'NG':
      // New Game
      console.log(`\n ---| Starting a new game! |---> [${param}] \n`);
      break;
    case 'NP':
      // New Player
      console.log(`---| ${param} joined the match! |`);
      break;
    case 'CK':
      // Counter Kill
      console.log(`---| ${param} [${param2}] |`);
      break;
    case 'NV':
      // Not Valid
      console.log(`---| Outch!  ${param} killed yourself! [${param2}] |`);
      break;
    default:
      break;
  }

}

module.exports = log
