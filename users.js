const fs = require('fs')

const { Api, TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
      

let {api_id,api_hash,session,groupID} = require("./config");

session = new StringSession(session);

const client = new TelegramClient(session, api_id, api_hash, {});




(async function run() {

  await client.connect();

  const fileName = 'GroupUsers.txt'

  fs.writeFile(fileName,'w',(e)=>{
    if (e) {
      console.log(e)
    }
  })


  groupID.map((groupUsername)=>{
      
    const result = client.invoke(
        new Api.channels.GetParticipants({
          channel: groupUsername,
          filter: new Api.ChannelParticipantsRecent({}),
          offset: 1,
          limit: 200
        })
    )
    

    result.then((r)=>{
        

        const final = r.users.filter((item)=>{
            return item.username;
        })
    
        final.map((item)=>{ 

          fs.appendFile(fileName, item.username + ', ', (e)=>{
            if (e) {
              console.log(e)
            }
          })
        })
        

    }).catch( (e)=> console.log(e) )
            
  })


})();