const mongoose = require('mongoose');

const FacultySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    position: {
        type: String,
        required: [true, 'Please add a position']
    },
    department: {
        type: String,
        required: [true, 'Please add a department']
    },
    image: {
        type: String,
        default: 'no-photo.jpg'
    },
    cloudinaryId: {
        type: String
    },
    bio: {
        type: String
    },
    qualifications: {
        type: String
    },
    order: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Faculty', FacultySchema);
