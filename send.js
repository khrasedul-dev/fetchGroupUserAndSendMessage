const fs = require('fs')
const { Api, TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");

let {api_id,api_hash,session,groupID,message} = require("./config");



session = new StringSession(session);

const client = new TelegramClient(session,api_id, api_hash, {});

(async function run() {

  await client.connect();

  let users;

  fs.readFile('GroupUsers.txt',(e,data)=>{
    if (e) {
      console.log(e)
    } else {

      users = data.toString().split(',')

      users.map((id)=>{

        client.invoke(
          new Api.messages.SendMessage({
            peer: id,
            message: message
          })
        ).then((r)=> console.log("Message sent to user "+id )).catch((e)=>console.log("Message cannot sent to user "+ id))
    
      })

    }

  })



})();

