export interface Diagnosis {
  readonly code: string
  readonly name: string
  readonly latin?: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}


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

export type NonSensitivePatientData = Omit<Patient, 'ssn' | 'entries'>;

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}