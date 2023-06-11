const TelegramBot = require('node-telegram-bot-api')

const Token = '6018671599:AAFOWYY1ORYNT3rvsOMqvH6tdBmT_z1zxog'

const bot = new TelegramBot(Token, { polling: true });

const fs = require('fs');
const ytdl = require('ytdl-core');


bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    if (msg.text == '/start') {
        const full_name = msg.from.first_name
        const user_name = msg.from.username
        bot.sendMessage(chatId, `Assalomu alaykum <b>${full_name}</b> botimizga hush kelibsiz`, {
            parse_mode: 'HTML'
        });

    } else if (ytdl.validateURL(msg.text)) {
        async function botSendVideo() {
            await bot.sendMessage(chatId, 'Video yuklanmoqda 🎥 iltimos kuting')
            let info = await ytdl.getInfo(msg.text)
            let video_title = info.videoDetails.title
            let link = info.videoDetails.embed.iframeUrl

            ytdl(msg.text).pipe(fs.createWriteStream(`videos/${video_title}.mp4`));
            setTimeout(async () => {
                await bot.sendVideo(chatId, `videos/${video_title}.mp4`, {
                    caption: video_title + ' ' + link
                })
                fs.unlink(`videos/${video_title}.mp4`, (err) => {
                    console.log('File ochirildi')
                })

            }, 60000)
        }

        botSendVideo()
    } else {
        return bot.sendMessage(chatId, `<b>${msg.text}</b>  Uzur bunday Video yo'q. To'g'ti video manzilini yuboring`,
            {
                parse_mode: 'HTML'
            }
        )
    }

});


