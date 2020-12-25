import { OuncesParser, WeightUnit } from '../parsers/ounces.parser';

describe('parse ounces', () => {
  it('should parse kilograms', () => {
    const command = { value: 1.25, from: WeightUnit.kg };
    const result = OuncesParser.parse(command);

    expect(result).toBe(44.09245);
  });

  it('should parse grams', () => {
    const command = { value: 12.15, from: WeightUnit.g };
    const result = OuncesParser.parse(command);

    expect(result).toBe(0.4285786);
  });

  it('should parse ounces', () => {
    const command = { value: 0.25, from: WeightUnit.oz };
    const result = OuncesParser.parse(command);

    expect(result).toBe(command.value);
  });
});
