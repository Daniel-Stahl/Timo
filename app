require('dotenv').config();
const token = process.env.SLACK_BOT_TOKEN
const secret = process.env.SLACK_SIGN_SECRET
const verification = process.env.SLACK_VERIFICATION_TOKEN
const { createEventAdapter } = require('@slack/events-api')
const { WebClient } = require('@slack/web-api')
const { createMessageAdaptor } = require('@slack/interactive-messages')
const slackEvents = createEventAdapter(secret)
const slackInteractions = createMessageAdaptor(verification)
const webClient = new WebClient(token)
const port = 3000;
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use('/slack/events', slackEvents.expressMiddleware())

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use('/slack/actions', slackInteractions.expressMiddleware())

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
}

slackEvents.on('app_mention', async (event) => {
  try {
    const mentionResponseBlock = { ...messageJsonBlock, ...{channel: event.channel}}
    const res = await webClient.chat.postMessage(mentionResponseBlock)
    console.log('Message sent: ', res.ts)
  } catch (e) {
    //Work on error handling
  }
})

slackInteractions.action({ action_id: 'open_modal_button' }, async (payload) => {
  try {
    console.log("button click recieved", payload)
  } catch (e) {

  }

  return {
    text: 'Processing...',
  }

})

app.listen(port, function() {
  console.log('Bot is listening on port ' + port)
})
