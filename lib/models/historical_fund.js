import { DATA_FUNDS, DATA_FUNDS_HISTORICAL } from '../constants';
import Fund from './fund';
import { formatDate, findDate } from '../utils';

const FUNDS = require(DATA_FUNDS);
const HISTORICAL_FUND_PRICES = require(DATA_FUNDS_HISTORICAL);


/**
 * Historical Fund Model
 */
export default class HistoricalFund extends Fund {
  constructor(params) {
    params.date = new Date(params.date); // make sure we are using a date object
    super(params);
    this._date = params.date;
  }

  _findPrice(params) {
    let date = findDate(params.date, HISTORICAL_FUND_PRICES.map((f) => f.date));
    console.log(formatDate(date));
    let fund = HISTORICAL_FUND_PRICES.find((f) => f.symbol===params.symbol && f.date===formatDate(date));
    if (fund) { return fund.price; }
    return 0;
  }

  get date() {
    return formatDate(this.date);
  }


  static all() {
    return FUNDS.map((fund) => new HistoricalFund(fund));
  }

  static find(symbol, date) {
    let fundParams = FUNDS.find((f) => f.symbol===symbol);
    fundParams.date = date;
    if (fundParams) { return new HistoricalFund(fundParams); }
    return null;
  }
}
