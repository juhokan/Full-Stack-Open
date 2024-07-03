export interface ExerciseData {
  readonly periodLength: number;
  readonly trainingDays: number;
  readonly success: boolean;
  readonly rating: number;
  readonly ratingDescription: string;
  readonly target: number;
  readonly average: number;
}

export interface ExerciseRequestBody {
  daily_exercises: number[];
  target: number;
}

export const calculateExercises = (exerciseArray: number[], target: number): ExerciseData => {
  const periodLength = exerciseArray.length;
  const trainingDays = exerciseArray.filter(d => d !== 0).length;
  const average = exerciseArray.reduce((sum, val) => sum + val, 0) / periodLength;
  const success = average >= target;

  let rating: number;
  let ratingDescription: string;

  if (average >= target) {
    rating = 3;
    ratingDescription = 'Excellent, you met your target!';
  } else if (average >= target * 0.75) {
    rating = 2;
    ratingDescription = 'Not bad, but you could do better.';
  } else {
    rating = 1;
    ratingDescription = 'You need to work harder.';
  }

  const data: ExerciseData = {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };

  return data;
};