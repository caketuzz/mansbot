const { PromptDialog } = require('botfuel-dialog');
const request = require('request-promise-native');
const { Logger } = require('botfuel-dialog');

const logger = Logger('CurrentmatchdetailDialog');


class CurrentmatchdetailDialog extends PromptDialog {


    async dialogWillDisplay(userMessage, { matchedEntities, missingEntities }) {
        logger.debug('dialogWillDisplay', { matchedEntities, missingEntities });
        const options = {
            uri: 'https://worldcup.sfg.io/matches/current',
            qs: {},
            headers: {},
            json: true, // Automatically parses the JSON string in the response
        };

        const requestResult = await request(options);
        const curMatchData = requestResult;
        return  curMatchData ;
    }


}

CurrentmatchdetailDialog.params = {
    namespace: 'currentmatchdetail',
    entities: {
        match: {
            dim: 'id',
        }
    }
};

module.exports = CurrentmatchdetailDialog;
