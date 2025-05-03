// backend/server.js
import express from 'express';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3001;
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // max 5 requests per window per IP
  message: "Too many requests from this IP, try again later.",
});

app.use('/send-email', limiter);
app.use(cors());
app.use(express.json());

app.post('/send-email', async (req, res) => {
  const { name, email, message, recaptchaToken } = req.body;

  // Verify reCAPTCHA
  const recaptchaVerifyUrl = 'https://www.google.com/recaptcha/api/siteverify';
  //TODO remove key
  const secret = '6LeviywrAAAAALZO29vF5sls9qgECaFPMcyHGnsn'; //process.env.RECAPTCHA_SECRET_KEY
  const response = await fetch(recaptchaVerifyUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${secret}&response=${recaptchaToken}`
  });
  const data = await response.json();

  if (!data.success) {
    return res.status(400).json({ error: 'Failed reCAPTCHA verification' });
  }

  const payload = {
  //TODO remove keys
    service_id: 'service_bv3oaan',
    template_id: 'template_8vopdfj',
    user_id: 'zjJhX7JUA3R7QF0_B',
    template_params: {
      name,
      email,
      message,
    },
  };

  try {
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'origin': 'http://localhost', // required by EmailJS
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Failed to send email: ${text}`);
    }

    console.log('Email sent successfully!');
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email send error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
