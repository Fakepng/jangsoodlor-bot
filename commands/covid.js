const axios = require('axios');

module.exports = {
    name: 'covid',
    description: "Covid!",
    execute(message, args){
        if(args == 'help') {
            message.channel.send(`Usage ${config.PREFIX}covid`)
        }else {
            axios.get('https://covid19.ddc.moph.go.th/api/Cases/today-cases-all').then(function (response) {
                message.channel.send(`จำนวนผู้ติดเชื้อรายใหม่: ${response.data[0].new_case} \nจำนวนผู้ติดเชื้อสะสม: ${response.data[0].total_case} \nจำนวนผู้เสียชีวิตรายใหม่: ${response.data[0].new_death} \nจำนวนผู้เสียชีวิตสะสม: ${response.data[0].total_death} \nจำนวนผู้รักษาหายรายใหม่: ${response.data[0].new_recovered} \nจำนวนผู้รักษาหายสะสม: ${response.data[0].total_recovered}`);
            }).catch(function (error) {
                console.log(error);
            })
        }
    }
}