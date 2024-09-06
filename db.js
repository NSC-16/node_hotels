const mongoose = require('mongoose');

// Use the connection string directly in mongoose.connect
mongoose.connect('mongodb://127.0.0.1:27017/hotel', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// db object default
const db = mongoose.connection;

db.on('connected', () => {
    console.log('Connected to MongoDB server');
});

db.on('error', (err) => {
    console.log('MongoDB server error', err);
});

db.on('disconnected', () => {
    console.log('Disconnected from MongoDB server');
});

module.exports = db;
