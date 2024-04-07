// petmodel.js

import mongoose from 'mongoose';

const petSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    breed: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender:{
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    description:{
      type: String,
      required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    adoptionRequests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, { timestamps: true });

const Pet = mongoose.model('Pet', petSchema);

export default Pet;
