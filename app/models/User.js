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
        enum: ['free', 'pro_trial', 'pro_weekly', 'pro_monthly', 'pro_yearly', 'pro_1_day', 'pro_2_days'],
        default: 'free'
    },
    subscriptionStartDate: { type: Date },
    subscriptionEndDate: { type: Date },
    trialEndsAt: { type: Date },

    // Pro Learning Path
    learningPath: {
        type: String,
        enum: ['none', 'html', 'css', 'javascript', 'react', 'angular', 'node', 'fullstack', 'python', 'typescript', 'zustand', 'redux'],
        default: 'none'
    },

    // Gamification
    xp: {
        type: Number,
        default: 0,
    },
    completedTutorials: [{
        type: String,
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
    // Career Goals
    careerGoals: {
        yearly: [{
            id: { type: String },
            year: { type: String }, // e.g., "2025"
            text: { type: String },
            isCompleted: { type: Boolean, default: false },
            isAiSuggested: { type: Boolean, default: false },
            progress: { type: Number, default: 0 }, // 0-100
            keyResults: [{
                id: { type: String },
                text: { type: String },
                isCompleted: { type: Boolean, default: false }
            }],
            createdAt: { type: Date, default: Date.now }
        }],
        monthly: [{
            id: { type: String },
            month: { type: String }, // e.g., "January 2025"
            text: { type: String },
            isCompleted: { type: Boolean, default: false },
            isAiSuggested: { type: Boolean, default: false },
            progress: { type: Number, default: 0 },
            keyResults: [{
                id: { type: String },
                text: { type: String },
                isCompleted: { type: Boolean, default: false }
            }],
            createdAt: { type: Date, default: Date.now }
        }],
        weekly: [{
            id: { type: String }, // UUID
            week: { type: String }, // e.g., "Week 1, Jan 2025"
            text: { type: String },
            isCompleted: { type: Boolean, default: false },
            isAiSuggested: { type: Boolean, default: false },
            progress: { type: Number, default: 0 },
            keyResults: [{
                id: { type: String },
                text: { type: String },
                isCompleted: { type: Boolean, default: false }
            }],
            createdAt: { type: Date, default: Date.now }
        }]
    },
    goalPreferences: {
        emailEnabled: { type: Boolean, default: true },
        emailFrequency: { type: String, enum: ['daily', 'weekly'], default: 'weekly' }
    },

    roadmapProgress: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    },
    // Certificates
    certificates: [{
        courseId: { type: String, required: true }, // e.g., 'react', 'javascript'
        certificateId: { type: String, required: true }, // Unique ID (UUID)
        score: { type: Number, required: true }, // Percentage (0-100)
        earnedAt: { type: Date, default: Date.now }
    }],
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

// Force model recompilation in dev to ensure schema updates (like new enums) are applied
// Force model recompilation to ensure schema updates (like new enums) are applied
if (mongoose.models.User) {
    delete mongoose.models.User;
}

export default mongoose.models.User || mongoose.model('User', userSchema);
