

class AlexaHandler {

  async process(req, res){
    if (req.body.request.type === 'LaunchRequest') { 
      res.json({
        "version": "1.0",
        "response": {
          "shouldEndSession": true,
          "outputSpeech": {
            "type": "SSML",
            "ssml": "<speak>Hmm <break time=\"1s\"/> What day do you want to know about?</speak>"
          }
        }
      });
    }
    else if (req.body.request.type === 'SessionEndedRequest') { 
      // Per the documentation, we do NOT send ANY response... I know, awkward.
      console.log('Session ended', req.body.request.reason);
    }
    else if (req.body.request.type === 'IntentRequest' && 
            req.body.request.intent.name === 'matchtoday') {

              const options = {
                uri: 'http://worldcup.sfg.io/matches/today/?by_date=DESC',
                qs: {},
                headers: {},
                json: true, // Automatically parses the JSON string in the response
            };
    
            const requestResult = await request(options);
            const matchData = requestResult;

            var msg;

    for (var c of matchArray) {

      switch (c.status) {
        case "completed":
          msg = "un match a opposé " + c.home_team.country + " à " + c.away_team.country +
            " au " + c.location + " (" + c.venue + ").";
          msg += "\nLe match s'est terminé sur le score de " + c.home_team.goals + " à " + c.away_team.goals;
          break;
        case "in progress":
          msg = "un match oppose en ce moment même " + c.home_team.country + " à " + c.away_team.country +
            " au " + c.location + " (" + c.venue + ").";
          msg += "\nÀ la " + c.time + "e minute et le score est de " + c.home_team.goals + " à " + c.away_team.goals;
          break;
        case "future":
          var date = new Date(c.datetime);
          msg = "un match opposera " + c.home_team.country + " à " + c.away_team.country +
            " au " + c.location + " (" + c.venue + ").";
          msg += "\nLe match démarrera à " + date.getHours() + ":" + date.getMinutes();
          break;
      }

      res.json({
        "version": "1.0",
        "response": {
          "shouldEndSession": true,
          "outputSpeech": {
            "type": "SSML",
            "ssml": "<speak>Hmm <break time=\"1s\"/>"+msg+"</speak>"
          }
        }
      });
    }

  }
  }

}



module.exports = AlexaHandler;
