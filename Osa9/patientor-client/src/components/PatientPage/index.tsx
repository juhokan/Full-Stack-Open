import React, { useEffect } from "react"
import { useParams } from "react-router-dom"
import patientsService from "../../services/patients"
import diagnosesService from "../../services/diagnoses"
import { Diagnosis, Patient } from "../../types"

const PatientPage: React.FC = () => {
  const [patient, setPatient] = React.useState<Patient | null>(null)
  const [diagnoses, setDiagnoses] = React.useState<Diagnosis[] | null>(null)
  const id = useParams().id

  const getPatient = async () => {
    if (id) {
      const p = await patientsService.getOne(id)
      setPatient(p)
    }
  }
  
  const getDiagnoses = async () => {
    const p = await diagnosesService.getAll()
    setDiagnoses(p)
    
  }

  useEffect(() => {
    getPatient()
    getDiagnoses()
  }, [id])

  return (
    <>
      <h1>{patient?.name}</h1>
      <p>gender: {patient?.gender}</p>
      <p>ssn: {patient?.ssn}</p>
      <p>occupation: {patient?.occupation}</p>
      {patient?.entries && <h4>Entries</h4>}
      {patient?.entries?.map((e) => (
        <div key={e.id}>
          <p>{e.date} {e.description}</p>
          {e.diagnosisCodes?.map(d => {
            const diagnosis = diagnoses?.find(code => code.code === d)
            return (
              <p key={d}>{diagnosis?.code} {diagnosis?.name}</p>
            )
          })}
        </div>
      ))}
    </>
  )
}

export default PatientPage
