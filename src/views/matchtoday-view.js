const { PromptView, BotTextMessage } = require('botfuel-dialog');

class MatchtodayView extends PromptView {
  render(userMessage, { matchedEntities, missingEntities, matchData }) {
    const messages = [];
    var matchArray = matchData;
    // JSON.parse(matchData);
    var msg;

    messages.push(new BotTextMessage("les matchs d'aujourd'hui sont les suivants:"));
    for (var c of matchArray){
      console.log(matchArray[0].home_team.country);
      msg = "un match oppose " + c.home_team.country + " à " + c.away_team.country +
       " au "+c.location+" ("+c.venue+").";
       switch(c.status){
         case "completed":
            msg+="\nLe match s'est terminé sur le score de "+c.home_team.goals+" à "+c.away_team.goals;
         break;
         case "in progress":
             msg+="\nLe match en est à la "+c.time+"e minute et le score est de "+c.home_team.goals+" à "+c.away_team.goals;
         break;
         case "future":
         var date = new Date(c.datetime);
          msg+="\nLe match démarrera à "+ date.getHours() + ":" + date.getMinutes();
          break;
       }
        messages.push(new BotTextMessage(msg));
    }


    return messages;
  }
}

module.exports = MatchtodayView;
