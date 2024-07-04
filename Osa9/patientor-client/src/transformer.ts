import { Diagnosis } from "./types"

export const TransformDiagnosisCodes = (codes: Array<Diagnosis['code']>, diagnoses: Diagnosis[]): Diagnosis[] => {
  const patientDiagnoses: Diagnosis[] = []

  codes.forEach(code => {
    const d = diagnoses.find(c => c.code === code)
    if (d) {
      patientDiagnoses.push(d)
    } 
  })

  return patientDiagnoses
}