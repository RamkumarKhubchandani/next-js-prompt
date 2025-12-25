import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

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
        required: false, // OAuth users won't have a password
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
    phone: {
        countryCode: { type: String }, // e.g. +91
        number: { type: String },      // e.g. 9876543210 (store raw, format in UI)
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'pro'],
        default: 'user',
    },
    // Subscription Details
    plan: {
        type: String,
        enum: ['free', 'pro_weekly', 'pro_monthly', 'pro_yearly'],
        default: 'free'
    },
    subscriptionStartDate: { type: Date },
    subscriptionEndDate: { type: Date },
    
    // Pro Learning Path
    learningPath: {
        type: String,
        enum: ['none', 'html', 'css', 'javascript', 'react', 'angular', 'node', 'fullstack', 'python'],
        default: 'none'
    },
    
    // Gamification
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
    // Roadmap progress (Pro): persisted per user so they can resume across devices.
    // Shape example:
    // roadmapProgress: {
    //   "frontend-roadmap-2025": { html: { status: "done", updatedAt: "..." }, react: { status: "doing", updatedAt: "..." } }
    // }
    roadmapProgress: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    },
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    if (!this.password || !this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.models.User || mongoose.model('User', userSchema);
