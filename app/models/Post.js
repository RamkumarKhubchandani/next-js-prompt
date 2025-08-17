import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: mongoose.Schema.Types.Mixed, // Storing block note's JSON
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    category: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    isPremium: {
        type: Boolean,
        default: false,
    },
    // SEO Fields will be added here later
    metaTitle: { type: String },
    metaDescription: { type: String },
    keywords: [{ type: String }],
}, { timestamps: true });

export default mongoose.models.Post || mongoose.model('Post', postSchema);
