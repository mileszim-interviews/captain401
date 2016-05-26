import { DATA_FUNDS, DATA_FUND_PRICES, QUOTES_ENDPOINT, QUOTES_PROPERTIES } from '../constants';

import request from 'request-promise';
import parse from 'csv-parse/lib/sync';
import fs from 'fs';
import qs from 'querystring';

const FUNDS = require(DATA_FUNDS);


/**
 * Step 1
 */
export default async function step1() {
  let symbols = FUNDS.map((fund) => fund.symbol).join(",");

  let query = QUOTES_PROPERTIES;
  query.s = symbols;

  let endpoint = `${QUOTES_ENDPOINT}?${qs.stringify(query)}`;

  try {
    // Fetch prices and parse CSV
    let prices = await request.get(endpoint);
    let parsed = parse(prices, { columns: ['symbol', 'price']});

    // Save
    fs.writeFileSync(DATA_FUND_PRICES, JSON.stringify(parsed, null, 2));
    return parsed;
  } catch(error) {
    return error;
  }
}
