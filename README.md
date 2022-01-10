# This bot is base on [eritislami/evobot](https://github.com/eritislami/evobot)

**Jangsoodlor-Bot** is a Discord bot developed mostly by [Fakepng](https://github.com/Fakepng) and [微博使用者](https://github.com/BioB3). And of course, its namesake [Jangsoodlor](https://github.com/Jangsoodlor). This bot can do many things such as play musics, retrieve server member's avatar, say some inspirational quote and much more. This bot is licensed under MIT license so feel free to fork it. Also we do not have much coding experiences yet. In fact we are just random high-schoolers who have too much free time. Any suggestions regarding the bot are also welcomed.

![jangsoodlor-bot avatar](/assets/images/Jangsoodlor-bot.png)

## Requirements

1. Discord Bot Token [Guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)
2. YouTube Data API v3 Key [Guide](https://developers.google.com/youtube/v3/getting-started)  
2.1 Spotify API [Guide](https://developer.spotify.com/)  
2.2 Mongodb_srv [Guide](https://www.youtube.com/watch?v=Ej05tq1220A)  
2.3 Owner ID [Guide](https://techswift.org/2020/04/22/how-to-find-your-user-id-on-discord/)  
2.4 **(Optional)** Soundcloud Client ID [Guide](https://github.com/zackradisic/node-soundcloud-downloader#client-id)  
2.5 **(Optional)** GIPHY Token [Guide](https://developers.giphy.com/)  
2.6 **(Optional)** CAT Token [Guide](https://thecatapi.com/)  
2.7 **(Optional)** DOG Token [Guide](https://thedogapi.com/)
3. Node.js v14.0.0 or newer

## Feature

### Music

Command | Aliases | Description
--- | --- | ---
clip | - | Play mp3 file
clips | - | List mp3 file
loop | l | Loop the queue
lyrics | ly | Search lyrics
move | mv | Move song to another position
nowplaying | np | Show now playing song
pause | - | Pause the music
play | p | Play music
playlist | pl | Play playlist
queue | q | Show the queue
remove | rm | Remove song from queue
resume | r | Resume the music
search | - | Search youtube
skip | s | Skip the song
skipto | st | Skip to a specific song
stop | - | Stop the music
volume | v | Change volume

### Original

Command | Aliases | Description
--- | --- | ---
help | ? | Show help
invite | - | Show invite link
ping | - | Show ping
uptime | - | Show uptime

### Information

Command | Aliases | Description
--- | --- | ---
avatar | - | Show avatar
axolotl | - | Fact about axolotl
bored | - | Fun things to do when bored
cat | - | Show cat
covid | - | Show Thailand COVID-19 statistics
dict | - | Search dictionary
dog | - | Show dog
duck | - | Show duck
fact | - | Random fact
food | - | Show food
forza | - | Show random car from forza
fox | - | Show fox
gif | - | Show gif
http | - | Show http error code
iss | - | Show ISS location
joke | - | Show joke
member | - | Show server member
meme | - | Show random meme
number | - | Show number facts
pic | - | Show random picture
quote | - | Show quote
salim | - | Random salim quotes
waifu | - | Show waifu pictures
> (prefix)waifu nsfw

### Response

Command | Aliases | Description
--- | --- | ---
abottleofwater | abow | a bo'ohw'o'wo'er
hello | - | Hello
joker | - | Show joke
lanna | - | Boss of lanna
rules | - | Show rules
say | - | Say something

### Game

Command | Aliases | Description
--- | --- | ---
flip | - | Flip a coin
tictactoe | ttt | Play tic tac toe

### Economy

Command | Aliases | Description
--- | --- | ---
balance | bal | Show your daily reward
deposit| dep | Deposit money from your wallet into your bank account
pay| - | Give your money away to certain person
void| - | Trow away your money
withdraw| wd | Withdraw money from your bank account into your wallet

### Casino

Command | Aliases | Description
--- | --- | ---
lotto | - | `No longer available`
slots | - | Play slots

> hidden command (prefix)eco to manage economic.

## How to install a bot

1. Open terminal in home directory.
2. Run `git clone https://github.com/Fakpeng/jangsoodlor-bot`
3. Change directory to jangsoodlor-bot
4. `npm install`
5. Fill token in side config.json.example file and rename it to config.json
6. Copy config.json, sounds folder, install.sh and place in home directory.
7. Run `node .`

## How to update the bot

1. Open terminal in home directory.
2. Run `bash install.sh`
