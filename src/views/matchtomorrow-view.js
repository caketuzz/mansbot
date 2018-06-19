const { PromptView, BotTextMessage } = require('botfuel-dialog');

class MatchtomorrowView extends PromptView {
  render(userMessage, { matchedEntities, missingEntities, matchData }) {
    const messages = [];
    var matchArray = matchData;
    // JSON.parse(matchData);
    var msg;

    messages.push(new BotTextMessage("les matchs de demain seront les suivants:"));
    for (var c of matchArray) {
      console.log(matchArray[0].home_team.country);

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
      messages.push(new BotTextMessage(msg));
    }


    return messages;
  }
}

module.exports = MatchtomorrowView;
