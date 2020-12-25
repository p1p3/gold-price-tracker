import { WeightUnit } from '../parsers/ounces.parser';
import { parseEuros, parseWeight } from '../parsers/text.parser';

describe('parse euros', () => {
  it('should parse € 1.522,40', () => {
    const value = ' € 1.522,40 ';
    const result = parseEuros(value);

    expect(result).toBe(1522.4);
  });
});

describe('parse weight', () => {
  it('should parse kilograms', () => {
    const value = ' 1,25 Kg ';
    const result = parseWeight(value);

    expect(result.unit).toBe(WeightUnit.kg);
    expect(result.value).toBe(1.25);
  });

  it('should parse grams', () => {
    const value = ' 12,15 g ';
    const result = parseWeight(value);

    expect(result.unit).toBe(WeightUnit.g);
    expect(result.value).toBe(12.15);
  });

  it('should parse ounces', () => {
    const value = ' 0,25 oz ';
    const result = parseWeight(value);

    expect(result.unit).toBe(WeightUnit.oz);
    expect(result.value).toBe(0.25);
  });
});
