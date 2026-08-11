import express from 'express';
import cors from 'cors';
import fitnessRoutes from './routes/fitness.js';
const app = express();
const port = Number(process.env.PORT) || 8000;
app.use(cors());
app.use(express.json());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', environment: process.env.NODE_ENV || 'development' });
});
app.get('/api', (_req, res) => {
    res.json({ message: 'Welcome to OctoFit Tracker backend' });
});
app.use('/api', fitnessRoutes);
app.listen(port, () => {
    console.log(`Backend running on http://localhost:${port}`);
});
