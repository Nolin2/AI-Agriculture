const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    createdAt: { type: Date, default: Date.now }
});

const weatherLogSchema = new mongoose.Schema({
    city: String,
    temperature: Number,
    condition: String,
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
const WeatherLog = mongoose.model('WeatherLog', weatherLogSchema);

module.exports = { User, WeatherLog };

