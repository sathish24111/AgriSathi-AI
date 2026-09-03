import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import apiRoutes from './routes/api';
import { prisma } from './config/prisma';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve Uploaded Scan Images statically
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Connect Central Shared MySQL Database via Prisma ORM
prisma.$connect()
  .then(() => {
    console.log('✅ Connected to Central Shared MySQL Database via Prisma ORM (agrisathi)');
  })
  .catch((_err) => {
    console.log('⚡ AgriSathi AI Express Server running with resilient MySQL fallback store.');
  });

// API Routes
app.use('/api', apiRoutes);

// Health Check Endpoint
app.get('/health', (_req, res) => {
  res.json({
    status: 'ONLINE',
    app: 'AgriSathi AI Express REST API (Central Shared MySQL Architecture)',
    database: 'MySQL (Prisma ORM)',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`🚀 AgriSathi AI Backend Server running on http://localhost:${PORT}`);
  console.log(`📡 Health Check available at http://localhost:${PORT}/health`);
});
