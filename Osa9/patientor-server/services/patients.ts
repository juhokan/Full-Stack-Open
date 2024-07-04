import data from '../data/patients';
import { v1 as uuid } from 'uuid';
import { Patient, NewPatientData, NonSensitivePatientData } from '../types';

const patients: Patient[] = data;

const getNonSensitivePatientEntries = (): NonSensitivePatientData[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({ 
    id,
    name,
    dateOfBirth,
    gender,
    occupation,})
  );
};

const addPatient = (patient: NewPatientData): Patient => {
  const id = uuid();
  const newPatient = {...patient, id };
  patients.push(newPatient);
  return newPatient;
};

const findPatient = (id: string): NonSensitivePatientData | undefined => {
  const patient = patients.find(p => p.id === id);
  return patient;
};

export default {
  getNonSensitivePatientEntries,
  addPatient,
  findPatient
};