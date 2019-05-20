const AppenderTypes = require('./logger-service/logger-service').AppenderTypes;
const logger = require('./logger-service/logger-service').logger;
const logsStore = require('./logs-store/logs-store')

module.exports = {
    AppenderTypes,
    logger,
    logsStore
}