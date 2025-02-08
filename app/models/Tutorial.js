import mongoose from 'mongoose';

// Schema for SEO metadata
const seoSchema = new mongoose.Schema({
  title: String,
  description: String,
  keywords: [String],
  ogImage: String,
});

// Schema for content versions
const versionSchema = new mongoose.Schema({
  content: [{
    type: { type: String, enum: ['text', 'code', 'tip', 'image'] },
    content: String,
    imageUrl: String,
  }],
  createdAt: { type: Date, default: Date.now },
  publishedAt: Date,
  versionNumber: Number,
});

// Main Tutorial Schema
const tutorialSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    index: true 
  },
  leftMenu: {
    type: String, 
    required: true,
    unique: true
  },
  
  slug: { 
    type: String, 
    required: true, 
    unique: true 
  },
  category: { 
    type: String, 
    required: true,
    index: true 
  },
  status: { 
    type: String, 
    enum: ['draft', 'published'], 
    default: 'draft' 
  },
  author: {
    name: String,
    email: String,
  },
  content: [{
    type: { type: String, enum: ['text', 'code', 'tip', 'image'] },
    content: String,
    imageUrl: String,
  }],
  seo: seoSchema,
  versions: [versionSchema],
  tags: [String],
  readTime: Number,
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  shares: { type: Number, default: 0 },
  featuredImage: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, {
  timestamps: true,
});

// Add indexes for better performance
tutorialSchema.index({ tags: 1 });
tutorialSchema.index({ createdAt: -1 });
tutorialSchema.index({ views: -1 });

export default mongoose.models.Tutorial || mongoose.model('Tutorial', tutorialSchema);