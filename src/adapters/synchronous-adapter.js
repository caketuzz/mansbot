

const logger = require('logtown')('SynchronousAdapter');
const express = require('express');

const url = require('url');
const { Adapter } = require('botfuel-dialog');
const { BotfuelAdapter } = require('botfuel-dialog');
const bodyParser = require('body-parser');


// absolute urls to static and template folders
const PORT = process.env.PORT || process.env.BOTFUEL_ADAPTER_PORT || 5000;
const BOT_URL = process.env.BOT_URL || `http://localhost:${PORT}`;
const STATIC_BASE_URL = url.resolve(BOT_URL, 'static/');
const TEMPLATE_BASE_URL = url.resolve(BOT_URL, 'templates/');


let botfuelAdapter = null;

class SynchronousAdapter extends Adapter {
  
  async run() {
    logger.debug('run');
    const app = express();
    botfuelAdapter = new BotfuelAdapter(this.bot);
    app.use(bodyParser.json());
    app.post('/synchook', (req, res) => this.handleRequest(req, res));
    app.post('/webhook', (req, res) => this.handleWebchatRequest(req, res));
    app.listen(PORT, () => logger.info('run: listening on port', PORT));
  }

  async handleWebchatRequest(req, res) {
      botfuelAdapter.handleRequest(req, res);
  }

  async handleRequest(req, res) {
    const userMessage = this.someProcessing(req);
    logger.debug('handleRequest', userMessage);
    await this.addUserIfNecessary(userMessage.user);

    const botMessages = await this.bot.handleMessage(this.extendMessage(userMessage));

    const responseBody = this.someOtherProcessing(botMessages);
    res.status(200).send(responseBody);
  }

  someProcessing(req){
      return req.body;
  }
  someOtherProcessing(botMessages){
    return botMessages;
  }

}

module.exports = SynchronousAdapter;