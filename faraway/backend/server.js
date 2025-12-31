const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const axios = require('axios');

const {
  Strategy: GoogleStrategy
} = require('passport-google-oauth20');

// ==========================
// DATABASE
// ==========================
const mongoose = require('mongoose');

const mrDB = mongoose.createConnection(
  process.env.MONGO_URI_MEDICAL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

mrDB.on('connected', () => {
  console.log('✅ Medical DB connected');
});

mrDB.on('error', err => {
  console.error('❌ MongoDB error:', err.message);
});

// ==========================
// SCHEMA
// ==========================
const patientSchema = new mongoose.Schema({
  patientId: String,
  fullName: String,
  dateOfBirth: Date,
  gender: String,
  contactNumber: String,
  email: String,
  address: String,
  emergencyContact: {
    name: String,
    relationship: String,
    phone: String
  }
});

const Patient = mrDB.model('Patient', patientSchema, 'patientInfo');

// ==========================
// AXIOS INSTANCE (SAFE)
// ==========================
const api = axios.create({
  timeout: 5000 
});

// ==========================
// EXPRESS SETUP
// ==========================
const port = process.env.PORT || 7000;

app.use(cors({
  origin: '*',
  credentials: true, 
}));

app.use(express.json());
app.use(passport.initialize());

// ==========================
// PASSPORT GOOGLE
// ==========================
passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `https://hppbackend.onrender.com//login/callback`
  },
  (accessToken, refreshToken, profile, cb) => {
    try {
      const user = {
        id: profile.id,
        name: profile.displayName,
        email: profile.emails?.[0]?.value || ''
      };

      const token = jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: '1h'
      });

      return cb(null, { user, token });
    } catch (err) {
      return cb(err, null);
    }
  }
));

// ==========================
// TOKEN VERIFY
// ==========================
app.get('/verify', (req, res) => {
  try {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        valid: false,
        message: 'No token provided'
      });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          valid: false,
          message: 'Invalid token'
        });
      }

      res.json({
        valid: true,
        user: decoded
      });
    });
  } catch (err) {
    res.status(500).json({ valid: false, message: 'Server error' });
  }
});

// ==========================
// AUTH ROUTES
// ==========================
app.get('/login/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'consent',
    accessType: 'offline'
  })
);

app.get('/login/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: '/'
  }),
  (req, res) => {
    const { token } = req.user;
    res.redirect(`https://hpp-frontend-one.vercel.app/login?token=${token}`);
  }
);

// ==========================
// PRESCRIPTION (SAFE)
// ==========================
app.get('/prescription', async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: 'Email required', code: 'error' });
  }

  try {
    const response = await api.get(
      'https://docsys-app-server.onrender.com/api/prescriptions'
    );

    const filtered = response.data?.data?.filter(d => d.email === email) || [];

    res.json({
      message: 'Successfully retrieved data',
      data: filtered,
      code: 'success'
    });
  } catch (err) {
    console.error('❌ Prescription API error:', err.message);
    res.json({
      message: 'Prescription service unavailable',
      data: [],
      code: 'fallback'
    });
  }
});

// ==========================
// PATIENT DATA (SAFE)
// ==========================
app.get('/patientData', async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: 'Email required', code: 'error' });
  }

  try {
    const [prmsRes, docSysRes] = await Promise.allSettled([
      api.get('https://prms-test.onrender.com/api/patients'),
      api.get('https://docsys-app-server.onrender.com/api/prescriptions')
    ]);

    const prmsData = prmsRes.status === 'fulfilled' ? prmsRes.value.data : [];
    const docData = docSysRes.status === 'fulfilled'
      ? docSysRes.value.data?.data || []
      : [];

    const prescriptions = docData.filter(d => d.email === email);

    const prescriptionMap = new Map();
    prescriptions.forEach(p => {
      if (!prescriptionMap.has(p.patientId)) {
        prescriptionMap.set(p.patientId, p.dateOfPrescription);
      }
    });

    const filtered = prmsData
      .filter(p => p.email === email)
      .map(p => ({
        patientId: p.patientId,
        condition: p.condition,
        dateAdmitted: p.dateAdmitted,
        status: prescriptionMap.has(p.patientId) ? 'Completed' : 'Pending',
        prescriptionDate: prescriptionMap.get(p.patientId) || null
      }));

    res.json({
      message: 'Successfully retrieved data',
      data: filtered,
      code: 'success'
    });
  } catch (err) {
    console.error('❌ PatientData error:', err.message);
    res.json({
      message: 'Partial service unavailable',
      data: [],
      code: 'fallback'
    });
  }
});

// ==========================
// PROFILE (SAFE)
// ==========================
app.get('/profile', async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: 'Email required', code: 'error' });
  }

  try {
    const response = await api.get('https://prms-test.onrender.com/api/patients');
    const patient = response.data.find(p => p.email === email);

    if (!patient) {
      return res.json({ message: 'No profile found', data: null, code: 'empty' });
    }

    res.json({
      message: 'success',
      data: {
        age: patient.age,
        gender: patient.gender,
        address: patient.address,
        dateOfBirth: patient.dob
      },
      code: 'success'
    });
  } catch (err) {
    console.error('❌ Profile error:', err.message);
    res.json({
      message: 'Profile service unavailable',
      data: null,
      code: 'fallback'
    });
  }
});

// ==========================
// ROOT
// ==========================
app.get('/', (req, res) => {
  res.send('Server is running');
});

// ==========================
// PROCESS SAFETY (IMPORTANT)
// ==========================
process.on('unhandledRejection', err => {
  console.error('🔥 Unhandled Rejection:', err.message);
});

process.on('uncaughtException', err => {
  console.error('🔥 Uncaught Exception:', err.message);
});

// ==========================
// START SERVER
// ==========================
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
