enum WeightType {
  Light = 'Light',
  Regular = 'Regular',
  Semibold = 'Semibold',
  Bold = 'Bold',
}

const weightValue: Record<keyof typeof WeightType, number> = {
  Light: 300,
  Regular: 400,
  Semibold: 600,
  Bold: 900,
};

const TextStyleGenerator = (_weightType: WeightType) => {
  const fontFamily = 'font-family: Noto Sans KR;';
  const fontWeight = `font-weight: ${weightValue[_weightType]};`;
  return `${fontFamily}${fontWeight}`;
};

const TextStyle: { [key: string]: (_weightType: WeightType) => string } = {
  REGULAR: (_weightType: WeightType) => TextStyleGenerator(_weightType),
  BOLD: (_weightType: WeightType) => TextStyleGenerator(_weightType),
};

const fonts = {
  REGULAR: TextStyle.REGULAR(WeightType.Regular),
  BOLD: TextStyle.BOLD(WeightType.Bold),
};

export default fonts;