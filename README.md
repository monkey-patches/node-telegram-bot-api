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
Removed: update your node-telegram-bot-api

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
Removed: update your node-telegram-bot-api

## unbanChatMember
Removed: update your node-telegram-bot-api

## answerCallbackQuery
Removed: update your node-telegram-bot-api

## editMessageText
Removed: update your node-telegram-bot-api

## editMessageCaption
Removed: update your node-telegram-bot-api

## editMessageReplyMarkup
Removed: update your node-telegram-bot-api

# Compatibility

I test this package with `node-telegram-bot-api@0.23.3` and `node@v5.3.0`

# Sem version, backward compatibility and ...
No. this is only :monkey_face: patch. so every time install this package with `--save-exact` option.