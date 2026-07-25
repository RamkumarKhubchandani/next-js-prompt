import mongoose from 'mongoose';

const eventRegistrationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    whatsapp: {
        type: String,
        required: true,
    },
    eventSlug: {
        type: String,
        required: true,
    },
    eventTitle: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
}, { timestamps: true });

if (mongoose.models.EventRegistration) {
    delete mongoose.models.EventRegistration;
}

export default mongoose.models.EventRegistration || mongoose.model('EventRegistration', eventRegistrationSchema);
