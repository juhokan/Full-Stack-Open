enum BmiCategory {
  Underweight = "Underweight",
  Normal = "Normal (healthy weight)",
  Overweight = "Overweight or Obese",
}

const calculateBmi = (height: number, weight: number): string | null => {
  const bmi = weight / (height / 100) ** 2;
  switch (true) {
    case bmi < 18.5:
      return BmiCategory.Underweight;
    case bmi >= 18.5 && bmi < 24.9:
      return BmiCategory.Normal;
    case bmi >= 25:
     return BmiCategory.Overweight
    default:
      return
  }
}

console.log(calculateBmi(180, 100));
