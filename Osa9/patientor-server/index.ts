import express from 'express';
import cors from 'cors';
import diagnosisRouter from './routes/diagnosis';
import patientsRouter from './routes/patients';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/api/ping', (_req, res) => {
  res.status(201).json('pong');
});

app.use('/api/diagnoses', diagnosisRouter);
app.use('/api/patients', patientsRouter);

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});