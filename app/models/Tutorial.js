import mongoose from 'mongoose';

const tutorialSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true,
  },
  slug: {
    type: String,
    required: [true, 'Please provide a slug'],
    unique: true,
    trim: true,
  },
  content: {
    type: String, // HTML content from TipTap
    required: [true, 'Please add content'],
  },
  description: {
    type: String,
    required: [true, 'Please add a meta description'],
  },
  tags: {
    type: [String],
    default: [],
  },
  author: {
    type: String,
    default: 'Admin', // Can be linked to User model if needed later
  },
  isPublished: {
    type: Boolean,
    default: true,
  },
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Intermediate',
  },
  readTime: {
    type: String, // e.g., "5 min read"
  },
  image: {
    type: String, // URL to cover image
  },
}, { timestamps: true });

export default mongoose.models.Tutorial || mongoose.model('Tutorial', tutorialSchema);