import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema({
  roomId: {
    type: String,
    required: true,
    unique: true,
  },
  code: {
    type: String,
    default: '',
  },
  language: {
    type: String,
    default: 'javascript', // or 'react'
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

// TTL Index: Delete documents 24 hours (86400 seconds) after 'lastUpdated'
RoomSchema.index({ lastUpdated: 1 }, { expireAfterSeconds: 86400 });

export default mongoose.models.Room || mongoose.model('Room', RoomSchema);
