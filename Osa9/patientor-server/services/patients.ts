import data from '../data/patients';
import { v1 as uuid } from 'uuid';
import { Patient, NewPatientData } from '../types';

const patients: Patient[] = data;

const getNonSensitivePatientEntries = (): Omit<Patient, 'ssn'>[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({ 
    id,
    name,
    dateOfBirth,
    gender,
    occupation,}) as Omit<Patient, 'ssn'>
  );
};

const addPatient = (patient: NewPatientData): Patient => {
  const id = uuid();
  const newPatient = {...patient, id };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getNonSensitivePatientEntries,
  addPatient
};