import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding AgriSathi AI Central MySQL Database...');

  const passwordHash = await bcrypt.hash('1234', 10);

  // 1. Create Default Farmer User
  const farmer = await prisma.user.upsert({
    where: { email: 'sambhaji@agrisathi.ai' },
    update: {},
    create: {
      name: 'Sambhaji Patil',
      mobile: '9876543210',
      email: 'sambhaji@agrisathi.ai',
      password_hash: passwordHash,
      state: 'Maharashtra',
      district: 'Nashik',
      language: 'en',
      primary_crop: 'Tomato',
      role: 'FARMER',
      latitude: 19.9975,
      longitude: 73.7898
    }
  });

  // 2. Create Default Admin User
  const admin = await prisma.user.upsert({
    where: { email: 'admin@agrisathi.ai' },
    update: {},
    create: {
      name: 'Dr. Ramesh Kumar (Agri Specialist)',
      mobile: '9999988888',
      email: 'admin@agrisathi.ai',
      password_hash: passwordHash,
      state: 'Maharashtra',
      district: 'Nashik',
      language: 'en',
      primary_crop: 'All',
      role: 'ADMIN',
      latitude: 19.9975,
      longitude: 73.7898
    }
  });

  // 3. Create Default Crop
  const crop = await prisma.crop.create({
    data: {
      user_id: farmer.id,
      crop_name: 'Tomato',
      variety: 'Roma Hybrid',
      planting_date: '2026-06-15',
      growth_stage: 'Flowering & Fruiting',
      farm_size: 3.5,
      soil_type: 'Black Sandy Loam',
      irrigation: 'Drip Irrigation',
      health_status: 'HEALTHY'
    }
  });

  // 4. Create Default Disease Knowledgebase Entry
  const disease = await prisma.disease.create({
    data: {
      name: 'Early Blight (Alternaria solani)',
      crop: 'Tomato',
      description: 'Common fungal disease affecting tomato foliage causing concentric dark rings and yellow halos.',
      symptoms: JSON.stringify(['Concentric brown spots on leaves', 'Yellowing foliage margins', 'Leaf drop']),
      prevention: JSON.stringify(['Ensure 60cm row spacing', 'Use drip irrigation', 'Avoid overhead watering']),
      treatment: JSON.stringify(['Apply Neem Oil (5ml/L)', 'Trichoderma viride root drench', 'Copper oxychloride spray']),
      organic_remedies: JSON.stringify(['Neem extract 5%', 'Garlic extract spray']),
      risk_level: 'MODERATE'
    }
  });

  // 5. Create Default Risk Alert
  await prisma.alert.create({
    data: {
      user_id: farmer.id,
      crop_id: crop.id,
      title: 'High Humidity Warning - Early Blight Risk',
      message: 'Atmospheric humidity above 82% over Nashik region increases spore germination risk.',
      alert_type: 'DISEASE',
      risk_level: 'HIGH',
      region: 'Western Maharashtra',
      is_read: false
    }
  });

  // 6. Create Simulated Demo Market Commodity Prices
  await prisma.marketData.createMany({
    data: [
      {
        crop_name: 'Tomato',
        market_name: 'Nashik APMC Mandi',
        district: 'Nashik',
        state: 'Maharashtra',
        price: 2800,
        min_price: 2400,
        max_price: 3200,
        unit: 'Quintal',
        price_trend: 'UP',
        source: 'SIMULATED DEMO MARKET DATA',
        is_mock: true
      },
      {
        crop_name: 'Cotton',
        market_name: 'Yavatmal APMC Mandi',
        district: 'Yavatmal',
        state: 'Maharashtra',
        price: 7400,
        min_price: 7100,
        max_price: 7800,
        unit: 'Quintal',
        price_trend: 'STABLE',
        source: 'SIMULATED DEMO MARKET DATA',
        is_mock: true
      }
    ]
  });

  console.log('✅ AgriSathi AI MySQL Database successfully seeded with initial records!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
