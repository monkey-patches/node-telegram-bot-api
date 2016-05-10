var debug = require('debug')('monkey-patches:node-telegram-bot-api');

function patchStopPolling(TelegramBot) {
    TelegramBot.prototype.stopPolling = function () {
        if (this._polling) {
            this._polling.abort = true;
            this._polling.lastRequest.cancel('Stop polling');
        }
        this._polling = null;
    }
}

function patchEmitUpdate(TelegramBot) {
    var _processUpdate = TelegramBot.prototype._processUpdate;
    TelegramBot.prototype._processUpdate = function (update) {
        debug('Process Update %j', update);
        this.emit('update', update);
        _processUpdate.call(this, update);
    }
}

function patchEmitCallbackQuery(TelegramBot) {
    var _processUpdate = TelegramBot.prototype._processUpdate;
    TelegramBot.prototype._processUpdate = function (update) {
        _processUpdate.call(this, update);
        var callbackQuery = update.callback_query;
        if (callbackQuery) {
            debug('Process Update callback_query %j', callbackQuery);
            this.emit('callback_query', callbackQuery);
        }

    }
}

function patchSendVenue(TelegramBot)
{
    /**
     * Send venue.
     * Use this method to send information about a venue.
     *
     * @param  {Number|String} chatId  Unique identifier for the message recipient
     * @param  {Float} latitude Latitude of location
     * @param  {Float} longitude Longitude of location
     * @param  {String} title Name of the venue
     * @param  {String} address Address of the venue
     * @param  {Object} [options] Additional Telegram query options
     * @return {Promise}
     * @see https://core.telegram.org/bots/api#sendvenue
     */
    TelegramBot.prototype.sendVenue = function sendVenue(chatId, latitude, longitude, title, address, form) {
        form = form || {};
        form.chat_id = chatId;
        form.latitude = latitude;
        form.longitude = longitude;
        form.title = title;
        form.address = address;
        return this._request('sendVenue', {form: form});
    }
}

module.exports = function (TelegramBot, options) {
    options = options || {};
    if (options.stopPolling) {
        patchStopPolling(TelegramBot);
    }
    if (options.emitUpdate) {
        patchEmitUpdate(TelegramBot);
    }
    if (options.emitCallbackQuery) {
        patchEmitCallbackQuery(TelegramBot);
    }
    if (options.sendVenue){
        patchSendVenue(TelegramBot);
    }
};