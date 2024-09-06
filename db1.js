const mongoose = require('mongoose');

// Use the connection string directly in mongoose.connect
mongoose.connect('mongodb://127.0.0.1:27017/Rooms', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// db object default
const db1 = mongoose.connection;

db1.on('connected', () => {
    console.log('Connected to MongoDB server');
});

db1.on('error', (err) => {
    console.log('MongoDB server error', err);
});

db1.on('disconnected', () => {
    console.log('Disconnected from MongoDB server');
});

module.exports = db1;
