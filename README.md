# :see_no_evil: node-telegram-bot-api :hear_no_evil:
monkey patch for https://github.com/yagop/node-telegram-bot-api

# Install

```
npm i monkey-patches-node-telegram-bot-api --save --save-exact
```

# Usage

```js
var options = {/* ... */};
TelegramBot = require('node-telegram-bot-api');
require('monkey-patches-node-telegram-bot-api')(TelegramBot, options);

var token = 'YOUR_TELEGRAM_BOT_TOKEN';
var bot = new TelegramBot(token, {polling: true});
```

# Options
## all
with this option you can enable all patch.
```js
options = {all: true};
// setup bot ... 
// usage
bot.stopPolling();
bot.kickChatMember(chatId, userId);
//  ...
```

## stopPolling
With this option you can stop polling. 
```js 
options = {stopPolling: true};
// setup bot ... 
// usage
bot.stopPolling(); // stop
bot.initPolling(); // start
bot.initPolling(); // restart
```

[related pull request](https://github.com/yagop/node-telegram-bot-api/pull/51)

 
## emitUpdate
this path cause `update`-event emitted every time update received 
```js 
options = {emitUpdate: true};
// setup bot ... 
// usage
bot.on('update', function(update){/* ... */})
```


## emitCallbackQuery
this path add support for callback_query and cause `callback_query`-event emitted every time callback query received
```js 
options = {emitCallbackQuery: true};
// setup bot ... 
// usage
bot.on('callback_query', function(callbackQuery){/* ... */})
```

[related pull request](https://github.com/yagop/node-telegram-bot-api/pull/118)


## sendVenue
With this option you can send venue. 
```js 
options = {sendVenue: true};
// setup bot ... 
// usage
bot.sendVenue(chatID, lat, long, title, address);
```

[related pull request](https://github.com/yagop/node-telegram-bot-api/pull/121)


## kickChatMember
This option provide `kickChatMember` method
```js
options = {kickChatMember: true};
// setup bot ...
// usage
bot.kickChatMember(chatId, userId);
```
[related pull request](https://github.com/yagop/node-telegram-bot-api/pull/102)


## unbanChatMember
This option provide `unbanChatMember` method
```js
options = {unbanChatMember: true};
// setup bot ...
// usage
bot.unbanChatMember(chatId, userId);
```
[related pull request](https://github.com/yagop/node-telegram-bot-api/pull/102)

## answerCallbackQuery
This option provide `answerCallbackQuery` method
```js
options = {unbanChatMember: true};
// setup bot ...
// usage
bot.answerCallbackQuery(callbackQueryId, text, showAlert);
```
[related pull request](https://github.com/yagop/node-telegram-bot-api/pull/102)


## editMessageText
This option provide `editMessageText` method
```js
options = {editMessageText: true};
// setup bot ...
// usage
bot.editMessageText(text);
```
[related pull request](https://github.com/yagop/node-telegram-bot-api/pull/102)


## editMessageCaption
This option provide `editMessageCaption` method
```js
options = {editMessageCaption: true};
// setup bot ...
// usage
bot.editMessageCaption(caption);
```
[related pull request](https://github.com/yagop/node-telegram-bot-api/pull/102)


## editMessageReplyMarkup
This option provide `editMessageReplyMarkup` method
```js
options = {editMessageReplyMarkup: true};
// setup bot ...
// usage
bot.editMessageReplyMarkup(replyMarkup);
```
[related pull request](https://github.com/yagop/node-telegram-bot-api/pull/102)



# Compatibility

I test this package with `node-telegram-bot-api@0.21.1` and `node@v5.3.0`

# Sem version, backward compatibility and ...
No. this is only :monkey_face: patch. so every time install this package with `--save-exact` option.