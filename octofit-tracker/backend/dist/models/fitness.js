import mongoose, { Schema } from 'mongoose';
const userSchema = new Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    age: { type: Number, min: 10, max: 100 },
    level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
    points: { type: Number, default: 0 },
}, { timestamps: true });
const teamSchema = new Schema({
    name: { type: String, required: true, trim: true },
    school: { type: String, required: true, trim: true },
    motto: { type: String, default: 'Stay active together' },
    members: { type: Number, default: 0 },
}, { timestamps: true });
const activitySchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true, trim: true },
    durationMin: { type: Number, required: true, min: 1 },
    distanceKm: { type: Number, min: 0 },
    calories: { type: Number, min: 0 },
    notes: { type: String, trim: true },
    date: { type: Date, default: Date.now },
    pointsEarned: { type: Number, default: 0 },
}, { timestamps: true });
const workoutSchema = new Schema({
    title: { type: String, required: true, trim: true },
    focus: { type: String, required: true, trim: true },
    durationMin: { type: Number, required: true, min: 1 },
    intensity: { type: String, enum: ['easy', 'moderate', 'challenging'], default: 'moderate' },
    equipment: { type: [String], default: [] },
}, { timestamps: true });
const leaderboardEntrySchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true, trim: true },
    points: { type: Number, required: true, default: 0 },
    rank: { type: Number, required: true, default: 1 },
}, { timestamps: true });
export const User = mongoose.models.User || mongoose.model('User', userSchema);
export const Team = mongoose.models.Team || mongoose.model('Team', teamSchema);
export const Activity = mongoose.models.Activity || mongoose.model('Activity', activitySchema);
export const Workout = mongoose.models.Workout || mongoose.model('Workout', workoutSchema);
export const LeaderboardEntry = mongoose.models.LeaderboardEntry || mongoose.model('LeaderboardEntry', leaderboardEntrySchema);
