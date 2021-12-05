const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    userID: { type: String, require: true, unique: true },
    serverID: { type: String, require: true },
    coins: { type: Number, default: 1000 },
    bank: { type: Number, default: 0},
    reward: { type: Number, default: 0 },
    lottery: { type: Number, default: 0 },
    lottery_price_pool: { type: Number, default: 0 },
    previous_lottery_winner: { type: Number, default: 0 },
    previous_lottery_count: { type: Number, default: 0 },
    previous_lottery_price: { type: Number, default: 0 }
})

const model = mongoose.model('ProfileModels', profileSchema);

module.exports = model;