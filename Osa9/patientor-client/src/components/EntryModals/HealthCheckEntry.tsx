import React, { useEffect } from 'react'
import { Diagnosis, Entry } from '../../types'
import { TransformDiagnosisCodes } from '../../transformer'

interface HealthCheckEntryProps {
  readonly entry: Entry
  readonly allDiagnoses: Diagnosis[]
}

const HealthCheckEntry: React.FC<HealthCheckEntryProps> = ({ entry, allDiagnoses }) => {
  const [diagnoses, setDiagnoses] = React.useState<Diagnosis[] | null>(null)

  useEffect(() => {
    if (entry.diagnosisCodes) {
      const d = TransformDiagnosisCodes(entry.diagnosisCodes, allDiagnoses)
      setDiagnoses(d)
    }
  }, [allDiagnoses, entry.diagnosisCodes])

  return (
    <div style={{
      border: '2px solid black',
      borderRadius: '4px',
      padding: '8px',
      margin: '4px'
    }}>
      <div>Health check {entry.description}</div><br/>
      {diagnoses?.map(d => (
        <div>{d.code} {d.name}</div>
      ))}
      <p>diagnosis by {entry.specialist}</p>
    </div>
  )
}

export default HealthCheckEntry