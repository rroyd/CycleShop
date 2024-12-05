const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const connectionSchema = new Schema({
    pair: {
        type: [Schema.ObjectId, Schema.ObjectId],
        ref: "User",
        required: true
    },
    status: {
        type: String,
        enum: ["No", "Pending", "Yes"]
    }
})

const Connection = mongoose.model("Connection", connectionSchema);

module.exports = {Connection}