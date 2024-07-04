import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import patients from '../../services/patients';
import { Patient } from '../../types';

const PatientPage: React.FC = () => {
  const [patient, setPatient] = React.useState<Patient | null>(null);
  const id = useParams().id;

  const getPatient = async () => {
    if (id) {
      const p = await patients.getOne(id);
      setPatient(p);
    }
  };

  useEffect(() => {
    getPatient();
  }, [id]);

  return (
    <>
    <h1>{patient?.name}</h1>
    <p>gender: {patient?.gender}</p>
    <p>ssn: {patient?.ssn}</p>
    <p>occupation: {patient?.occupation}</p>
    </>
  );
};

export default PatientPage;