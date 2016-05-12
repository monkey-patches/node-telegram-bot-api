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

function patchSendVenue(TelegramBot) {
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

function patchKickChatMember(TelegramBot) {
    /**
     * Use this method to kick a user from a group or a supergroup.
     * In the case of supergroups, the user will not be able to return
     * to the group on their own using invite links, etc., unless unbanned
     * first. The bot must be an administrator in the group for this to work.
     * Returns True on success.
     *
     * @param  {Number|String} chatId  Unique identifier for the target group or username of the target supergroup
     * @param  {String} userId  Unique identifier of the target user
     * @return {Promise}
     * @see https://core.telegram.org/bots/api#kickchatmember
     */
    TelegramBot.prototype.kickChatMember = function kickChatMember(chatId, userId) {
        const form = {
            chat_id: chatId,
            user_id: userId
        };
        return this._request('kickChatMember', {form: form});
    }
}

function patchUnbanChatMember(TelegramBot) {
    /**
     * Use this method to unban a previously kicked user in a supergroup.
     * The user will not return to the group automatically, but will be
     * able to join via link, etc. The bot must be an administrator in
     * the group for this to work. Returns True on success.
     *
     * @param  {Number|String} chatId  Unique identifier for the target group or username of the target supergroup
     * @param  {String} userId  Unique identifier of the target user
     * @return {Promise}
     * @see https://core.telegram.org/bots/api#unbanchatmember
     */
    TelegramBot.prototype.unbanChatMember = function unbanChatMember(chatId, userId) {
        const form = {
            chat_id: chatId,
            user_id: userId
        };
        return this._request('unbanChatMember', {form: form});
    }
}

function pathAnswerCallbackQuery(TelegramBot) {
    /**
     * Use this method to send answers to callback queries sent from
     * inline keyboards. The answer will be displayed to the user as
     * a notification at the top of the chat screen or as an alert.
     * On success, True is returned.
     *
     * @param  {Number|String} callbackQueryId  Unique identifier for the query to be answered
     * @param  {String} text  Text of the notification. If not specified, nothing will be shown to the user
     * @param  {Boolean} showAlert  Whether to show an alert or a notification at the top of the screen
     * @param  {Object} [options] Additional Telegram query options
     * @return {Promise}
     * @see https://core.telegram.org/bots/api#answercallbackquery
     */
    TelegramBot.prototype.answerCallbackQuery = function answerCallbackQuery(callbackQueryId, text, showAlert, form) {
        form = form || {};
        form.callback_query_id = callbackQueryId;
        form.text = text;
        form.show_alert = showAlert;
        return this._request('answerCallbackQuery', {form: form});
    }
}

function patchEditMessageText(TelegramBot) {
    /**
     * Use this method to edit text messages sent by the bot or via
     * the bot (for inline bots). On success, the edited Message is
     * returned.
     *
     * Note that you must provide one of chat_id, message_id, or
     * inline_message_id in your request.
     *
     * @param  {String} text  New text of the message
     * @param  {Object} [options] Additional Telegram query options (provide either one of chat_id, message_id, or inline_message_id here)
     * @return {Promise}
     * @see https://core.telegram.org/bots/api#editmessagetext
     */
    TelegramBot.prototype.editMessageText = function editMessageText(text, form) {
        form = form || {};
        form.text = text;
        return this._request('editMessageText', {form: form});
    }

}


function patchEditMessageCaption(TelegramBot) {
    /**
     * Use this method to edit captions of messages sent by the
     * bot or via the bot (for inline bots). On success, the
     * edited Message is returned.
     *
     * Note that you must provide one of chat_id, message_id, or
     * inline_message_id in your request.
     *
     * @param  {String} caption  New caption of the message
     * @param  {Object} [options] Additional Telegram query options (provide either one of chat_id, message_id, or inline_message_id here)
     * @return {Promise}
     * @see https://core.telegram.org/bots/api#editmessagecaption
     */
    TelegramBot.prototype.editMessageCaption = function editMessageCaption(caption, form) {
        form = form || {};
        form.caption = caption;
        return this._request('editMessageCaption', {form: form});
    }
}
function patchEditMessageReplyMarkup(TelegramBot) {
    /**
     * Use this method to edit only the reply markup of messages
     * sent by the bot or via the bot (for inline bots).
     * On success, the edited Message is returned.
     *
     * Note that you must provide one of chat_id, message_id, or
     * inline_message_id in your request.
     *
     * @param  {Object} replyMarkup  A JSON-serialized object for an inline keyboard.
     * @param  {Object} [options] Additional Telegram query options (provide either one of chat_id, message_id, or inline_message_id here)
     * @return {Promise}
     * @see https://core.telegram.org/bots/api#editmessagereplymarkup
     */
    TelegramBot.prototype.editMessageReplyMarkup = function editMessageReplyMarkup(replyMarkup, form) {
        form = form || {};
        form.reply_markup = replyMarkup;
        return this._request('editMessageReplyMarkup', {form: form});
    }
}

module.exports = function (TelegramBot, options) {
    options = options || {};
    if (options.all || options.stopPolling) {
        patchStopPolling(TelegramBot);
    }
    if (options.all || options.emitUpdate) {
        patchEmitUpdate(TelegramBot);
    }
    if (options.all || options.emitCallbackQuery) {
        patchEmitCallbackQuery(TelegramBot);
    }
    if (options.all || options.sendVenue) {
        patchSendVenue(TelegramBot);
    }
    if (options.all || options.kickChatMember) {
        patchKickChatMember(TelegramBot);
    }
    if (options.all || options.unbanChatMember) {
        patchUnbanChatMember(TelegramBot);
    }
    if (options.all || options.answerCallbackQuery) {
        pathAnswerCallbackQuery(TelegramBot);
    }
    if (options.all || options.editMessageText) {
        patchEditMessageText(TelegramBot);
    }
    if (options.all || options.editMessageCaption) {
        patchEditMessageCaption(TelegramBot);
    }
    if (options.all || options.editMessageReplyMarkup) {
        patchEditMessageReplyMarkup(TelegramBot);
    }
};