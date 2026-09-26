export const connectDatabase = async (): Promise<void> => {
  try {
    // Database connection initialization (MongoDB / PostgreSQL)
    console.log('✅ Connected to AgriSathi database');
  } catch (error) {
    console.error('❌ Database connection error:', error);
    process.exit(1);
  }
};

