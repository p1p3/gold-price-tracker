export enum WeightUnit {
  g = 'g',
  kg = 'kg',
  oz = 'oz',
}

interface WeightParser {
  canParse(fromUnit: WeightUnit, toUnit: WeightUnit);
  parse(value: number): number;
}

export const gramsToOunces: WeightParser = {
  canParse: (fromUnit: WeightUnit, toUnit: WeightUnit) => {
    return fromUnit === WeightUnit.g && toUnit === WeightUnit.oz;
  },

  parse: (grams: number) => {
    return grams * 0.03527;
  },
};

export const kilogramsToOunces: WeightParser = {
  canParse: (fromUnit: WeightUnit, toUnit: WeightUnit) => {
    return fromUnit === WeightUnit.kg && toUnit === WeightUnit.oz;
  },

  parse: (kilograms: number) => {
    return kilograms * 35.274;
  },
};

export class OuncesParser {
  static parsers: WeightParser[] = [gramsToOunces, kilogramsToOunces];
  static parse(command: { value: number; from: WeightUnit }) {
    if (command.from === WeightUnit.oz) {
      return command.value;
    }

    const parser = this.parsers.find((p) => p.canParse(command.from, WeightUnit.oz));
    if (!parser) {
      throw Error(`Parser not implemented: from ${command.from} to ${WeightUnit.oz}`);
    }

    return parser.parse(command.value);
  }
}
