interface ExerciseData {
  readonly periodLength: number;
  readonly trainingDays: number;
  readonly success: boolean;
  readonly rating: number;
  readonly ratingDescription: string;
  readonly target: number;
  readonly average: number;
}

const calculateExercises = (exerciseArray: number[], target: number): ExerciseData => {
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

try {
  const args = process.argv.slice(2).map(arg => parseFloat(arg));
  const target = args.pop();

  if (args.length === 0 || target && isNaN(target)) {
    throw new Error('Please provide valid numbers for exercise data and target.');
  }

  if (args.some(isNaN)) {
    throw new Error('All exercise values must be numbers.');
  }

  if (target) {
    console.log(calculateExercises(args, target));
  }
} catch (error) {
  if (error instanceof Error) {
    console.error('Error:', error.message);
  }
}