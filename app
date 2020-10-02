// require('dotenv').config();
//
// const { WebClient } = require('@slack/web-api');
// const token = process.env.SLACK_BOT_TOKEN;
// const web = new WebClient(token);
// const currentTime = new Date().toTimeString();
//
// (async () => {
//   try {
//     await web.chat.postMessage({
//       channel: '#test-bot-factory',
//       text: 'The current time is ${currentTime}',
//     });
//   } catch (error) {
//     console.log(error)
//   }
//
//   console.log('Message posted! ${currentTime}');
//
// })();
