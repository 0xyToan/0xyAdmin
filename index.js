const Discord = require("discord.js");
const Client = new Discord.Client();
const token = "ODM5ODYxMTQ2NTQ1OTQ2NjM0.YJPzpQ.KIxykTWAVGZrYByO4XEAuypAbr8";
const prefix = "!"



//Console\\
Client.on("ready", () => {
  console.log("==============================================================")
  console.log("ready")
  console.log("Connected")
  console.log(`Bot connecté, avec ${Client.users.cache.size} users, sur ${Client.channels.cache.size} channels sur ${Client.guilds.cache.size} serveurs.`);
  console.log("==============================================================")
})

Client.on("guildCreate", () => {
  console.log("==============================================================")
  console.log("Server add")
  console.log("Connected")
  console.log(`Bot rejoin serveur, avec ${Client.users.cache.size} users, sur ${Client.channels.cache.size} channels sur ${Client.guilds.cache.size} serveurs.`);
  console.log("==============================================================")
})


Client.on("guildDeleted", () => {
  console.log("==============================================================")
  console.log("Server Deleted")
  console.log("Connected")
  console.log(`Bot sort de serveur, avec ${Client.users.cache.size} users, sur ${Client.channels.cache.size} channels sur ${Client.guilds.cache.size} serveurs.`);
  console.log("==============================================================")
})


Client.on('message', async (message) => {
  if (
    message.content.toLowerCase().startsWith(prefix + 'clear') ||
    message.content.toLowerCase().startsWith(prefix + 'c ')
  ) {
    if (!message.member.hasPermission('MANAGE_MESSAGES'))
      return message.channel.send("Tu ne peut pas utiliser cette commande il te manque la permition `manage_messages`!");
    if (!isNaN(message.content.split(' ')[1])) {
      let amount = 0;
      if (message.content.split(' ')[1] === '1' || message.content.split(' ')[1] === '0') {
        amount = 1;
      } else {
        amount = message.content.split(' ')[1];
        if (amount > 100) {
          amount = 100;
        }
      }
      await message.channel.bulkDelete(amount, true).then((_message) => {
        message.channel.send(`Bot a retirer \`${_message.size}\` messages | :broom:`).then((sent) => {
          setTimeout(function () {
            sent.delete();
          }, 2500);
        });
      });
    } else {
      message.channel.send('entre le nombre de message a clear').then((sent) => {
        setTimeout(function () {
          sent.delete();
        }, 2500);
      });
    }
  } else {
    if (message.content.toLowerCase() === prefix + 'help clear') {
      const newEmbed = new Discord.MessageEmbed().setColor('#00B2B2').setTitle('**Clear Help**');
      newEmbed
        .setDescription('pour clear des messages fait `!clear 5` ou `!c 5`.')
        .setFooter(`Demande par ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp();
      message.channel.send(newEmbed);
    }
  }
});

Client.on("message", async message => {
  if(message.content === prefix + "ping") {
    const m = await message.channel.send("Ping?");
    m.edit(`Latency of ${m.createdTimestamp - message.createdTimestamp} ms. Latency API of ${Math.round (Client.ws.ping)} ms`);}})


const { MessageEmbed } = require("discord.js");

Client.on('message', async msg => {



    if (msg.content === prefix + 'help') {
      const helpEmbed = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Help')
      .setDescription('voici les commandes:')
      .addFields(
        { name: '`help`', value: 'afiche ceci', inline: false },
        { name: '`ban @------ `', value: 'ban une personne', inline: false },
        { name: '`kick @-------`', value: 'expulse une personne du serveur', inline: false },
        { name: '`invite`', value: `afiche l'invitation du bot`, inline: false },
        { name: '`support`', value: `afiche le serveur support du bot`, inline: false },
        { name: '`pachnote`', value: "Crér un pachnote plus que personnalisable plus d'info avec `help pachnote` ", inline: false },
        { name: '`crea`', value: "affiche mon créateur", inline: false },
        { name: '`slowmode`', value: "change le slowmode du salon, avec `!slowmode 5`", inline: false },
        { name: '----------', value: 'Ce bot est encore en beta testing donc il ny a pas trop de commandes', inline: false },
      )
      .setTimestamp()
      .setFooter('!help - 0xyAdmin', 'https://images-ext-2.discordapp.net/external/K7raWM_gJS4bDQBdlCo1gtst9cudaYyrF5amJ-0CKb8/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/713115896805064856/588bd07eff1c0163c068b7b51c88c08f.webp');
    
    msg.reply(helpEmbed);
    }
  });

//slowmode\\
  Client.on('message', message => {
    if(message.content.startsWith(prefix + "slowmode")) {
      message.delete()
      const messageArray = message.content.split(' ');
      const args = messageArray.slice(1);
      if(!message.member.hasPermission('MANAGE_MESSAGES')) 
        return message.channel.send("Tu a besoin de la permition `MANAGE_MESSAGES` pour executer cette commande !");
        
        
        message.channel.setRateLimitPerUser(args[0]);
        message.channel.send(`Slowmode a été set sur: ${args[0]} Seconds`)

    }
  })



  //Ban\\
  Client.on('message', message => {
    if (!message.guild) return;
    if (message.content.startsWith(prefix + 'ban')) {
      if (!message.member.hasPermission('BAN_MEMBERS'))
        return message.channel.send("Tu ne peut pas utiliser cette commande il te manque la permition `ban_members`!");
        const user = message.mentions.users.first();

        if (user) {

          const member = message.guild.members.resolve(user);

          if (member) {

          member
            .ban({
              reason: 'Ban',
            })
            .then(() => {
              message.channel.send(`J'ai banni ${user.tag}`);
            })
            .catch(err => {
              message.channel.send('Je ne peut pas ban cette personne, regarde les perms');
              console.error(err);
            });
          } else {
            message.channel.send("Cette personne n'ai pas dans ce serveur");
         }
        } else {
          message.channel.send("J'ai besoin que tu mentionne la personne pour que je la ban!");
        }
      }

   });




  
  //pach note\\
  Client.on('message', message => {
    if (message.content.toLowerCase().startsWith(prefix + 'pachnote')) {
      if (!message.member.hasPermission('MANAGE_MESSAGES'))
        return(message.reply("deso mais il te manque des perms!"))
        const MyMessage = message.content.slice(9).trim();
        const SayEmbed = new Discord.MessageEmbed()
            .setColor('#FD8609')
            .setTitle('Pach Note')
            .addField(" \u200B ", "`" + MyMessage + "`")
            .setTimestamp()
            .setFooter("PachNote du ")
        message.channel.send(SayEmbed)
    message.delete()
    }
  });






  Client.on('message', msg => {
    if (msg.content === prefix + 'help pachnote') {
       const helppachnoteEmbed = new Discord.MessageEmbed()
       .setColor('#0099ff')
       .setTitle('Help pach note')
       .setURL("")
       .setDescription("Pour utiliser le pach note fait `!pachnote \n *tittrecategorie \n *Description`")
       .setTimestamp()
       .setFooter('!help pachnote - 0xyAdmin', 'https://images-ext-2.discordapp.net/external/K7raWM_gJS4bDQBdlCo1gtst9cudaYyrF5amJ-0CKb8/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/713115896805064856/588bd07eff1c0163c068b7b51c88c08f.webp');
     
     msg.reply(helppachnoteEmbed);
    }
});


  //Kick\\
Client.on('message', message => {
 
  if (!message.guild) return;

   
  if (message.content.startsWith(prefix + 'kick')) {
    if (!message.member.hasPermission('KICK_MEMBERS'))
       return message.channel.send("Tu ne peut pas utiliser cette commande il te manque la permition `kick_members`!");

        const user = message.mentions.users.first();

        if (user) {
     
         const member = message.guild.member(user);
      
          if (member) {
       
           member.kick('Reson').then(() => {
         
             message.reply(`J'ai kick ${user.tag}`);
            }).catch(err => {
           
              message.reply('Je nai pas les perm pour kick fait attention a me mettre les perm admin!');
            
             console.error(err);
            });
         } else {
         
            message.reply('Cette personne nest pas dans le serveur!');
         }
   
       } else {
         message.reply('tu na pas mentionner une personne a kick!');

       }
      }
  });



  //invite\\
  Client.on('message', msg => {
    if (msg.content === prefix + 'invite') {
      const inviteEmbed = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle('INVITE')
      .setURL("https://discord.com/api/oauth2/authorize?client_id=839861146545946634&permissions=8&redirect_uri=https%3A%2F%2Fwww.twitch.tv%2F0xytoan&scope=bot")
      .setDescription('tout le monde sur: https://discord.com/api/oauth2/authorize?client_id=839861146545946634&permissions=8&redirect_uri=https%3A%2F%2Fwww.twitch.tv%2F0xytoan&scope=bot')
      .setTimestamp()
      .setFooter('!invite - 0xyAdmin', 'https://images-ext-2.discordapp.net/external/K7raWM_gJS4bDQBdlCo1gtst9cudaYyrF5amJ-0CKb8/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/713115896805064856/588bd07eff1c0163c068b7b51c88c08f.webp');
    
    msg.reply(inviteEmbed);    }
});

    //Support\\
  Client.on('message', msg => {
    if (msg.content === prefix + 'support') {
       const supportEmbed = new Discord.MessageEmbed()
       .setColor('#0099ff')
       .setTitle('Support')
       .setURL("")
       .setDescription('tout le monde sur: https://discord.gg/4qq2aQPZBD')
       .setTimestamp()
       .setFooter('!support - 0xyAdmin', 'https://images-ext-2.discordapp.net/external/K7raWM_gJS4bDQBdlCo1gtst9cudaYyrF5amJ-0CKb8/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/713115896805064856/588bd07eff1c0163c068b7b51c88c08f.webp');
     
     msg.reply(supportEmbed);
    }
});

    //créateur\\
    Client.on('message', msg => {
      if (msg.content === prefix + 'crea') {
         const supportEmbed = new Discord.MessageEmbed()
         .setColor('#0099ff')
         .setTitle('Créateur')
         .setURL("")
         .setDescription('le créateur est 0xyToan! \n sont serv: https://discord.gg/X3SzEGsJtR \n sont twitch: https://twitch.tv/oxytoan')
         .setTimestamp()
         .setFooter('!support - 0xyAdmin', 'https://images-ext-2.discordapp.net/external/K7raWM_gJS4bDQBdlCo1gtst9cudaYyrF5amJ-0CKb8/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/713115896805064856/588bd07eff1c0163c068b7b51c88c08f.webp');
       
       msg.reply(supportEmbed);
      }
  });

  Client.on("ready", () => {
    const statuses = [
      "0xyAdmin | !help",
    ]
    let i = 0
    setInterval(() => {
    Client.user.setActivity(statuses[i], {type: 'PLAYING', URL:'https://twitch.tv/oxytoan'});
    i = ++i % statuses.length
  }, 1e4)
  
});



Client.login(token)