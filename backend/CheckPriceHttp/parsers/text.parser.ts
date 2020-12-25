import { WeightUnit } from './ounces.parser';
import { parseNumber } from './number.parser';

export const parseEuros = (text: string): number => {
  const value = text.replace('€', '').trim();
  return parseNumber(value);
};

export const parseWeight = (text: string): { value: number; unit: WeightUnit } => {
  const regex = /(\d*\,?\d+)\s?(\w+)/i;
  const result = text.match(regex);

  const value = result[1];
  const unit = result[2].toLowerCase();

  const parsedValue = parseNumber(value);
  const parsedUnit = WeightUnit[unit as keyof typeof WeightUnit];

  return { value: parsedValue, unit: parsedUnit };
};
