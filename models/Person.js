const mongoose = require('mongoose');

// Define the schema
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    mobile: {
        type: String,
        // required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        match: /.+\@.+\..+/ // Basic email format validation
    },
    role: {
        type: String,
        required: true,
        trim: true
    }
});

const Person = mongoose.model('Person', personSchema);

module.exports = Person;


// Create the model from the schema




// {
//     "name": "alice",
//     "mobile": "1234567880",
//     "email": "alice@gmail.com",
//     "role": "chef"

// }