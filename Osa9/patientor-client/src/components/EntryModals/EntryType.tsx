import React from 'react'
import { Diagnosis, Entry } from '../../types'
import HospitalEntry from './HospitalEntry'
import OccupationalHealthcareEntry from './OccupationalHealthcareEntry'
import HealthCheckEntry from './HealthCheckEntry'

interface EntryProps {
  readonly entry: Entry
  readonly diagnoses: Diagnosis[]
}

const EntryType: React.FC<EntryProps> = ({ entry, diagnoses }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntry entry={entry} allDiagnoses={diagnoses}/>
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntry entry={entry} allDiagnoses={diagnoses}/>
    case "HealthCheck":
      return <HealthCheckEntry entry={entry} allDiagnoses={diagnoses} />
    default:
      return null
  }
}

export default EntryType