const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const input = require("input"); 

const {api_id,api_hash} = require("./config");

const stringSession = new StringSession(""); 

(async () => {
  console.log("Loading interactive example...");
  const client = new TelegramClient(stringSession, api_id, api_hash, {
    connectionRetries: 5,
  });
  await client.start({
    phoneNumber: async () => await input.text("number ?"),
    password: async () => await input.text("password?"),
    phoneCode: async () => await input.text("Code ?"),
    onError: (err) => console.log(err),
  });
  console.log("Your session is: ");

  console.log(client.session.save()); 

  await client.sendMessage("me", { message: "Hello!" });
})();