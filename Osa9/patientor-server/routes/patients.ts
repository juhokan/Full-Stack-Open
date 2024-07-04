import express from 'express';
import patientsService from '../services/patients';
import toNewPatientData from '../utils';

const router = express.Router();



router.get('/', (_req, res) => {
  res.send(patientsService.getNonSensitivePatientEntries());
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const patient = patientsService.findPatient(id);
  res.send(patient);
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatientData(req.body);
    const addedPatient = patientsService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;