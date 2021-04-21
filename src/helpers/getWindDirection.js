const windDirection = {
  0: 'С',
  1: 'СВ',
  2: 'В',
  3: 'ЮВ',
  4: 'Ю',
  5: 'ЮЗ',
  6: 'З',
  7: 'СЗ',
  8: 'С',
};

export const getWindDirection = (deg) => {
  return windDirection[Math.round(deg / 45)];
};
