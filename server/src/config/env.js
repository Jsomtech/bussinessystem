import 'dotenv/config';

export const env = {
  port: Number(process.env.PORT || 5000),
  nodeEnv: process.env.NODE_ENV || 'development',
  mockAuth: process.env.MOCK_AUTH === 'true',
  supabaseUrl: process.env.SUPABASE_URL || '',
  supabaseServiceKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  storageBucket: process.env.STORAGE_BUCKET || 'product-images',
  hormuud: {
    apiUrl: process.env.HORMUUD_SMS_API_URL || '',
    apiKey: process.env.HORMUUD_SMS_API_KEY || '',
  },
  evc: {
    apiUrl: process.env.EVC_API_URL || '',
    apiKey: process.env.EVC_API_KEY || '',
  },
};
