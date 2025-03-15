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
  [BMIClass.UNDERWEIGHT]: {
    color: '#3366ff',
    description: 'คุณผอมไป กินข้าวบ้างนะ',
  },
  [BMIClass.NORMAL_WEIGHT]: {
    color: '#008000',
    description: 'คุณหุ่นดีจุงเบย',
  },
  [BMIClass.OVERWEIGHT]: {
    color: '#ffcc00',
    description: 'คุณเริ่มจะท้วมแล้วนะ',
  },
  [BMIClass.OBESE_CLASS_1]: {
    color: '#ff9900',
    description: 'คุณอ้วนละ ออกกำลังกายหน่อยนะ',
  },
  [BMIClass.OBESE_CLASS_2]: {
    color: '#ff0000',
    description: 'คุณอ้วนเกินไปละ หาหมอเหอะ',
  },
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

export const getBMIResultFlexMessage = (bmiValue: number) => {
  const bmiClass = classifyBMI(bmiValue)
  const bmiDescription = getBMIClassDescription(bmiClass)

  return {
    contents: {
      type: 'bubble',
      body: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'text',
                text: 'ผลดัชนีมวลกาย',
                weight: 'bold',
                size: 'lg',
                wrap: true,
              },
            ],
          },
          {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'text',
                contents: [
                  {
                    type: 'span',
                    text: bmiValue.toFixed(2),
                    size: 'xxl',
                    weight: 'bold',
                    color: bmiDescription.color,
                  },
                  {
                    type: 'span',
                    text: '⠀กก./ม.²',
                  },
                ],
              },
            ],
          },
          {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'text',
                text: bmiDescription.description,
              },
            ],
          },
        ],
        borderWidth: '8px',
        borderColor: bmiDescription.color,
        cornerRadius: 'xl',
      },
    },
    type: 'flex',
    altText: `ผลดัชนีมวลกาย: ${bmiValue.toFixed(2)} กก./ม.² (${bmiDescription.description})`,
  }
}
