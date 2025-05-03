import express from 'express';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Rate limit for /send-email
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many requests from this IP, try again later.',
});

app.use('/send-email', limiter);

// Allow CORS for local dev and Render frontend
app.use(cors({
  origin: ['http://localhost:5173', process.env.FRONTEND_URL],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json()); // Moved before routes

// Send email route
app.post('/send-email', async (req, res) => {
  const { name, email, message, recaptchaToken } = req.body;

  // Verify reCAPTCHA
  try {
    const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
    });

    const recaptchaData = await recaptchaResponse.json();
    if (!recaptchaData.success) {
      return res.status(400).json({ error: 'Failed reCAPTCHA verification' });
    }
  } catch (err) {
    return res.status(500).json({ error: 'reCAPTCHA verification failed' });
  }

  // Send email with EmailJS
  const payload = {
    service_id: process.env.EMAILJS_SERVICE_ID,
    template_id: process.env.EMAILJS_TEMPLATE_ID,
    user_id: process.env.EMAILJS_PRIVATE_KEY,
    template_params: { name, email, message },
  };

  try {
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        origin: process.env.FRONTEND_URL || 'http://localhost',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Failed to send email: ${text}`);
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email send error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Serve frontend build
app.use(express.static(path.resolve(__dirname, '../frontend/dist')));

// Fallback for SPA
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
