import React, { useEffect } from 'react'
import { SyntheticEvent } from 'react'
import patients from '../../services/patients'

import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  Chip,
  Button
} from '@mui/material'
import {
  BaseEntry,
  Diagnosis,
  Discharge,
  EntryType,
  HealthCheckRating,
  NewEntryData,
  SickLeave
} from '../../types'

interface AddEntryFormProps {
  readonly id: string | undefined;
  readonly diagnoses: Diagnosis[];
}

const AddEntryForm: React.FC<AddEntryFormProps> = ({ id, diagnoses }) => {
  const [description, setDescription] = React.useState<string>('')
  const [date, setDate] = React.useState<string>('')
  const [specialist, setSpecialist] = React.useState<string>('')
  const [diagnosisCodes, setDiagnosisCodes] = React.useState<Diagnosis['code'][]>([])
  const [type, setType] = React.useState<EntryType | ''>('') // Initialize with empty string

  const [employerName, setEmployerName] = React.useState<string>('')
  const [startDate, setStartDate] = React.useState<string>('')
  const [endDate, setEndDate] = React.useState<string>('')
  const [dischargeDate, setDischargeDate] = React.useState<string>('')
  const [dischargeCriteria, setDischargeCriteria] = React.useState<string>('')
  const [healthCheckRating, setHealthCheckRating] = React.useState<HealthCheckRating | null>(null)

  useEffect(() => {
    console.log(description)
    console.log(date)
    console.log(specialist)
    console.log(diagnosisCodes)
    console.log(type)
  }, [date, description, diagnosisCodes, specialist, type])
  

  const submitEntry = async (entry: NewEntryData) => {
    if (id) {
      await patients.createEntry(id, entry)
    }
  }

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault()
    // Construct entry object based on type and submit
    if (description && date && specialist && diagnosisCodes.length > 0 && type) {
      const entryData: Omit<BaseEntry, 'id'> = {
        description,
        date,
        specialist,
        diagnosisCodes
      }
      switch (type) {
        case EntryType.Occupational:
          if (employerName && startDate && endDate) {
            const leave: SickLeave = {
              startDate: startDate,
              endDate: endDate
            }
            const data = {
              ...entryData,
              type,
              employerName,
              leave
            }
            submitEntry(data as NewEntryData)
          }
          break
        case EntryType.HealthCheck:
          if (healthCheckRating !== null) {
            const data = {
              ...entryData,
              type,
              healthCheckRating
            }
            submitEntry(data as NewEntryData)
          }
          break
        case EntryType.Hospital:
          if (dischargeDate && dischargeCriteria) {
            const discharge: Discharge = {
              date: dischargeDate,
              criteria: dischargeCriteria
            }
            const data = {
              ...entryData,
              type,
              discharge
            }
            submitEntry(data as NewEntryData)
          }
          break
        default:
          throw new Error('Unhandled entry type')
      }
    }
  }

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel>Type</InputLabel>
        <Select
          value={type}
          onChange={(event) => setType(event.target.value as EntryType)}
        >
          <MenuItem value={EntryType.Occupational}>Occupational</MenuItem>
          <MenuItem value={EntryType.HealthCheck}>Health Check</MenuItem>
          <MenuItem value={EntryType.Hospital}>Hospital</MenuItem>
        </Select>
      </FormControl>
      <form onSubmit={addEntry}>
        <TextField
          label='Description'
          fullWidth
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <TextField
          label='Specialist'
          fullWidth
          value={specialist}
          onChange={(event) => setSpecialist(event.target.value)}
        />
        <TextField
          type='date'
          value={date}
          onChange={(event) => setDate(event.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <FormControl fullWidth>
          <InputLabel>Diagnoses</InputLabel>
          <Select
            multiple
            value={diagnosisCodes}
            onChange={(event) => setDiagnosisCodes(event.target.value as Diagnosis['code'][])}
            renderValue={(selected) => (
              <div>
                {(selected as Diagnosis['code'][]).map((code) => (
                  <Chip key={code} label={code} />
                ))}
              </div>
            )}
          >
            {diagnoses?.map((diagnosis) => (
              <MenuItem key={diagnosis.code} value={diagnosis.code}>
                {`${diagnosis.code} - ${diagnosis.name}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {type === EntryType.Occupational && (
          <>
            <TextField
              label='Employer Name'
              fullWidth
              value={employerName}
              onChange={(event) => setEmployerName(event.target.value)}
            />
            <TextField
              type='date'
              label='Start Date'
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              type='date'
              label='End Date'
              value={endDate}
              onChange={(event) => setEndDate(event.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </>
        )}
        {type === EntryType.HealthCheck && (
          <FormControl fullWidth>
            <InputLabel>Health Check Rating</InputLabel>
            <Select
              value={healthCheckRating || ''}
              onChange={(event) => setHealthCheckRating(event.target.value as HealthCheckRating)}
            >
              {[0, 1, 2, 3].map((rating) => (
                <MenuItem key={rating} value={rating}>
                  {rating}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        {type === EntryType.Hospital && (
          <>
            <TextField
              type='date'
              label='Discharge Date'
              value={dischargeDate}
              onChange={(event) => setDischargeDate(event.target.value)}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label='Discharge Criteria'
              fullWidth
              value={dischargeCriteria}
              onChange={(event) => setDischargeCriteria(event.target.value)}
            />
          </>
        )}
        <Button type='submit' variant='contained' color='primary'>
          Submit
        </Button>
      </form>
    </div>
  )
}

export default AddEntryForm
