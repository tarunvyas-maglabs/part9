import express from 'express';
import { calculateBmi } from './bmiCalculator.ts';
import { calculateExercises } from './exerciseCalculator.ts';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    res.status(400).json({ error: "malformatted parameters" });
    return;
  }

  const result = calculateBmi(height, weight);
  res.json({
    weight,
    height,
    bmi: result
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment 
  const { daily_exercises: dailyExercises, target } = req.body;
  
  if(!target || !dailyExercises) {
    return res.status(400).send({ error: 'parameters missing' });
  }

  if(isNaN(Number(target))) {
    return res.status(400).send({ error: 'malformatted parameters' });
  }

  const exerciseHrs: number[] = [];
  for(const e of dailyExercises) {
    if(isNaN(Number(e))) {
      return res.status(400).send({ error: 'malformatted parameters' });
    }
    exerciseHrs.push(Number(e));
  }

  const result = calculateExercises(exerciseHrs, Number(target));
  return res.json(result);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});