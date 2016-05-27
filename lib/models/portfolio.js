import { DATA_PORTFOLIO, DATA_ALLOCATION_SETS } from '../constants';
import Fund from './fund';
import HistoricalFund from './historical_fund';
import { findDate, formatAllocationDate } from '../utils';


/**
 * Portfolio Model
 */
export default class Portfolio {
  constructor(funds, total, date = null) {
    this.funds = funds;
    this.total = total;
    this.date  = new Date(date);
  }


  /**
   * Get percentage of funds in each asset class
   */
  assetClassBreakdown() {
    let assetClasses = new Map();
    let assetBreakdown = [];

    for (let f in this.funds) {
      let currentFund = this.funds[f];
      let assetClassTotal = assetClasses.get(currentFund.fund.assetClass);
      if (assetClassTotal) {
        assetClasses.set(currentFund.fund.assetClass, assetClassTotal + currentFund.total);
      } else {
        assetClasses.set(currentFund.fund.assetClass, currentFund.total);
      }
    }

    assetClasses.forEach((assetTotal, assetClass) => {
      assetBreakdown.push({ name: assetClass, percent: assetTotal/this.total });
    });

    return assetBreakdown;
  }


  /**
   * Format funds for print
   */
  fundsList() {
    return this.funds.map((f) => {
      return {
        name: f.fund.name,
        shares: f.shares,
        price: f.fund.price,
        total: f.total
      };
    });
  }


  /**
   * Export to JSON
   */
  toJSON() {
    return this.funds.map((f) => {
      return { symbol: f.fund.symbol, shares: f.shares };
    });
  }


  /**
   * Load portfolio from file
   */
  static load() {
    const PORTFOLIO = require(DATA_PORTFOLIO);
    let funds = [];
    let total = 0;

    for (let portfund of PORTFOLIO) {
      let fund = Fund.find(portfund.symbol);
      let fundTotal = parseFloat(portfund.shares * fund.price);

      funds.push({ fund: fund, shares: portfund.shares, total: fundTotal });
      total += fundTotal;
    }

    return new Portfolio(funds, total);
  }


  /**
   * Load allocation set + historical prices
   */
  static loadHistorical(date) {
    date = new Date(date); // make sure we're using a date
    const ALLOCATION_SETS = require(DATA_ALLOCATION_SETS);

    // Find matching or closest portfolio to date
    let closestDate = findDate(date, ALLOCATION_SETS.map((s) => s.date));
    let portfolio = ALLOCATION_SETS.find((s) => s.date===formatAllocationDate(closestDate)).portfolio;

    // Load funds
    let funds = [];
    let total = 0;
    for (let portfund of portfolio) {
      let fund = HistoricalFund.find(portfund.symbol, date);
      let fundTotal = parseFloat(portfund.shares * fund.price);

      funds.push({ fund: fund, shares: portfund.shares, total: fundTotal });
      total += fundTotal;
    }

    return new Portfolio(funds, total);
  }
}
