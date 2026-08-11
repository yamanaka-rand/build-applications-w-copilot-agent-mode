import mongoose, { Document, Schema, Types } from 'mongoose';

export type UserLevel = 'beginner' | 'intermediate' | 'advanced';

export interface IUser extends Document {
  name: string;
  email: string;
  age?: number;
  level: UserLevel;
  teamId?: Types.ObjectId;
  points: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITeam extends Document {
  name: string;
  school: string;
  motto: string;
  members: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IActivity extends Document {
  userId: Types.ObjectId;
  type: string;
  durationMin: number;
  distanceKm?: number;
  calories?: number;
  notes?: string;
  date: Date;
  pointsEarned: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IWorkout extends Document {
  title: string;
  focus: string;
  durationMin: number;
  intensity: 'easy' | 'moderate' | 'challenging';
  equipment: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ILeaderboardEntry extends Document {
  userId: Types.ObjectId;
  name: string;
  points: number;
  rank: number;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    age: { type: Number, min: 10, max: 100 },
    level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
    points: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const teamSchema = new Schema<ITeam>(
  {
    name: { type: String, required: true, trim: true },
    school: { type: String, required: true, trim: true },
    motto: { type: String, default: 'Stay active together' },
    members: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const activitySchema = new Schema<IActivity>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true, trim: true },
    durationMin: { type: Number, required: true, min: 1 },
    distanceKm: { type: Number, min: 0 },
    calories: { type: Number, min: 0 },
    notes: { type: String, trim: true },
    date: { type: Date, default: Date.now },
    pointsEarned: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const workoutSchema = new Schema<IWorkout>(
  {
    title: { type: String, required: true, trim: true },
    focus: { type: String, required: true, trim: true },
    durationMin: { type: Number, required: true, min: 1 },
    intensity: { type: String, enum: ['easy', 'moderate', 'challenging'], default: 'moderate' },
    equipment: { type: [String], default: [] },
  },
  { timestamps: true },
);

const leaderboardEntrySchema = new Schema<ILeaderboardEntry>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true, trim: true },
    points: { type: Number, required: true, default: 0 },
    rank: { type: Number, required: true, default: 1 },
  },
  { timestamps: true },
);

export const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);
export const Team = mongoose.models.Team || mongoose.model<ITeam>('Team', teamSchema);
export const Activity = mongoose.models.Activity || mongoose.model<IActivity>('Activity', activitySchema);
export const Workout = mongoose.models.Workout || mongoose.model<IWorkout>('Workout', workoutSchema);
export const LeaderboardEntry = mongoose.models.LeaderboardEntry || mongoose.model<ILeaderboardEntry>('LeaderboardEntry', leaderboardEntrySchema);
