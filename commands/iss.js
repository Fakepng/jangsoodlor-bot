const axios = require('axios');
const config = require("../config.json");

module.exports = {
    name: 'iss',
    description: "ISS!",
    execute(message, args){
        if(args == 'help') {
            message.channel.send(`Usage ${config.PREFIX}iss`);
        }else {
            axios.get(`https://api.wheretheiss.at/v1/satellites/25544`).then(function (response) {
                message.channel.send(`ISS is at\nLatitude: ${response.data.latitude}\nLongitude: ${response.data.longitude}\nAltitude: ${response.data.altitude} km\nVelocity: ${response.data.velocity} km/h`);
            }).catch(function (error) {
                console.log(error);
            })
        }
    }
}