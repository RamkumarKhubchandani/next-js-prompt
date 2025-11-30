import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    logo: {
        type: String, // URL to logo
        default: '' 
    },
    location: {
        type: String,
        default: 'Remote'
    },
    type: {
        type: String,
        enum: ['Full-time', 'Part-time', 'Contract', 'Freelance'],
        default: 'Full-time'
    },
    salary: {
        type: String,
        default: 'Competitive'
    },
    tags: [{
        type: String
    }],
    link: {
        type: String,
        required: true
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    postedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

export default mongoose.models.Job || mongoose.model('Job', jobSchema);

