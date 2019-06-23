const request = require("request");
const env = require('../../../core/src/environment/environment');

function executeMap(action) {
    return new Promise((resolve, reject) => {
        let executionUrl = `${env.server_url}/api/maps/${action.params.MAP}/execute/`;
        if (action.params.VERSION) {
            executionUrl += action.params.VERSION;
        }

        request.post(executionUrl, {
            form: {
                trigger: (action.params.TRIGGER || 'Started by map-executer plugin'),
                agents: action.params.AGENTS,
                mergeConfig: action.params.MERGE_CONFIG,
                config:typeof action.params.CONFIG == "object" ? JSON.stringify(action.params.CONFIG):action.params.CONFIG
            }
        }, function (error, response, body) {
            if (error || response.statusCode !== 200) {
                return reject(body || error);
            }
            console.log("You can view the results of the map by entering");
            console.log(`/maps/${action.params.MAP}/results`);
            return resolve(body);
        });

    });
}

module.exports = {
    executeMap : executeMap
}