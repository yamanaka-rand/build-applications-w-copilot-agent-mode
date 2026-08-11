import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/fitness.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Workout.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
    ]);

    const teams = await Team.insertMany([
      { name: 'North Stars', school: 'Riverdale High', motto: 'Run together, shine together', members: 2 },
      { name: 'City Flyers', school: 'Lincoln Academy', motto: 'Fly higher every day', members: 2 },
    ]);

    const users = await User.insertMany([
      { name: 'Aiko Tanaka', email: 'aiko@example.com', age: 17, level: 'intermediate', teamId: teams[0]._id, points: 180 },
      { name: 'Ben Carter', email: 'ben@example.com', age: 16, level: 'beginner', teamId: teams[0]._id, points: 120 },
      { name: 'Chloe Rivera', email: 'chloe@example.com', age: 18, level: 'advanced', teamId: teams[1]._id, points: 240 },
      { name: 'Daisuke Sato', email: 'daisuke@example.com', age: 19, level: 'intermediate', teamId: teams[1]._id, points: 150 },
    ]);

    await Workout.insertMany([
      {
        title: 'Morning Run',
        focus: 'Cardio',
        durationMin: 30,
        intensity: 'moderate',
        equipment: ['Shoes'],
      },
      {
        title: 'Core Strength',
        focus: 'Core',
        durationMin: 25,
        intensity: 'challenging',
        equipment: ['Mat'],
      },
      {
        title: 'Cycling Recovery',
        focus: 'Endurance',
        durationMin: 40,
        intensity: 'easy',
        equipment: ['Bike'],
      },
    ]);

    await Activity.insertMany([
      {
        userId: users[0]._id,
        type: 'run',
        durationMin: 30,
        distanceKm: 5,
        calories: 320,
        notes: 'Morning jog',
        date: new Date('2026-08-10T07:00:00.000Z'),
        pointsEarned: 40,
      },
      {
        userId: users[2]._id,
        type: 'workout',
        durationMin: 25,
        calories: 280,
        notes: 'Strength training',
        date: new Date('2026-08-09T18:30:00.000Z'),
        pointsEarned: 60,
      },
      {
        userId: users[3]._id,
        type: 'bike',
        durationMin: 40,
        distanceKm: 12,
        calories: 360,
        notes: 'Recovery ride',
        date: new Date('2026-08-08T20:00:00.000Z'),
        pointsEarned: 35,
      },
    ]);

    await LeaderboardEntry.insertMany(
      users
        .map((user, index) => ({
          userId: user._id,
          name: user.name,
          points: user.points,
          rank: index + 1,
        }))
        .sort((a, b) => b.points - a.points),
    );

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
