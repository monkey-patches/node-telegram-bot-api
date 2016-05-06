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

# Compatibility

I test this package with `node-telegram-bot-api@0.21.1` and `node@v5.3.0`

# Sem version, backward compatibility and ...
No. this is only :monkey_face: patch. so every time install this package with `--save-exact` option.