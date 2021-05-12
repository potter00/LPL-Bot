const { Server } = require("discord.io");
const Discord = require("discord.js")
const config = require("./auth.json")
const client = new Discord.Client()


client.on('ready', () => {

    var canalGeneral = client.channels.get("797201475108864031")



    canalGeneral.send("estoy viva ptos")
})

//contestar mensajes
client.on('message', message => {
    var mensaje = message.content;
    mensaje.toLowerCase();

    //todos los canales

    if (mensaje === "este si") {
        message.channel.send('este no')
    }
    if (mensaje === "buenos dias") {
        message.channel.send('señor sol')
    }
    if (mensaje === "dime buenos dias") {
        message.channel.send('buenos dias uwu, y si nadie te lo dijo eres un pendejo ^w^')
    }
    if (mensaje === 'crea un nuevo canal') {

        var server = message.guild;
        var name = message.author.username;

        server.channels.create('voice1', { type: 'voice' })
            .then(channel => {
                channel.setParent('797201475108864033')
            })


    }
    mensaje = message.content.split(' ');
    //cualquier parte de la oracion
    for (let index = 0; index < mensaje.length; index++) {
        if (mensaje[index] === 'sergio') {
            message.channel.send('ese <@362075667522781187> es pto cuidado c:')

        }
        if (mensaje[index] === 'besame') {
            var autor = message.author.id;
            message.channel.send('cuando quieras <@' + autor + '> bb GRRR')

        }
        if (mensaje[index] === 'puta' || mensaje[index] === 'puto') {
            var autor = message.author.id;
            message.channel.send('no digas esas palabras  <@' + autor + '> porfis :c')

        }
        if (mensaje[index] === 'sexo' || mensaje[index] === '!sexo' || mensaje[index] === '!sexo!') {
            var autor = message.author.id;
            message.channel.send('¡En el OXXO!');
            message.channel.send('¡En exceso!');
        }
        if (mensaje[index] === 'saluda') {
            message.channel.send('buenas tardes uwu')

        }
        if (mensaje[index] === 'nya') {
            message.channel.send('NYA!   ICHI!   NI!  SAN!  NYA!')
            message.channel.send('Arigato!')
        }
        



    }
    

})
//detecta cuando alguien se conecta
client.on("voiceStateUpdate", (oldVoiceState, newVoiceState) => { // Listeing to the voiceStateUpdate event
    if (newVoiceState.channel) { // The member connected to a channel.
        console.log(`${newVoiceState.member.user.tag} connected to ${newVoiceState.channel.name}.`);
        if (newVoiceState.channel.name === 'Sala') {

            var server = newVoiceState.guild;
            var id = newVoiceState.channel.parentID;


            server.channels.create(`${newVoiceState.member.user.tag} chanel`, { type: 'voice' }).then(channel => { 
                channel.setParent('842140736602374154');
                setTimeout(move,1000);
                
                function move(){
                    newVoiceState.member.voice.setChannel(channel);
                };
            })



        }
    } else if (oldVoiceState.channel) { // The member disconnected from a channel.
        console.log(`${oldVoiceState.member.user.tag} disconnected from ${oldVoiceState.channel.name}.`);

        if (oldVoiceState.channel.parentID === '842140736602374154') {
            if (oldVoiceState.channel.members.size <= 0) {
                oldVoiceState.channel.delete();
            }
        }

    };
});
//cuando creas un canal(aun no tiene uso :D)
client.on("channelCreate", (channel) => {




})





client.login(config.token)

