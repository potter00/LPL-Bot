const { Server } = require("discord.io");
const Discord = require("discord.js")
const config = require("./auth.json")
const env = require('dotenv').config();
const msg = require('./messages.json')
const ffmpeg = require("ffmpeg-static");
const ytdl = require('ytdl-core');
const { Player, Playlist } = require('discord-music-player')
require('@discordjs/opus')
require('opusscript')



const client = new Discord.Client()
var isPlaying;

// inicializacion del reproductor
const player = new Player(client, {
    leaveOnEnd: false,
    leaveOnStop: false,
    leaveOnEmpty: true,
    timeout: 0,
    volume: 100,
    quality: 'high',
})
client.player = player;

async function play(channel,cancion){
    if (isPlaying) {
        await player.addToQueue(channel, cancion)
        
    } else {
        await player.play(channel, cancion)
    }

}

// https://www.npmjs.com/package/discord-music-player
async function PlaySong(usuario, prefix, accion, ...buscado) {
    if (prefix == 'bot' && accion == 'pon') {
        buscado.splice(0, 2)
        var texto = buscado.toString().replace(/,/g, ' ')
        play(usuario, texto)
    }

    if (prefix == 'bot' && accion == 'callate') {
        player.pause(usuario);
    }

    if (prefix == 'bot' && accion == 'sigue') {
        player.resume(usuario);
    }

    if (prefix == 'bot' && accion == 'quitalo') {
        player.skip(usuario);
    }
    if (prefix == 'bot' && accion == 'repitelo') {
        player.toggleLoop(usuario);
    }
    
    if(prefix == 'bot' && accion == 'limpia'){
        player.clearQueue(usuario)
    }
    if(prefix == 'bot' && accion == 'lista'){
        let queue = player.getQueue(usuario);
        if(queue)
            usuario.channel.send('Queue:\n'+(queue.songs.map((song, i) => {
                return `${i === 0 ? 'Now Playing' : `#${i+1}`} - ${song.name} | ${song.author}`
            }).join('\n')));
    }
}

player.on('error', (error,msg)=>{
    switch (error) {
        // Thrown when the YouTube search could not find any song with that query.
        case 'SearchIsNull':
            message.channel.send(`No song with that query was found.`);
            break;
        // Thrown when the provided YouTube Playlist could not be found.
        case 'InvalidPlaylist':
            message.channel.send(`No Playlist was found with that link.`);
            break;
        // Thrown when the provided Spotify Song could not be found.
        case 'InvalidSpotify':
            message.channel.send(`No Spotify Song was found with that link.`);
            break;
        // Thrown when the Guild Queue does not exist (no music is playing).
        case 'QueueIsNull':
            message.channel.send(`There is no music playing right now.`);
            break;
        // Thrown when the Members is not in a VoiceChannel.
        case 'VoiceChannelTypeInvalid':
            message.channel.send(`You need to be in a Voice Channel to play music.`);
            break;
        // Thrown when the current playing song was an live transmission (that is unsupported).
        case 'LiveUnsupported':
            message.channel.send(`We do not support YouTube Livestreams.`);
            break;
        // Thrown when the current playing song was unavailable.
        case 'VideoUnavailable':
            message.channel.send(`Something went wrong while playing the current song, skipping...`);
            break;
        // Thrown when provided argument was Not A Number.
        case 'NotANumber':
            message.channel.send(`The provided argument was Not A Number.`);
            break;
        // Thrown when the first method argument was not a Discord Message object.
        case 'MessageTypeInvalid':
            message.channel.send(`The Message object was not provided.`);
            break;
        // Thrown when the Guild Queue does not exist (no music is playing).
        default:
            message.channel.send(`**Unknown Error Ocurred:** ${error}`);
            break;
    }
})

client.on('ready', () => {
    console.log('Bot iniciado')
    client.user.setActivity('ser el mejor', { type: 'COMPETING' })

    //var canalGeneral = client.channels.get("797201475108864031")
    //canalGeneral.send("estoy viva ptos")
})

//contestar mensajes
client.on('message', async (message) => {
    if (message.author.bot) return;





    var music = message.content.split(' ');

    PlaySong(message, music[0], music[1], ...music)

    var mensaje = message.content.toLowerCase();
    for (const accion of msg) {
        if (mensaje == accion.message) {
            message.channel.send(accion.response)
        }
    }
    if (message.content === 'buenos dias') {
        player.play(message,'buenos dias hijos de puta kiryu coco')
    }
    if (mensaje === 'quiero un canal') {
        var server = message.guild;
        var name = message.author.username;
        var userId = message.author.id

        server.channels.create(`General`, {
            type: 'text', permissionOverwrites: [{
                
                id: message.author.id,
                allow: ['MANAGE_CHANNELS']
            }]
        }).then(channel => {
            channel.setParent('797200371826294785')
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
            message.channel.send('NYA!   ICHI!   NI!  SAN!  NYA!');
            message.channel.send('Arigato!');
            let bol;
            if (isPlaying) {
                
                
                let song = await player.addToQueue(message,'NYA! ARIGATO')
                
            }else{
                
                let song = await player.play(message,'NYA! ARIGATO')
                
                bol=true;
            }
            
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
//eventos del reproductor
client.player.on('queueEnd',  (message, queue) =>
message.channel.send(`no tengo nada mas que poner D:!`))

client.player.on('queueEnd',  (message, queue) =>
isPlaying = false)

client.player.on('songAdd',  (message, queue, song) =>
message.channel.send(`**${song.name}** se a agregado correctamente onii-chan ^w^!`))

client.player.on('songAdd',  (message, queue, song) =>
isPlaying = true)

client.player.on('songChanged', (message, newSong, oldSong) =>
        message.channel.send(`Ahora pondre ^w^ **${newSong.name}** `))

// TOMAR DEL .ENV LA VARIABLE DISCORD_TOKEN
client.login(config.token) // ENV.DISCROD_TOKEN

