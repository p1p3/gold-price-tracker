import { parseNumber } from '../parsers/number.parser';

describe('parse euros', () => {
  it('should parse hundreds', () => {
    const value = '579,80';
    const result = parseNumber(value);

    expect(result).toBe(579.8);
  });

  it('should parse thousands', () => {
    const value = '1.579,80';
    const result = parseNumber(value);

    expect(result).toBe(1579.8);
  });

  it('should parse millions', () => {
    const value = '1.579.898,80';
    const result = parseNumber(value);

    expect(result).toBe(1579898.8);
  });
});

describe('parse ounces', () => {
  it('should parse decimals', () => {
    const value = '0,50';
    const result = parseNumber(value);

    expect(result).toBe(0.50);
  });
});