import { AzureFunction, Context, HttpRequest } from '@azure/functions';

import { parseEuros, parseWeight } from './parsers/text.parser';
import { parseNumber } from './parsers/number.parser';

import * as puppeteer from 'puppeteer';
import { OuncesParser } from './parsers/ounces.parser';

// TODO : https://www.goldapi.io/dashboard

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const browser = await puppeteer.launch();
  const officialPricePerOunce: number = req.query?.price ? parseNumber(req.query.price) : 1542.3;

  try {
    const page = await browser.newPage();
    await page.goto('https://philoro.at/preisliste');

    const pageProducts = await page.evaluate(() => {
      const sections = Array.from(document.getElementsByClassName('philoro_shoping-cart-heading'));
      const goldSections = sections
        .filter((s) => s.innerHTML.toLowerCase().includes('gold'))
        .map((c) => c.parentElement.parentElement);

      const products = goldSections
        .map((gs) => Array.from(gs.getElementsByClassName('philoro_shoping-cart--element')))
        .reduce((flat, val) => flat.concat(val), []);

      return products.map((p) => {
        const title = p.querySelector('.col-sm-7.col-xs-12  a')?.innerHTML;
        const price = p.querySelector('[data-sellid]')?.innerHTML;
        const weight = p.querySelector('.col-sm-3 .col-xs-6.col-sm-12 > p.text-right')?.innerHTML;

        return { title, price, weight };
      });
    });

    const parsedProducts = pageProducts
      .filter((p) => p.price && p.weight && p.title)
      .map((p) => {
        const price = parseEuros(p.price);
        const weight = parseWeight(p.weight);
        const weightInOunces = OuncesParser.parse({ value: weight.value, from: weight.unit });
        if(!weightInOunces){
          context.log(weightInOunces);
        }
        const priceOfOneOunce = price / weightInOunces;
        const rate = officialPricePerOunce / priceOfOneOunce;
        return { title: p.title, priceOfOneOunce, price, weight, rate, weightInOunces };
      });

    context.res = {
      status: 200,
      body: parsedProducts,
    };
  } catch (error) {
    context.res = {
      status: 500,
      body: error,
    };
    throw error;
  }

  await browser?.close();
};

export default httpTrigger;
