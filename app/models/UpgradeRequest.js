import mongoose from 'mongoose';

const upgradeRequestSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    email: { type: String, required: true },
    username: { type: String },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    requestedAt: { type: Date, default: Date.now }
});

export default mongoose.models.UpgradeRequest || mongoose.model('UpgradeRequest', upgradeRequestSchema);
