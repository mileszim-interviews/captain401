import { DATA_FUNDS, DATA_FUND_PRICES } from '../constants';

const FUNDS = require(DATA_FUNDS);
const FUND_PRICES = require(DATA_FUND_PRICES);


/**
 * Fund Model
 */
export default class Fund {
  constructor(params) {
    this.name = params.name;
    this.symbol = params.symbol;
    this.assetClass = params.assetClass;
    this.price = this._findPrice(params);
  }

  _findPrice(params) {
    return parseFloat(FUND_PRICES.find((f) => f.symbol===params.symbol).price);
  }

  toJSON() {
    return {
      name: name,
      symbol: symbol,
      assetClass: assetClass
    };
  }


  static all() {
    return FUNDS.map((fund) => new Fund(fund));
  }

  static find(symbol) {
    let fundParams = FUNDS.find((f) => f.symbol===symbol);
    if (fundParams) { return new Fund(fundParams); }
    return null;
  }
}
