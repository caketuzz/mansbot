const { PromptDialog } = require('botfuel-dialog');
const request = require('request-promise-native');
const { Logger } = require('botfuel-dialog');

const logger = Logger('MatchTodayDialog');


class MatchtodayDialog extends PromptDialog {


    async dialogWillDisplay(userMessage, { matchedEntities, missingEntities }) {
        logger.debug('dialogWillDisplay', { matchedEntities, missingEntities });
        const options = {
            uri: 'http://worldcup.sfg.io/matches/today/?by_date=DESC',
            qs: {},
            headers: {},
            json: true, // Automatically parses the JSON string in the response
        };

        const requestResult = await request(options);
        const matchData = requestResult;
        return { matchData };
    }


}

MatchtodayDialog.params = {
    namespace: 'matchtoday',
    entities: {
        time: {
            dim: 'time',
        }
    }
};

module.exports = MatchtodayDialog;
