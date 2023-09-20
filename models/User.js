import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        unique: true
    },
    performance: {
        type: Number,
        default: 0.5
    },
    comment: {
        type: String
    },
    userBotId: {
        type: Number,
        unique: true,
    },
    personalWeekends: [String],
    definedWeekends: [String]
})

export default mongoose.model('UserModel', UserSchema)