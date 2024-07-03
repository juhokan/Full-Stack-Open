export interface Diagnosis {
  readonly code: string
  readonly name: string
  readonly latin?: string
}

export interface Patient {
  readonly id: string
  readonly name: string
  readonly dateOfBirth: string
  readonly ssn: string
  readonly gender: string
  readonly occupation: string
}