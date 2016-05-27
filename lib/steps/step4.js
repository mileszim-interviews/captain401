import {
  DATA_FUNDS,
  DATA_FUNDS_HISTORICAL,
  QUOTES_HISTORICAL_ENDPOINT,
  QUOTES_HISTORICAL_START_DATE,
  QUOTES_HISTORICAL_END_DATE
} from '../constants';

import request from 'request-promise';
import parse from 'csv-parse/lib/sync';
import fs from 'fs';
import qs from 'querystring';

const FUNDS = require(DATA_FUNDS);


/**
 * Step 4
 */
export default async function step4() {
  let symbols = FUNDS.map((fund) => fund.symbol);

  let historicalPrices = [];

  for (let fund of symbols) {
    let query = {
      s: fund,
      a: QUOTES_HISTORICAL_START_DATE.getMonth(),
      b: QUOTES_HISTORICAL_START_DATE.getDate(),
      c: QUOTES_HISTORICAL_START_DATE.getFullYear(),
      d: QUOTES_HISTORICAL_END_DATE.getMonth(),
      e: QUOTES_HISTORICAL_END_DATE.getDate(),
      f: QUOTES_HISTORICAL_END_DATE.getFullYear(),
      g: 'd',
      ignore: '.csv'
    };

    let endpoint = `${QUOTES_HISTORICAL_ENDPOINT}?${qs.stringify(query)}`;

    try {
      let prices = await request.get(endpoint);
      let parsed = parse(prices, { columns: ['date', 'open', 'high', 'low', 'close', 'volume', 'adj_close']});
      let priceList = parsed.map((fundPrice) => { return { date: fundPrice.date, symbol: fund, price: parseFloat(fundPrice.close) }; });
      historicalPrices = historicalPrices.concat(priceList.slice(1));
    } catch(error) {
      return error;
    }
  }

  // Save
  fs.writeFileSync(DATA_FUNDS_HISTORICAL, JSON.stringify(historicalPrices, null, 2));
  return new Promise((resolve) => resolve());
}
