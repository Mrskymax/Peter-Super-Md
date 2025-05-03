require('dotenv').config('./peter/.env');
const express = require('express');
const qrcode = require('qrcode');
const qrcodeTerminal = require('qrcode-terminal');
const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const fs = require('fs');
const os = require("os");
const path = require('path');
const axios = require('axios');



const app = express();
const PORT = process.env.PORT || 8080;

let latestQR = '';
// Define the prefix
const PREFIX = '!'; // Badilisha '!' kuwa prefix unayotaka

// Modify cmd function to include prefix
function cmd({ pattern, alias = [], ...options }) {
    const prefixedPattern = `${PREFIX}${pattern}`;
    const prefixedAlias = alias.map(a => `${PREFIX}${a}`);
    commands.set(prefixedPattern, { ...options, alias: prefixedAlias });
}

// Example usage of cmd with the new prefix
cmd({
    pattern: "ping",
    alias: ["pong"],
    react: "🌏",
    description: 'Jibu na "Pong!"',
    handler: async (msg, { sock }) => {
        await sock.sendMessage(msg.key.remoteJid, { text: 'Pong! 🏓' });
    },
});

cmd({
    pattern: "grouplink",
    react: "🔗",
    description: "Pata kiungo cha kundi",
    handler: async (msg, { sock }) => {
        await sock.sendMessage(msg.key.remoteJid, { text: "Hii hapa kiungo cha kundi: [Kiungo Placeholder]" });
    },
});

// Ongeza amri nyingine kwa mtindo huu...

// Ongeza amri moja kwa moja hapa
cmd({
    pattern: "groupmenu",
    desc: "menu the bot",
    category: "menu",
    react: "🥰",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try
       {
        let dec = `╭━━〔 *Group Menu* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• grouplink
┃◈┃• kickall
┃◈┃• add
┃◈┃• remove
┃◈┃• kick
┃◈┃• promote 
┃◈┃• demote
┃◈┃• dismiss 
┃◈┃• revoke
┃◈┃• setgoodbye
┃◈┃• setwelcome
┃◈┃• delete 
┃◈┃• getpic
┃◈┃• ginfo
┃◈┃• delete 
┃◈┃• disappear on
┃◈┃• disappear off
┃◈┃• disappear 7D,24H
┃◈┃• allreq
┃◈┃• updategname
┃◈┃• updategdesc
┃◈┃• joinrequests
┃◈┃• senddm
┃◈┃• nikal
┃◈┃• mute
┃◈┃• unmute
┃◈┃• lockgc
┃◈┃• unlockgc
┃◈┃• invite
┃◈┃• tag
┃◈┃• hidetag
┃◈┃• tagall
┃◈┃• tagadmins
┃◈└───────────┈⊷
╰──────────────┈⊷
> ${config.DESCRIPTION}`;

        await conn.sendMessage(
            from,
            {
                image: { url: `https://i.imgur.com/PEZ5QL2.jpeg` },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363200367779016@newsletter',
                        newsletterName: 'PETER SUPER MD',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

// fun menu

cmd({
    pattern: "funmenu",
    desc: "menu the bot",
    category: "menu",
    react: "😎",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {

        let dec = `╭━━〔 *Fun😎 Menu * 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• ??? 
┃◈┃• ???
┃◈┃• ???
┃◈┃• ????
┃◈┃• ???
┃◈└───────────┈⊷
╰──────────────┈⊷
> ${config.DESCRIPTION}`;

        await conn.sendMessage(
            from,
            {
                image: { url: `https://i.postimg.cc/KzpRf3pt/Chat-GPT-Image-Apr-23-2025-08-07-24-PM.png` },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363200367779016@newsletter',
                        newsletterName: 'PETER SUPER MD',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

cmd({
    pattern: "grouplink",
    react: "🔗",
    description: "Pata kiungo cha kundi",
    handler: async (msg, { sock }) => {
        await sock.sendMessage(msg.key.remoteJid, { text: "Hii hapa kiungo cha kundi: [Kiungo Placeholder]" });
    },
});

cmd({
    pattern: "kickall",
    react: "👋",
    description: "Ondoa washiriki wote wa kundi",
    handler: async (msg, { sock }) => {
        await sock.sendMessage(msg.key.remoteJid, { text: "Washiriki wote wameondolewa!" });
    },
});

cmd({
    pattern: "add",
    react: "➕",
    description: "Ongeza mshiriki kwenye kundi",
    handler: async (msg, { sock }) => {
        await sock.sendMessage(msg.key.remoteJid, { text: "Mshiriki ameongezwa kwenye kundi!" });
    },
});

cmd({
    pattern: "remove",
    react: "❌",
    description: "Ondoa mshiriki kutoka kundi",
    handler: async (msg, { sock }) => {
        await sock.sendMessage(msg.key.remoteJid, { text: "Mshiriki ameondolewa kutoka kundi!" });
    },
});

cmd({
    pattern: "promote",
    react: "⬆️",
    description: "Mpa mshiriki admin",
    handler: async (msg, { sock }) => {
        await sock.sendMessage(msg.key.remoteJid, { text: "Mshiriki amepewa admin!" });
    },
});

cmd({
    pattern: "demote",
    react: "⬇️",
    description: "Ondoa admin kwa mshiriki",
    handler: async (msg, { sock }) => {
        await sock.sendMessage(msg.key.remoteJid, { text: "Admin ameondolewa kwa mshiriki!" });
    },
});

cmd({
    pattern: "setwelcome",
    react: "👋",
    description: "Weka ujumbe wa kukaribisha",
    handler: async (msg, { sock }) => {
        await sock.sendMessage(msg.key.remoteJid, { text: "Ujumbe wa kukaribisha umewekwa!" });
    },
});

cmd({
    pattern: "setgoodbye",
    react: "👋",
    description: "Weka ujumbe wa kuaga",
    handler: async (msg, { sock }) => {
        await sock.sendMessage(msg.key.remoteJid, { text: "Ujumbe wa kuaga umewekwa!" });
    },
});

cmd({
    pattern: "mute",
    react: "🔇",
    description: "Zima kundi",
    handler: async (msg, { sock }) => {
        await sock.sendMessage(msg.key.remoteJid, { text: "Kundi limezimwa!" });
    },
});

cmd({
    pattern: "unmute",
    react: "🔊",
    description: "Washa kundi",
    handler: async (msg, { sock }) => {
        await sock.sendMessage(msg.key.remoteJid, { text: "Kundi limewashwa!" });
    },
});

cmd({
    pattern: "tagall",
    react: "📢",
    description: "Taja washiriki wote",
    handler: async (msg, { sock }) => {
        await sock.sendMessage(msg.key.remoteJid, { text: "Washiriki wote wametajwa!" });
    },
});

cmd({
    pattern: "ping", 
    alias: ["ping"],
    react: "🌏",
    description: 'Jibu na "Pong!"',
    handler: async (msg, { sock }) => {
        await sock.sendMessage(msg.key.remoteJid, { text: 'Pong! 🏓' });
    },
});

cmd({
    pattern: "ai",
    alias: ["ai"],
    react: "🤖",
    description: "Tuma swali kwa AI na upate jibu",
    handler: async (msg, { sock, args }) => {
        if (args.length === 0) {
            await sock.sendMessage(msg.key.remoteJid, { text: '❌ Tafadhali andika swali au maelezo kwa AI.' });
            return;
        }

        const prompt = args.join(' ');

        try {
            const response = await axios.post(
                'https://api.openai.com/v1/completions',
                {
                    model: 'text-davinci-003',
                    prompt: prompt,
                    max_tokens: 150,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                    },
                }
            );

            const aiResponse = response.data.choices[0].text.trim();
            await sock.sendMessage(msg.key.remoteJid, { text: `🤖 AI: ${aiResponse}` });
        } catch (error) {
            console.error('Error with OpenAI API:', error);
            await sock.sendMessage(msg.key.remoteJid, { text: '❌ Kulitokea hitilafu wakati wa kuwasiliana na AI.' });
        }
    },
});

cmd({
    pattern: "facebook",
    alias: ["fb"],
    react: "📹",
    description: "Pakua video kutoka Facebook kwa kutumia kiungo",
    handler: async (msg, { sock, args }) => {
        if (args.length === 0) {
            await sock.sendMessage(msg.key.remoteJid, { text: '❌ Tafadhali tuma kiungo cha video ya Facebook.' });
            return;
        }

        const fbUrl = args[0];
        try {
            const response = await axios.get(`https://api.lolhuman.xyz/api/facebook?apikey=b879d4a76cabda29a6f4eebd&url=${encodeURIComponent(fbUrl)}`);
            const videoUrl = response.data.result[0];

            await sock.sendMessage(msg.key.remoteJid, {
                text: '✅ Video imepatikana! Pakua hapa:',
                buttons: [
                    { buttonId: 'download_fb', buttonText: { displayText: 'Pakua Video' }, type: 1 }
                ],
                footer: videoUrl
            });
        } catch (error) {
            console.error('Error fetching Facebook video:', error);
            await sock.sendMessage(msg.key.remoteJid, { text: '❌ Kulitokea hitilafu wakati wa kupakua video ya Facebook.' });
        }
    },
});

cmd({
    pattern: "fbreels",
    alias: ["reels"],
    react: "🎥",
    description: "Pakua reels kutoka Facebook kwa kutumia kiungo",
    handler: async (msg, { sock, args }) => {
        if (args.length === 0) {
            await sock.sendMessage(msg.key.remoteJid, { text: '❌ Tafadhali tuma kiungo cha reels ya Facebook.' });
            return;
        }

        const fbReelsUrl = args[0];
        try {
            const response = await axios.get(`https://api.lolhuman.xyz/api/facebook?apikey=b879d4a76cabda29a6f4eebd&url=${encodeURIComponent(fbReelsUrl)}`);
            const reelsUrl = response.data.result[0];

            await sock.sendMessage(msg.key.remoteJid, {
                text: '✅ Reels imepatikana! Pakua hapa:',
                buttons: [
                    { buttonId: 'download_reels', buttonText: { displayText: 'Pakua Reels' }, type: 1 }
                ],
                footer: reelsUrl
            });
        } catch (error) {
            console.error('Error fetching Facebook reels:', error);
            await sock.sendMessage(msg.key.remoteJid, { text: '❌ Kulitokea hitilafu wakati wa kupakua reels ya Facebook.' });
        }
    },
});

commands.set('ai', {
    cmd: ['ai'],
    description: 'Tuma swali kwa AI na upate jibu',
    handler: async (msg, { sock, args }) => {
        if (args.length === 0) {
            await sock.sendMessage(msg.key.remoteJid, { text: '❌ Tafadhali andika swali au maelezo kwa AI.' });
            return;
        }

        const prompt = args.join(' ');

        try {
            // Tuma ombi kwa OpenAI API
            const response = await axios.post(
                'https://api.openai.com/v1/completions',
                {
                    model: 'text-davinci-003',
                    prompt: prompt,
                    max_tokens: 150,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                    },
                }
            );

            const aiResponse = response.data.choices[0].text.trim();
            await sock.sendMessage(msg.key.remoteJid, { text: `🤖 AI: ${aiResponse}` });
        } catch (error) {
            console.error('Error with OpenAI API:', error);
            await sock.sendMessage(msg.key.remoteJid, { text: '❌ Kulitokea hitilafu wakati wa kuwasiliana na AI.' });
        }
    },
});


commands.set('facebook', {
    cmd: ['facebook', 'fb'],
    description: 'Pakua video kutoka Facebook kwa kutumia kiungo',
    handler: async (msg, { sock, args }) => {
        if (args.length === 0) {
            await sock.sendMessage(msg.key.remoteJid, { text: '❌ Tafadhali tuma kiungo cha video ya Facebook.' });
            return;
        }

        const fbUrl = args[0];
        try {
            const response = await axios.get(`https://api.lolhuman.xyz/api/facebook?apikey=b879d4a76cabda29a6f4eebd&url=${encodeURIComponent(fbUrl)}`);
            const videoUrl = response.data.result[0]; // Assuming the API returns an array of video URLs

            await sock.sendMessage(msg.key.remoteJid, {
                text: '✅ Video imepatikana! Pakua hapa:',
                buttons: [
                    { buttonId: 'download_fb', buttonText: { displayText: 'Pakua Video' }, type: 1 }
                ],
                footer: videoUrl
            });
        } catch (error) {
            console.error('Error fetching Facebook video:', error);
            await sock.sendMessage(msg.key.remoteJid, { text: '❌ Kulitokea hitilafu wakati wa kupakua video ya Facebook.' });
        }
    },
});

commands.set('fbreels', {
    cmd: ['fbreels', 'reels'],
    description: 'Pakua reels kutoka Facebook kwa kutumia kiungo',
    handler: async (msg, { sock, args }) => {
        if (args.length === 0) {
            await sock.sendMessage(msg.key.remoteJid, { text: '❌ Tafadhali tuma kiungo cha reels ya Facebook.' });
            return;
        }

        const fbReelsUrl = args[0];
        try {
            const response = await axios.get(`https://api.lolhuman.xyz/api/facebook?apikey=b879d4a76cabda29a6f4eebd&url=${encodeURIComponent(fbReelsUrl)}`);
            const reelsUrl = response.data.result[0]; // Assuming the API returns an array of video URLs

            await sock.sendMessage(msg.key.remoteJid, {
                text: '✅ Reels imepatikana! Pakua hapa:',
                buttons: [
                    { buttonId: 'download_reels', buttonText: { displayText: 'Pakua Reels' }, type: 1 }
                ],
                footer: reelsUrl
            });
        } catch (error) {
            console.error('Error fetching Facebook reels:', error);
            await sock.sendMessage(msg.key.remoteJid, { text: '❌ Kulitokea hitilafu wakati wa kupakua reels ya Facebook.' });
        }
    },
});

cmd({
    pattern: "removebground",
    alias: ["rmbg"],
    react: "🖼️",
    description: "Toa background ya picha kwa kutumia kiungo cha picha",
    handler: async (msg, { sock, args }) => {
        if (args.length === 0) {
            await sock.sendMessage(msg.key.remoteJid, { text: '❌ Tafadhali tuma kiungo cha picha unayotaka kuondoa background.' });
            return;
        }

        const imageUrl = args[0];
        try {
            const response = await axios.post(
                'https://api.remove.bg/v1.0/removebg',
                {
                    image_url: imageUrl,
                    size: 'auto',
                },
                {
                    headers: {
                        'X-Api-Key': 'bA6J4R3FFuibBoa4uC2tzHDk',
                    },
                    responseType: 'arraybuffer',
                }
            );

            const buffer = Buffer.from(response.data, 'binary');
            await sock.sendMessage(msg.key.remoteJid, {
                image: buffer,
                caption: '✅ Background imeondolewa!'
            });
        } catch (error) {
            console.error('Error removing background:', error);
            await sock.sendMessage(msg.key.remoteJid, { text: '❌ Kulitokea hitilafu wakati wa kuondoa background ya picha.' });
        }
    },
});

cmd({
    pattern: "repo",
    alias: ["source"],
    react: "📂",
    description: "Pata kiungo cha repo kwa ajili ya kudeploy bot",
    handler: async (msg, { sock }) => {
        const repoLink = 'https://github.com/Peterjoram37/Peter-Super-Md';
        await sock.sendMessage(msg.key.remoteJid, {
            text: `✅ Hii hapa repo ya bot: ${repoLink}\n\nUnaweza kuifork na kuanza kudeploy!`
        });
    },
});

cmd({
    pattern: "owner",
    alias: ["creator"],
    react: "👤",
    description: "Pata maelezo kuhusu mmiliki wa bot",
    handler: async (msg, { sock }) => {
        const ownerInfo = `👤 *Mmiliki wa Bot*:

📛 Jina: Peter Joram
📱 Namba ya WhatsApp: wa.me/2556757333799
🌐 Facebook: https://m.me/peter.joram.37`;

        await sock.sendMessage(msg.key.remoteJid, {
            text: ownerInfo
        });
    },
});

// Ondoa amri ya 'tts'
commands.delete('tts');

// QR Code Page
app.get('/qr', async (req, res) => {
    if (!latestQR) return res.send('⏳ QR bado haijapatikana. Subiri kidogo...');
    const qrImg = await qrcode.toDataURL(latestQR);
    res.send(`
        <html><body style="text-align:center;">
        <h2>Scan QR Code</h2>
        <img src="${qrImg}" />
        </body></html>
    `);
});

app.listen(PORT, () => {
    console.log(`✅ Express Server running at http://localhost:${PORT}`);
});

// async function convertTextToSpeech(text) {
//     return googleTTS.getAudioUrl(text, {
//         lang: 'sw',
//         slow: false,
//         host: 'https://translate.google.com',
//     });
// }

const AUTH_INFO_PATH = './auth_info';

// Ensure auth_info directory exists
if (!fs.existsSync(AUTH_INFO_PATH)) {
    fs.mkdirSync(AUTH_INFO_PATH, { recursive: true });
    console.log('📂 auth_info directory created.');
}

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('./auth_info');

    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true,
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect, qr } = update;
        if (qr) latestQR = qr;

        if (connection === 'close') {
            const shouldReconnect = lastDisconnect?.error instanceof Boom && lastDisconnect.error.output?.statusCode !== DisconnectReason.loggedOut;
            console.log('❌ Connection closed:', lastDisconnect?.error);
            if (shouldReconnect) {
                console.log('🔄 Reconnecting...');
                startBot();
            } else {
                console.log('🚫 Logged out, delete auth_info and restart.');
            }
        } else if (connection === 'open') {
            console.log('✅ Bot Connected to WhatsApp!');
            latestQR = '';

            // Notify owner
            const ownerNumber = '255677780801@s.whatsapp.net';
            sock.sendMessage(ownerNumber, { text: '🤖 Bot imeunganishwa kikamilifu na WhatsApp! 🎉' });
        }
    });

    sock.ev.on('messages.upsert', async ({ messages }) => {
        const msg = messages[0];
        if (!msg.message || msg.key.fromMe) return;
    
        const text = msg.message.conversation || msg.message.extendedTextMessage?.text;
        const sender = msg.key.remoteJid;
        const senderName = msg.pushName || 'User';
    
        if (!text) return;
    
        // Ongeza utendaji wa ujumbe hapa ikiwa inahitajika
    }); // Kufunga sock.ev.on
} // Close startBot function

startBot();