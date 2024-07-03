import data from '../data/patients';

import { Patient } from '../types';

const getNonSensitivePatientEntries = (): Omit<Patient, 'ssn'>[] => {
  return data.map(({ id, name, dateOfBirth, gender, occupation }) => ({ 
    id,
    name,
    dateOfBirth,
    gender,
    occupation,}) as Omit<Patient, 'ssn'>
  );
};

const addPatient = () => {
  return null;
};

export default {
  getNonSensitivePatientEntries,
  addPatient
};