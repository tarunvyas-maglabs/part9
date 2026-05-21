interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseValues {
  target: number;
  exercises: number[];
}

const calculateExercises = (dailyExerciseHours: number[], dailyTarget: number): Result => {
  const periodLength = dailyExerciseHours.length
  const trainingDays = dailyExerciseHours.filter(h => h !== 0).length;
  const average = dailyExerciseHours.reduce((curr, sum) => curr + sum, 0) / periodLength;
  const success = average >= dailyTarget;
  const rating = calculateRating(average, dailyTarget);
  const ratingDescription = getRatingDescription(rating);

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target: dailyTarget,
    average
  }
}

const calculateRating = (average: number, target: number) => {
  const diff = target - average
  if(diff <= 0) {
    return 3;
  } else if (diff < 0.5) {
    return 2;
  } else {
    return 1;
  }
}

const getRatingDescription = (rating: number) => {
  switch(rating) {
    case 3:
      return "you smashed it!";
    case 2:
      return "not too bad but could be better";
    case 1:
      return "room for improvement";
    default:
      throw new Error('Invalid rating')
  }
}

const parseExercises = (args: string[]): ExerciseValues => {
  if(args.length < 4) {
    throw new Error('Too few arguments');
  }
  const target = args[2];
  if (isNaN(Number(target))) {
    throw new Error('Invalid target');
  }
  const exerciseArgs = args.slice(3);
  for (const e of exerciseArgs) {
    if(isNaN(Number(e))) {
      throw new Error('Invalid arguments')
    }
  }
  return {
    target: Number(target),
    exercises: exerciseArgs.map(e => Number(e))
  };
}

try {
  const { target, exercises } = parseExercises(process.argv);
  console.log(calculateExercises(exercises, target));
} catch (error) {
  let errorMessage = 'Error: ';
  if (error instanceof Error) {
    errorMessage += errorMessage;
  }
  console.log(errorMessage);
}