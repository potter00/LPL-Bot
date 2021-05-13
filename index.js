const { Server } = require("discord.io");
const Discord = require("discord.js")
const config = require("./auth.json")
const env = require('dotenv').config();
const msg = require('./messages.json')
const ffmpeg = require("ffmpeg-static");
const ytdl = require('ytdl-core');
const {Player} = require('discord-music-player')

const client = new Discord.Client()

// inicializacion del reproductor
const player = new Player(client,{
    leaveOnEnd: false,
    leaveOnStop: false,
    leaveOnEmpty: true,
    timeout: 0,
    volume: 150,
    quality: 'high',
})

var queue = {
    nowplayng: [],
    list: []
};
var disp;

// https://www.npmjs.com/package/discord-music-player



async function Krico(usuario, prefix, accion, ...buscado){
    if(prefix == 'bot' && accion == 'reproduce'){
        buscado.splice(0,2)
        var texto = buscado.toString().replace(/,/g,' ')

        let song = await player.play(usuario,texto)

        if(song){
            console.log('Reproduciendo:' + texto);
        }

    }
}

client.on('ready', () => {
    console.log('Bot iniciado')
    client.user.setActivity('ser el mejor',{type: 'COMPETING'})

    //var canalGeneral = client.channels.get("797201475108864031")
    //canalGeneral.send("estoy viva ptos")
})

//contestar mensajes
client.on('message', async message => {
    if (message.author.bot) return;

    var music = message.content.split(' ');

    await Krico(message,music[0],music[1],...music)
    //Play(message,music[0],music[1],...music)

    var mensaje = message.content.toLowerCase();
    for (const accion of msg) {
        if (mensaje == accion.message) {
            message.channel.send(accion.response)
        }
    }

    if (mensaje === 'quiero un canal') {
        var server = message.guild;
        var name = message.author.username;
        var userId = message.author.id

        server.channels.create(`Canal de ${name}`,
            {
                type: 'voice',
                permissionOverwrites: [
                    {
                        id: message.guild.roles.guild.id,

                        allow: ['ADMINISTRATOR']
                    }
                ]
            })
            .then(channel => {
                channel.setParent('797201475108864033')
            })


    }

    //cualquier parte de la oracion
    for (let index = 0; index < mensaje.length; index++) {
        mensaje = message.content.split(' ');
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
                setTimeout(move, 1000);

                function move() {
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
client.on('message', message =>{

    
        var msg = message.content.split(' ')
        if( msg[0] == 'bot' && msg[1] == 'pon'){
    
            if (message.member.voice.channel) {
                async function play() {
                    con
                    
                }
                


            }
    
    
    
        }
    
})




// TOMAR DEL .ENV LA VARIABLE DISCORD_TOKEN
client.login(config.token) // ENV.DISCROD_TOKEN

