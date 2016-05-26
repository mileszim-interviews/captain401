import { DATA_FUNDS } from '../constants';

// Dirty ORM
let _fundsList = require(DATA_FUNDS);
let _funds = {};
for (let f of _fundsList) {
  _funds[f.symbol] = f;
}


/**
 * Fund
 */
class Fund {
  constructor(params = {}) {
    this.name       = params.name;
    this.symbol     = params.symbol;
    this.assetClass = params.assetClass
  }


  // Static
  static all() {
    return _fundsList.map((fund) => new Fund(fund));
  }

  static pluck(param) {
    return _fundsList.map((fund) => fund[param]);
  }

  static find(symbol) {
    let fund = fund
    return new Fund()
  }
}
