import { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import User from '../models/User';
import Crop from '../models/Crop';
import Scan from '../models/Scan';
import Alert from '../models/Alert';
import { AIService } from '../services/aiService';
import { WeatherService } from '../services/weatherService';

const router = Router();

// Multer Storage Configuration for Uploaded Scan Images
const uploadDir = path.join(__dirname, '../../uploads/scans');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname) || '.jpg';
    cb(null, `crop_scan_${Date.now()}_${file.originalname.replace(/[^a-zA-Z0-9.]/g, '_')}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (_req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const mimeValid = allowedTypes.test(file.mimetype);
    const extValid = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    if (mimeValid && extValid) {
      return cb(null, true);
    }
    cb(new Error('Only JPG, JPEG, PNG, and WEBP image files are allowed.'));
  }
});

// In-Memory Persistent Store
interface MemoryStore {
  users: any[];
  crops: any[];
  scans: any[];
  alerts: any[];
}

const memoryStore: MemoryStore = {
  users: [
    {
      _id: 'user_1',
      name: 'Sambhaji Patil',
      phone: '9876543210',
      email: 'sambhaji@agrisathi.ai',
      role: 'FARMER',
      state: 'Maharashtra',
      district: 'Nashik',
      preferredLanguage: 'en',
      primaryCrop: 'Tomato',
      createdAt: new Date()
    }
  ],
  crops: [],
  scans: [],
  alerts: [
    {
      id: 'alert_1',
      title: 'High Humidity Warning - Early Blight Risk',
      category: 'DISEASE',
      description: 'Atmospheric humidity above 82% over Nashik region increases spore germination risk for Tomato crops.',
      date: 'Today',
      severity: 'HIGH',
      region: 'Western Maharashtra'
    }
  ]
};

// --- SCANNER AI ROUTES ---
router.post('/scans', upload.single('image'), async (req: Request, res: Response) => {
  try {
    const cropName = req.body.cropName || 'Tomato';
    const location = req.body.location || 'Nashik, Maharashtra';
    
    let imageUrl = '/uploads/scans/sample_tomato.jpg';
    if (req.file) {
      imageUrl = `/uploads/scans/${req.file.filename}`;
    }

    const aiPrediction = await AIService.analyzeImage({
      cropName,
      imageFilePath: req.file ? req.file.path : '',
      location
    });

    const fullScan = {
      ...aiPrediction,
      userId: req.body.userId || 'user_1',
      imageUrl,
      location,
      timestamp: Date.now()
    };

    memoryStore.scans.unshift(fullScan);

    try {
      const scanDoc = new Scan(fullScan);
      await scanDoc.save();
    } catch (e) {
      // In-memory fallback
    }

    return res.json(fullScan);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

router.get('/scans', async (req: Request, res: Response) => {
  try {
    const scans = await Scan.find({}).sort({ timestamp: -1 });
    if (scans && scans.length > 0) return res.json(scans);
  } catch (e) {}
  return res.json(memoryStore.scans);
});

router.get('/scans/:id', async (req: Request, res: Response) => {
  const scan = memoryStore.scans.find(s => s.scanId === req.params.id);
  if (scan) {
    return res.json(scan);
  }

  try {
    const dbScan = await Scan.findOne({ scanId: req.params.id });
    if (dbScan) return res.json(dbScan);
  } catch (e) {}

  if (memoryStore.scans.length > 0) {
    return res.json(memoryStore.scans[0]);
  }

  return res.status(404).json({ error: 'Scan result not found.' });
});

// --- AUTH & OTHER ROUTES ---
router.post('/auth/register', async (req: Request, res: Response) => {
  const { name, phone, email, password, state, district, preferredLanguage, primaryCrop, role } = req.body;
  const user = {
    _id: 'user_' + Date.now(),
    name,
    phone,
    email,
    passwordHash: password,
    role: role || 'FARMER',
    state: state || 'Maharashtra',
    district: district || 'Nashik',
    preferredLanguage: preferredLanguage || 'en',
    primaryCrop: primaryCrop || 'Tomato',
    createdAt: new Date()
  };
  memoryStore.users.push(user);
  return res.json({ message: 'Registration successful', user, token: 'jwt_token_' + user._id });
});

router.post('/auth/login', async (req: Request, res: Response) => {
  const user = memoryStore.users[0];
  return res.json({ message: 'Login successful', user, token: 'jwt_token_' + user._id });
});

router.get('/auth/me', async (req: Request, res: Response) => {
  return res.json({ user: memoryStore.users[0] });
});

router.get('/crops', async (req: Request, res: Response) => {
  return res.json(memoryStore.crops);
});

router.post('/crops', async (req: Request, res: Response) => {
  const crop = { _id: 'crop_' + Date.now(), ...req.body, createdAt: new Date() };
  memoryStore.crops.push(crop);
  return res.json(crop);
});

router.get('/crops/:id', async (req: Request, res: Response) => {
  const crop = memoryStore.crops.find(c => c._id === req.params.id) || memoryStore.crops[0];
  return res.json(crop);
});

router.delete('/crops/:id', async (req: Request, res: Response) => {
  memoryStore.crops = memoryStore.crops.filter(c => c._id !== req.params.id);
  return res.json({ success: true, message: 'Crop deleted successfully' });
});

router.get('/weather', async (req: Request, res: Response) => {
  const lat = req.query.lat ? parseFloat(req.query.lat as string) : undefined;
  const lng = req.query.lng ? parseFloat(req.query.lng as string) : undefined;
  const district = req.query.district as string || 'Nashik, Maharashtra';

  const weatherData = await WeatherService.getWeather(lat, lng, district);
  return res.json(weatherData);
});

router.get('/alerts', async (req: Request, res: Response) => {
  return res.json(memoryStore.alerts);
});

router.post('/assistant/chat', async (req: Request, res: Response) => {
  const { query, crop, location, weather } = req.body;
  const q = (query || '').toLowerCase();

  let reply = `Based on your ${crop || 'Tomato'} crop located in ${location || 'Nashik'} under current weather conditions (${weather?.tempC || 29}°C, ${weather?.humidity || 74}% humidity): `;

  if (q.includes('yellow') || q.includes('leaf')) {
    reply += 'Yellowing leaves on lower branches are a classic symptom of Early Blight or nitrogen deficiency. Check for dark concentric ring spots. Apply organic Neem spray (5ml/L) and maintain proper spacing for airflow.';
  } else if (q.includes('rain') || q.includes('water')) {
    reply += 'After heavy rainfall, ensure ridge drainage to prevent root waterlogging. Spray Trichoderma viride around root zones to protect against fungal wilt.';
  } else if (q.includes('pest') || q.includes('worm') || q.includes('bug')) {
    reply += 'Install Pheromone traps (8-10 per acre) and sticky yellow cards to monitor moth and whitefly emergence. Avoid late chemical sprays that harm beneficial predatory insects.';
  } else {
    reply += 'To protect your yield, maintain a regular 7-day field inspection routine, use drip irrigation, and scan any suspicious leaves immediately using the AgriSathi AI Crop Scanner.';
  }

  return res.json({ query, reply, timestamp: Date.now() });
});

router.get('/admin/analytics', async (req: Request, res: Response) => {
  return res.json({
    metrics: {
      totalFarmers: 1420,
      totalScans: 8560,
      activeAlerts: 12,
      diseasesDetected: 34,
      mostAffectedCrop: 'Tomato (38% of scans)'
    },
    scanTrends: [
      { month: 'May', scans: 850 },
      { month: 'Jun', scans: 1420 },
      { month: 'Jul', scans: 2100 },
      { month: 'Aug', scans: 2850 }
    ],
    cropDistribution: [
      { name: 'Tomato', percentage: 38 },
      { name: 'Cotton', percentage: 26 },
      { name: 'Paddy', percentage: 18 },
      { name: 'Sugarcane', percentage: 12 },
      { name: 'Onion', percentage: 6 }
    ],
    farmers: memoryStore.users,
    crops: memoryStore.crops,
    scans: memoryStore.scans,
    alerts: memoryStore.alerts
  });
});

export default router;
