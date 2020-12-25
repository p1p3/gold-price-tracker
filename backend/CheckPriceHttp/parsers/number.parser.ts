import { numberParser, locale, load } from 'globalize';
import { entireSupplemental, entireMainFor } from 'cldr-data';

load(entireSupplemental());
load(entireMainFor('en', 'es', 'de'));
locale('de');

export const parseNumber = (value: string) => {
  const parser = numberParser();
  return parser(value);
};
