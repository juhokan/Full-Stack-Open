import data from '../data/patients';
import { v1 as uuid } from 'uuid';
import { Patient, NewPatientData, NonSensitivePatientData, NewEntryData, Entry } from '../types';

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

const addEntry = (entry: NewEntryData, patient: Patient): Entry => {
  const id = uuid();
  
  let newEntry: Entry;

  switch (entry.type) {
    case 'HealthCheck':
      newEntry = {
        id,
        type: entry.type,
        description: entry.description,
        date: entry.date,
        specialist: entry.specialist,
        diagnosisCodes: entry.diagnosisCodes || [],
        healthCheckRating: entry.healthCheckRating
      };
      break;
    case 'OccupationalHealthcare':
      newEntry = {
        id,
        type: entry.type,
        description: entry.description,
        date: entry.date,
        specialist: entry.specialist,
        diagnosisCodes: entry.diagnosisCodes || [],
        employerName: entry.employerName,
        sickLeave: entry.sickLeave
      };
      break;
    case 'Hospital':
      newEntry = {
        id,
        type: entry.type,
        description: entry.description,
        date: entry.date,
        specialist: entry.specialist,
        diagnosisCodes: entry.diagnosisCodes || [],
        discharge: entry.discharge
      };
      break;
    default:
      throw new Error('Invalid entry type');
  }

  patient.entries.push(newEntry);
  return newEntry;
};

const findPatient = (id: string): Patient | undefined => {
  const patient = patients.find(p => p.id === id);
  return patient;
};

export default {
  getNonSensitivePatientEntries,
  addPatient,
  findPatient,
  addEntry
};