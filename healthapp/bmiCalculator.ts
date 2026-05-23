interface BmiValues {
  height: number;
  weight: number;
}

export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight/ ((height/100) * (height/100));
  if(bmi < 16) {
    return 'Underweight (Severe thinness)';
  } else if (bmi <= 17) {
    return 'Underweight (Moderate thinness)';
  } else if (bmi <= 18.5 ) {
    return 'Underweight (Mild thinness)';
  } else if (bmi <= 25.0) {
    return "Normal range";
  } else if (bmi <= 30) {
    return "Overweight (Pre-obese)";
  } else if (bmi <= 35) {
    return "Obese (Class I)";
  } else if (bmi <= 40) {
    return "Obese (Class II)";
  } else {
    return "Obese (Class III)";
  }
};

export const parseArguments = (args: string[]): BmiValues => {
  if(args.length > 4) throw new Error('Too many arguments');
  if(args.length < 4) throw new Error('Too few arguments');
  
  if(!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Invalid arguments');
  }
};

if (process.argv[1] === import.meta.filename) {
  try{
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
  } catch (error) {
    let errorMessage = 'Error: ';
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.log(errorMessage);
  }
}