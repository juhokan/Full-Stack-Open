import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises, ExerciseData, ExerciseRequestBody } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  
  const heightNumber = Number(height);
  const weightNumber = Number(weight);

  if (!height || !weight || isNaN(heightNumber) || isNaN(weightNumber)) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const bmiCategory = calculateBmi(heightNumber, weightNumber);

  return res.json({
    weight: weightNumber,
    height: heightNumber,
    bmi: bmiCategory,
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target }: ExerciseRequestBody = req.body;

  if (!daily_exercises || !target) {
    return res.status(400).json({ error: "parameters missing" });
  }

  if (!Array.isArray(daily_exercises) || isNaN(Number(target)) || daily_exercises.some(isNaN)) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const result: ExerciseData = calculateExercises(daily_exercises, Number(target));
  return res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});