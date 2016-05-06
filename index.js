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
};