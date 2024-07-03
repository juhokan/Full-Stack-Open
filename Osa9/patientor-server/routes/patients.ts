import express from 'express';
import patientsService from '../services/patients';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getNonSensitivePatientEntries());
});

router.post('/', (_req, res) => {
  res.send('Saving a diagnosis!');
});

export default router;