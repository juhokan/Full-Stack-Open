export interface Diagnosis {
  readonly code: string
  readonly name: string
  readonly latin?: string
}


export interface Patient {
  id: string
  readonly name: string
  readonly dateOfBirth: string
  readonly ssn: string
  readonly gender: Gender
  readonly occupation: string
}

export type NewPatientData = Omit<Patient, 'id'>;

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}