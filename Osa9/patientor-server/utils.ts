import { Diagnosis, Discharge, Gender, HealthCheckEntry, HealthCheckRating, HospitalEntry, NewEntryData, NewPatientData, OccupationalHealthcareEntry, SickLeave } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDateOfBirth = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
      throw new Error('Incorrect date of birth: ' + date);
  }
  return date;
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const parseSSN = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }
  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }
  return occupation;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect weather: ' + gender);
  }
  return gender;
};

export const toNewPatientData = (object: unknown): NewPatientData => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object)  {
    const newPatient: NewPatientData = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSSN(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: []
    };
  
    return newPatient;
  }

  throw new Error('Incorrect data: a field missing');
};

const parseDescription = (description: unknown): string => {
  if (!isString(description)) {
    throw new Error('Incorrect or missing occupation');
  }
  return description;
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
      throw new Error('Incorrect date: ' + date);
  }
  return date;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!isString(specialist)) {
    throw new Error('Incorrect or missing specialist');
  }
  return specialist;
};

const parseEmployerName = (employerName: unknown): string => {
  if (!isString(employerName)) {
    throw new Error('Incorrect or missing employer name');
  }
  return employerName;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const isHealthCheckRating = (param: unknown): param is HealthCheckRating => {
  return typeof param === 'number' && Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (health: unknown): HealthCheckRating => {
  if (!isHealthCheckRating(health)) {
    throw new Error('Incorrect health check rating: ' + health);
  }
  return health;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if ( !discharge || typeof discharge !== 'object' || discharge === null ) {
    throw new Error('Incorrect or missing discharge data');
  }
  const { date, criteria } = discharge as { date: unknown, criteria: unknown };

  if (!isString(date) || !isString(criteria)) {
    throw new Error('Incorrect or missing discharge information');
  }
  if (!isDate(date)) {
    throw new Error('Incorrect discharge date: ' + date);
  }

  return {
    date: date,
    criteria: criteria
  };
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (!sickLeave || typeof sickLeave !== 'object' || Array.isArray(sickLeave)) {
    throw new Error('Incorrect or missing sick leave data');
  }
  const { startDate, endDate } = sickLeave as { startDate: unknown, endDate: unknown };

  if (!isString(startDate) || !isString(endDate)) {
    throw new Error('Incorrect or missing sick leave information');
  }
  if (!isDate(startDate)) {
    throw new Error('Incorrect sick leave start date: ' + startDate);
  }
  if (!isDate(endDate)) {
    throw new Error('Incorrect sick leave end date: ' + endDate);
  }

  return {
    startDate: startDate,
    endDate: endDate
  };
};


export const toNewEntryData = (object: unknown): NewEntryData => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }
  if ('description' in object && 'date' in object && 'specialist' in object && 'type' in object)  {
    switch (object.type) {
      case 'HealthCheck':
        if ('healthCheckRating' in object) {
          const newHealthCheckData: Omit<HealthCheckEntry, 'id'> = {
            description: parseDescription(object.description),
            date: parseDate(object.date),
            specialist: parseSpecialist(object.specialist),
            diagnosisCodes: 'diagnosisCodes' in object ? parseDiagnosisCodes(object.diagnosisCodes) : [],
            type: object.type,
            healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
          };
          return newHealthCheckData;
        }
        throw new Error('Incorrect data: a field missing');
      case 'Hospital':
        if ('discharge' in object) {
          const newHospitalData: Omit<HospitalEntry, 'id'> = {
            description: parseDescription(object.description),
            date: parseDate(object.date),
            specialist: parseSpecialist(object.specialist),
            diagnosisCodes: 'diagnosisCodes' in object ? parseDiagnosisCodes(object.diagnosisCodes) : [],
            type: object.type,
            discharge: parseDischarge(object.discharge)
          };
          return newHospitalData;
        }
        throw new Error('Incorrect data: a field missing');
        case 'OccupationalHealthcare':
          if ('employerName' in object) {
            const newOccupationalHealthcareData: Omit<OccupationalHealthcareEntry, 'id'> = {
              description: parseDescription(object.description),
              date: parseDate(object.date),
              specialist: parseSpecialist(object.specialist),
              diagnosisCodes: 'diagnosisCodes' in object ? parseDiagnosisCodes(object.diagnosisCodes) : undefined,
              employerName: parseEmployerName(object.employerName),
              sickLeave: 'sickLeave' in object ? parseSickLeave(object.sickLeave) : undefined,
              type: 'OccupationalHealthcare'
            };
            return newOccupationalHealthcareData;
          }
          throw new Error('Incorrect data: a field missing');
    }
  }
  throw new Error('Incorrect data: a field missing');
};