export interface Diagnosis {
  readonly code: string
  readonly name: string
  readonly latin?: string
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface SickLeave {
  startDate: string
  endDate: string
}

export interface Discharge {
  date: string
  criteria: string
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: SickLeave
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: Discharge
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface Patient {
  id: string
  readonly name: string
  readonly dateOfBirth: string
  readonly ssn: string
  readonly gender: Gender
  readonly occupation: string
  entries: Entry[]
}

export type NewPatientData = Omit<Patient, 'id'>;

export type NewEntryData = Omit<HealthCheckEntry, 'id'> | Omit<HospitalEntry, 'id'> | Omit<OccupationalHealthcareEntry, 'id'>;

export type NonSensitivePatientData = Omit<Patient, 'ssn' | 'entries'>;

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}