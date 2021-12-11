#!/bin/bash
echo "Downloading and installing the latest version of the project..."
rm -rf ~/jangsoodlor-bot
git clone https://github.com/Fakepng/jangsoodlor-bot/
echo "Installing dependencies..."
cd jangsoodlor-bot
npm install
echo "Copying config file..."
cd
cp config.json jangsoodlor-bot
echo "Copying sound file..."
rm ~/jangsoodlor-bot/sounds/putmusichere.mp3
cd sounds
cp * ~/jangsoodlor-bot/sounds
echo "Starting the bot..."
cd ~/jangsoodlor-bot
node .