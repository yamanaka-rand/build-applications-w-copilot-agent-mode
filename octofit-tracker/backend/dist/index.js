import express from 'express';
import cors from 'cors';
import fitnessRoutes from './routes/fitness.js';
const app = express();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME || '';
const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`;
app.use(cors());
app.use(express.json());
app.get('/api/health', (_req, res) => {
    res.json({
        status: 'ok',
        environment: process.env.NODE_ENV || 'development',
        codespaceName,
        apiBaseUrl,
    });
});
app.get('/api', (_req, res) => {
    res.json({ message: 'Welcome to OctoFit Tracker backend' });
});
app.use('/api', fitnessRoutes);
app.listen(port, () => {
    console.log(`Backend running on ${apiBaseUrl}`);
});
