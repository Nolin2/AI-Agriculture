// C:\Users\Admin\backend\init_data.js

const mongoose = require('mongoose');
require('dotenv').config();
// 🚨 ASSUMPTION: 'schema' exports the models. Adjust path/names if needed.
const { User, WeatherLog } = require('./schema'); 

// Sample initial data (unchanged)
const users = [
    { name: 'Nolin Masai', email: 'nolin@example.com' },
    { name: 'John Doe', email: 'john@example.com' }
];

const weatherLogs = [
    { city: 'Nairobi', temperature: 25, description: 'Sunny' },
    { city: 'Mombasa', temperature: 30, description: 'Hot' }
];

// Function to insert initial data (now just a reusable async function)
const initData = async () => {
    try {
        console.log('Inserting initial data...');
        
        // Delete existing data
        await User.deleteMany({});
        await WeatherLog.deleteMany({});

        // Insert new data
        await User.insertMany(users);
        await WeatherLog.insertMany(weatherLogs);

        console.log('Initial data inserted successfully');
    } catch (err) {
        console.error('Error inserting initial data:', err);
        // Do NOT exit the process here if this is imported by server.js
        throw err; 
    }
};

// --- FIX: This block handles running the script standalone ---
if (require.main === module) {
    // Only run this block if the file is executed directly (node init_data.js)
    
    // 🚨 Removed deprecated Mongoose options 
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log('MongoDB connected for init data script');
            // 🚨 FIX: Call initData() only AFTER the connection is established
            return initData(); 
        })
        .then(() => {
            // Exit successfully after initData finishes
            process.exit(0);
        })
        .catch((err) => {
            console.error('MongoDB connection or Init Data Error:', err);
            process.exit(1);
        });
}

// 🚨 FIX: Export the function so it can be used by server.js
module.exports = { initData };