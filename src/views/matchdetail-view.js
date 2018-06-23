const {
  PromptView,
  BotTextMessage,
  BotTableMessage
} = require("botfuel-dialog");

class MatchdetailView extends PromptView {
  render(userMessage, { matchedEntities, missingEntities, matchData }) {
    const messages = [];
    let msg;

    console.log("matchview: " + matchData.datetime);
    if (matchData == null) {
      messages.push(
        new BotTextMessage("aucun match n'a été trouvé entre ces deux équipes")
      );
    } else {
      if (matchData.status === "future") {
        messages.push(new BotTextMessage("le match n'a pas encore eu lieu"));
        return messages; // on return directement
      } else if (matchData.status === "in progress") {
        messages.push(new BotTextMessage("le match est en cours"));
      } else if (matchData.status === "completed") {
        let date = new Date(matchData.datetime);
        let options = {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric"
        };
        messages.push(
          new BotTextMessage(
            `le match s'est joué le ${date.toLocaleDateString(
              "fr-FR",
              options
            )}`
          )
        );
      }
      const lignes = [];
      const key_home = matchData.home_team_country;
      const key_away = matchData.away_team_country;
      const sthome = matchData.home_team_statistics;
      const staway = matchData.away_team_statistics;
      console.log(`attempts_on_goal:${sthome.attempts_on_goal}`);
      //   const stat = "stat";
      lignes.push({
        stat: "attempts_on_goal",
        home: sthome.attempts_on_goal,
        away: staway.attempts_on_goal
      });
      lignes.push({
        stat: "on_target",
        home: sthome.on_target,
        away: staway.on_target
      });
      lignes.push({
        stat: "on_target",
        home: sthome.on_target,
        away: staway.on_target
      });
      lignes.push({
        stat: "off_target",
        home: sthome.off_target,
        away: staway.off_target
      });
      lignes.push({
        stat: "blocked",
        home: sthome.blocked,
        away: staway.blocked
      });
      lignes.push({
        stat: "corners",
        home: sthome.corners,
        away: staway.corners
      });
      lignes.push({
        stat: "offsides",
        home: sthome.offsides,
        away: staway.offsides
      });
      lignes.push({
        stat: "ball_possession",
        home: sthome.ball_possession,
        away: staway.ball_possession
      });
      lignes.push({
        stat: "pass_accuracy",
        home: sthome.pass_accuracy,
        away: staway.pass_accuracy
      });
      lignes.push({
        stat: "num_passes",
        home: sthome.num_passes,
        away: staway.num_passes
      });
      lignes.push({
        stat: "passes_completed",
        home: sthome.passes_completed,
        away: staway.passes_completed
      });
      lignes.push({
        stat: "distance_covered",
        home: sthome.distance_covered,
        away: staway.distance_covered
      });
      lignes.push({
        stat: "balls_recovered",
        home: sthome.balls_recovered,
        away: staway.balls_recovered
      });
      lignes.push({
        stat: "tackles",
        home: sthome.tackles,
        away: staway.tackles
      });
      lignes.push({
        stat: "clearances",
        home: sthome.clearances,
        away: staway.clearances
      });
      lignes.push({
        stat: "yellow_cards",
        home: sthome.yellow_cards,
        away: staway.yellow_cards
      });
      lignes.push({
        stat: "red_cards",
        home: sthome.red_cards,
        away: staway.red_cards
      });
      lignes.push({
        stat: "fouls_committed",
        home: sthome.fouls_committed,
        away: staway.fouls_committed
      });

      messages.push(
        new BotTableMessage({
          rows: lignes,
          schema: [
            { key: "stat", label: "stat" },
            { key: "home", label: key_home },
            { key: "away", label: key_away }
          ]
        })
      );
    }

    return messages;
  }
}

module.exports = MatchdetailView;
