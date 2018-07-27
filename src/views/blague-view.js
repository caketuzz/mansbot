const { View, BotTextMessage } = require('botfuel-dialog');

class GreetingsView extends View {
  render() {
    return [
      new BotTextMessage('C\'est un belge qui rentre dans un bar... Il demande au serveur \"Je peux avoir un Coca Light?\"' ),
      new BotTextMessage('Le serveur: \"On n\'en a plus, je vous mets 1 - 0 ?\” ' ),
    ];
  }
}

module.exports = GreetingsView;
