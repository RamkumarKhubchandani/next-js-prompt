import mongoose from 'mongoose';

const activityLogSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    action: {
        type: String,
        required: true, // e.g., 'page_view', 'login', 'click'
    },
    path: {
        type: String, // e.g., '/dashboard'
    },
    fromPath: {
        type: String, // e.g., '/home'
    },
    timestamp: {
        type: Date,
        default: Date.now,
        index: true
    },
    userAgent: String,
    ip: String,
    metadata: mongoose.Schema.Types.Mixed
}, { timestamps: true });

// Ensure we clean up old logs periodically if needed, but for now just keep them
// activityLogSchema.index({ timestamp: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 30 }); // 30 days

export default mongoose.models.ActivityLog || mongoose.model('ActivityLog', activityLogSchema);
