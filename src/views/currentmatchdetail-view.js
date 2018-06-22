const { PromptView, BotTextMessage } = require('botfuel-dialog');

class CurrentmatchdetailView extends PromptView {
    render(userMessage, { matchedEntities, missingEntities, curMatchData }) {
        const messages = [];
        var msg;

        if (curMatchData == null || curMatchData.length == 0) {
            messages.push(new BotTextMessage("Il n'y a pas de match en cours"));
        }
        else {
            var msg = "le match oppose " + curMatchData.home_team.country + " à " + 
            curMatchData.away_team.country +
            " au " + curMatchData.location + " (" + curMatchData.venue + ").";
            msg += "\nÀ la " + curMatchData.time + "e minute et le score est de \n" + 
            curMatchData.home_team.code+" : "+ curMatchData.home_team.goals + " : " + 
            curMatchData.away_team.goals + " " + curMatchData.away_team.code;
                        

            // messages.push(new BotTextMessage("les matchs d'aujourd'hui sont les suivants:"));
            // for (var c of matchArray) {
            //     console.log(matchArray[0].home_team.country);

            //     switch (c.status) {
            //         case "completed":
            //             msg = "un match a opposé " + c.home_team.country + " à " + c.away_team.country +
            //                 " au " + c.location + " (" + c.venue + ").";
            //             msg += "\nLe match s'est terminé sur le score de " + c.home_team.goals + " à " + c.away_team.goals;
            //             break;
            //         case "in progress":
            //             msg = "un match oppose en ce moment même " + c.home_team.country + " à " + c.away_team.country +
            //                 " au " + c.location + " (" + c.venue + ").";
            //             msg += "\nÀ la " + c.time + "e minute et le score est de " + c.home_team.goals + " à " + c.away_team.goals;
            //             break;
            //         case "future":
            //             var date = new Date(c.datetime);
            //             msg = "un match opposera " + c.home_team.country + " à " + c.away_team.country +
            //                 " au " + c.location + " (" + c.venue + ").";
            //             msg += "\nLe match démarrera à " + date.getHours() + ":" + date.getMinutes();
            //             break;
            //     }
                messages.push(new BotTextMessage(msg));
            }

        
        return messages;
    }
}

module.exports = CurrentmatchdetailView;
