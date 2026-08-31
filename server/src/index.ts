import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import apiRoutes from './routes/api';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve Uploaded Scan Images statically
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Connect Database
connectDB();

// API Routes
app.use('/api', apiRoutes);

// Health Check Endpoint
app.get('/health', (_req, res) => {
  res.json({
    status: 'ONLINE',
    app: 'AgriSathi AI Express REST API',
    tagline: 'Your Intelligent Farming Companion',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`🚀 AgriSathi AI Backend Server running on http://localhost:${PORT}`);
  console.log(`📡 Health Check available at http://localhost:${PORT}/health`);
});
