export const calculateBMI = (heightCm: number, weightKg: number): number => {
  if (
    typeof heightCm !== 'number' ||
    typeof weightKg !== 'number' ||
    heightCm <= 0 ||
    weightKg <= 0
  ) {
    throw new Error('Invalid input')
  }

  const heightMeters: number = heightCm / 100
  const bmi: number = weightKg / (heightMeters * heightMeters)

  return bmi
}

enum BMIClass {
  UNDERWEIGHT = 'Underweight',
  NORMAL_WEIGHT = 'Normal weight',
  OVERWEIGHT = 'Overweight',
  OBESE_CLASS_1 = 'Obese Class 1',
  OBESE_CLASS_2 = 'Obese Class 2',
}

const BMIClassDescription = {
  [BMIClass.UNDERWEIGHT]: 'คุณผอมไป กินข้าวบ้างนะ',
  [BMIClass.NORMAL_WEIGHT]: 'คุณหุ่นดีจุงเบย',
  [BMIClass.OVERWEIGHT]: 'คุณเริ่มจะท้วมแล้วนะ',
  [BMIClass.OBESE_CLASS_1]: 'คุณอ้วนละ ออกกำลังกายหน่อยนะ',
  [BMIClass.OBESE_CLASS_2]: 'คุณอ้วนเกินไปละ หาหมอเหอะ',
}

export const classifyBMI = (bmi: number) => {
  if (isNaN(bmi)) {
    throw new Error('Invalid input')
  }

  if (bmi < 18.5) {
    return BMIClass.UNDERWEIGHT
  }

  if (bmi < 23) {
    return BMIClass.NORMAL_WEIGHT
  }

  if (bmi < 25) {
    return BMIClass.OVERWEIGHT
  }

  if (bmi < 30) {
    return BMIClass.OBESE_CLASS_1
  }

  return BMIClass.OBESE_CLASS_2
}

export const getBMIClassDescription = (bmiClass: BMIClass) => {
  return BMIClassDescription[bmiClass]
}
