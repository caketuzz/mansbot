const { PromptDialog } = require('botfuel-dialog');
const request = require('request-promise-native');
const { Logger } = require('botfuel-dialog');

const logger = Logger('MatchTomorrowDialog');


class MatchtomorrowDialog extends PromptDialog {


    async dialogWillDisplay(userMessage, { matchedEntities, missingEntities }) {
        logger.debug('dialogWillDisplay', { matchedEntities, missingEntities });
        const options = {
            uri: 'http://worldcup.sfg.io/matches/tomorrow/?by_date=DESC',
            qs: {},
            headers: {},
            json: true, // Automatically parses the JSON string in the response
        };

        const requestResult = await request(options);
        const matchData = requestResult;
        return { matchData };
    }


}

MatchtomorrowDialog.params = {
    namespace: 'matchtoday',
    entities: {
        date: {
            dim: 'time',
        }
    }
};

module.exports = MatchtomorrowDialog;
