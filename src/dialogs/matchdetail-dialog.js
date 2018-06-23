const { PromptDialog } = require('botfuel-dialog');
const request = require('request-promise-native');
const { Logger } = require('botfuel-dialog');

const logger = Logger('CurrentmatchdetailDialog');

const dict = {
  'Allemagne': 'GER',
  'Mexique': 'MEX',
  'Suède': 'SWE',
  'Corée du Sud': 'KOR',
  'Belgique': 'BEL',
  'Panama': 'PAN',
  'Tunisie': 'TUN',
  'Angleterre': 'ENG',
  'Colombie': 'COL',
  'Japon': 'JPN',
  'Pologne': 'POL',
  'Sénégal': 'SEN',
  'Russie': 'RUS',
  'Egypte': 'EGY',
  'Portugal': 'POR',
  'Maroc': 'MAR',
  'Uruguay': 'URU',
  'Arabie saoudite': 'KSA',
  'Iran': 'IRN',
  'Espagne': 'ESP',
  'Danmark': 'DAN',
  'Australie': 'AUS',
  'France': 'FRA',
  'Pérou': 'PER',
  'Argentine': 'ARG',
  'Croatie': 'CRO',
  'Brésil': 'BRA',
  'Costa Rica': 'CRC',
  'Nigeria': 'NGA',
  'Islande': 'ISL',
  'Serbie': 'SRB',
  'Suisse': 'SUI',

};

class MatchdetailDialog extends PromptDialog {


  async dialogWillDisplay(userMessage, { matchedEntities, missingEntities }) {
    logger.debug('dialogWillDisplay', { matchedEntities, missingEntities });
    const options = {
        uri: 'https://worldcup.sfg.io/matches',
        qs: {},
        headers: {},
        json: true, // Automatically parses the JSON string in the response
      };
 
    let allMatches = {};
    //console.log(matchedEntities);
    if (matchedEntities.team1 !=null && matchedEntities.team2!=null) {
        allMatches = await request(options);

        // console.log(matchedEntities.team1);
        // console.log(matchedEntities.team2);
        const country1 = dict[matchedEntities.team1.values[0].value];
        const country2 = dict[matchedEntities.team2.values[0].value];

        //console.log(`${country1  } vs. ${ country2}`);

        var match;
        for (var m of allMatches){
            //console.log("match : "+m.home_team.code+" vs " + m.away_team.code);
            if ( (m.home_team.code === country1 && m.away_team.code === country2) ||
                (m.home_team.code === country2 && m.away_team === country1) ) {
                  //console.log("match trouvé: "+m);
                  const matchData = m;
                return { matchData } ;
            }
        }
      }

    return { allMatches };
  }


}

MatchdetailDialog.params = {
  namespace: 'currentmatchdetail',
  entities: {
    team1: {
        dim: 'country',
      },
    team2: {
        dim: 'country',
      },
  },
};


module.exports = MatchdetailDialog;
