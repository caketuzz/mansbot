

const logger = require('logtown')('SynchronousAdapter');
const express = require('express');

const url = require('url');
const { Adapter } = require('botfuel-dialog');
const { BotfuelAdapter } = require('botfuel-dialog');
const bodyParser = require('body-parser');
const alexaVerifier = require('alexa-verifier'); 

// absolute urls to static and template folders
const PORT = process.env.PORT || process.env.BOTFUEL_ADAPTER_PORT || 5000;
const BOT_URL = process.env.BOT_URL || `http://localhost:${PORT}`;
const STATIC_BASE_URL = url.resolve(BOT_URL, 'static/');
const TEMPLATE_BASE_URL = url.resolve(BOT_URL, 'templates/');

let botfuelAdapter = null;
/* Alexa Verifier */
function requestVerifier(req, res, next) {
  alexaVerifier(
      req.headers.signaturecertchainurl,
      req.headers.signature,
      req.rawBody,
      function verificationCallback(err) {
          if (err) {
              res.status(401).json({ message: 'Verification Failure', error: err });
          } else {
              next();
          }
      }
  );
}

class SynchronousAdapter extends Adapter {
    

  async run() {
    logger.debug('run');
    const app = express();
    botfuelAdapter = new BotfuelAdapter(this.bot);
    app.use(bodyParser.json({
      verify: function getRawBody(req, res, buf) {
        req.rawBody = buf.toString();
    }
    }));
    app.post('/synchook', (req, res) => this.handleRequest(req, res));
    app.post('/webhook', (req, res) => this.handleWebchatRequest(req, res));
    app.post('/alexa', requestVerifier, function(req, res) {
      console.log('Session ended', req.body.request);
      const alexaHandler = AlexaHandler();
        alexaHandler.process(res, req);
      // We'll fill this out later!
        //res.json({ hello: 'world' });
    });
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