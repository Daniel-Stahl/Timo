require('dotenv').config();
const token = process.env.SLACK_BOT_TOKEN;
const secret = process.env.SLACK_SIGN_SECRET;
const { createEventAdapter } = require('@slack/events-api');
const { WebClient } = require('@slack/web-api');
const { createMessageAdapter } = require('@slack/interactive-messages');
const slackEvents = createEventAdapter(secret);
const slackInteractions = createMessageAdapter(process.env.SLACK_SIGN_SECRET);
const webClient = new WebClient(token);
const port = 3000;
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use('/slack/events', slackEvents.expressMiddleware());
app.use('/slack/actions', slackInteractions.expressMiddleware())
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const messageJsonBlock = {
  "blocks":
  [
    { "type": "section",
      "text":
      {
        "type": "mrkdwn",
        "text": "Hello, thanks for calling me. Would you like to launch a modal?"
      },

      "accessory":
      {
        "type": "button",
        "action_id": "open_modal_button", // We need to add this
        "text":
        {
          "type": "plain_text",
          "text": "Launch",
          "emoji": true
        },

      "value": "launch_button_click"
      }
    }
  ]
};

slackEvents.on('app_mention', async (event) => {
  try {
    const mentionResponseBlock = { ...messageJsonBlock, ...{channel: event.channel}}
    const res = await webClient.chat.postMessage(mentionResponseBlock)
    console.log('Message sent: ', res.ts)
  } catch (e) {
    //Work on error handling
  }
});

// slackInteractions.action('launch_button_click', async (payload) => {
//   try {
//     console.log("button click recieved", payload)
//   } catch (e) {
//     console.log("Error");
//   }
//
//   return {
//     text: 'Processing...',
//   }
// })

slackInteractions.action({type: 'button'}, (payload, respond) => {
  webClient.views.open({
    trigger_id: payload.trigger_id,
    view: {
        "type": "modal",
        "title": {
          "type": "plain_text",
          "text": "My App"
        },
        "close": {
          "type": "plain_text",
          "text": "Close"
        },
        "blocks": [
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": "About the simplest modal you could conceive of :smile:\n\nMaybe <https://api.slack.com/reference/block-kit/interactive-components|*make the modal interactive*> or <https://api.slack.com/surfaces/modals/using#modifying|*learn more advanced modal use cases*>."
            }
          },
          {
            "type": "context",
            "elements": [
              {
                "type": "mrkdwn",
                "text": "Psssst this modal was designed using <https://api.slack.com/tools/block-kit-builder|*Block Kit Builder*>"
              }
            ]
          }
        ]
      }
    })
  })

app.listen(port, function() {
  console.log('Bot is listening on port ' + port)
});
