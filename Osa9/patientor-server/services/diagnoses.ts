import data from '../data/diagnoses';

import { Diagnosis } from '../types';

const getDiagnoses = (): Diagnosis[] => {
  return data;
};

const addDiagnosis = () => {
  return null;
};

export default {
  getDiagnoses,
  addDiagnosis
};