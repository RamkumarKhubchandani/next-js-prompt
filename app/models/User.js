import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        unique: true,
        sparse: true,
        trim: true,
        lowercase: true
    },
    bio: { type: String, maxlength: 160 },
    links: {
        github: String,
        twitter: String,
        linkedin: String
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'pro'],
        default: 'user',
    },
    xp: {
        type: Number,
        default: 0,
    },
    completedTutorials: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    }],
    streak: {
        count: { type: Number, default: 0 },
        lastLogin: { type: Date, default: Date.now },
    },
    inventory: {
        streakFreezes: { type: Number, default: 0 },
        themes: [{ type: String }],
    },
    badges: [{
        id: String,
        name: String,
        icon: String,
        earnedAt: { type: Date, default: Date.now }
    }],
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', userSchema);
