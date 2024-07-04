import React, { useEffect } from "react"
import { useParams } from "react-router-dom"
import patientsService from "../../services/patients"
import diagnosesService from "../../services/diagnoses"
import { Diagnosis, Patient } from "../../types"
import EntryType from "../EntryModals/EntryType"

const PatientPage: React.FC = () => {
  const [patient, setPatient] = React.useState<Patient | null>(null)
  const [diagnoses, setDiagnoses] = React.useState<Diagnosis[]>([])
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
      {patient?.entries && patient?.entries?.length > 0 && <h3>Entries</h3>}
      {patient?.entries?.map((e) => (
        <EntryType key={e.id} entry={e} diagnoses={diagnoses} />
      ))}
    </>
  )  
}

export default PatientPage
