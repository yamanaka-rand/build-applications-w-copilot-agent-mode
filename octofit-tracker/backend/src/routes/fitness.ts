import { Router } from 'express';
import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/fitness.js';

const router = Router();

async function ensureDbConnection() {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  if (mongoose.connection.readyState === 2) {
    await new Promise((resolve) => {
      mongoose.connection.once('open', resolve);
    });
    return;
  }

  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db');
}

router.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'octofit-tracker' });
});

router.get('/users', async (_req, res) => {
  try {
    await ensureDbConnection();
    const users = await User.find().sort({ createdAt: -1 }).lean();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users', details: error instanceof Error ? error.message : error });
  }
});

router.post('/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create user', details: error instanceof Error ? error.message : error });
  }
});

router.get('/teams', async (_req, res) => {
  try {
    await ensureDbConnection();
    const teams = await Team.find().sort({ createdAt: -1 }).lean();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch teams', details: error instanceof Error ? error.message : error });
  }
});

router.post('/teams', async (req, res) => {
  try {
    const team = await Team.create(req.body);
    res.status(201).json(team);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create team', details: error instanceof Error ? error.message : error });
  }
});

router.get('/activities', async (_req, res) => {
  try {
    await ensureDbConnection();
    const activities = await Activity.find().sort({ date: -1 }).lean();
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activities', details: error instanceof Error ? error.message : error });
  }
});

router.post('/activities', async (req, res) => {
  try {
    const activity = await Activity.create(req.body);
    res.status(201).json(activity);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create activity', details: error instanceof Error ? error.message : error });
  }
});

router.get('/workouts', async (_req, res) => {
  try {
    await ensureDbConnection();
    const workouts = await Workout.find().sort({ createdAt: -1 }).lean();
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workouts', details: error instanceof Error ? error.message : error });
  }
});

router.post('/workouts', async (req, res) => {
  try {
    const workout = await Workout.create(req.body);
    res.status(201).json(workout);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create workout', details: error instanceof Error ? error.message : error });
  }
});

router.get('/leaderboard', async (_req, res) => {
  try {
    await ensureDbConnection();
    const leaderboard = await LeaderboardEntry.find().sort({ points: -1, createdAt: 1 }).lean();
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard', details: error instanceof Error ? error.message : error });
  }
});

router.post('/leaderboard', async (req, res) => {
  try {
    const entry = await LeaderboardEntry.create(req.body);
    res.status(201).json(entry);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create leaderboard entry', details: error instanceof Error ? error.message : error });
  }
});

export default router;
