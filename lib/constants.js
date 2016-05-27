// Data
export const DATA_ALLOCATION_SETS  = `${process.cwd()}/data/allocation_sets.json`;
export const DATA_FUND_PRICES      = `${process.cwd()}/data/fund_prices.json`;
export const DATA_FUNDS            = `${process.cwd()}/data/funds.json`;
export const DATA_PORTFOLIO        = `${process.cwd()}/data/portfolio.json`;
export const DATA_FUNDS_HISTORICAL = `${process.cwd()}/data/historical_prices.json`;


// Ticker Quotes
export const QUOTES_ENDPOINT   = 'http://download.finance.yahoo.com/d/quotes.csv';
export const QUOTES_PROPERTIES = { s: '', f: 'sl1', e: '.csv' }


// Quote History
export const QUOTES_HISTORICAL_ENDPOINT = 'http://ichart.yahoo.com/table.csv';
export const QUOTES_HISTORICAL_START_DATE = new Date("2014-1-1");
export const QUOTES_HISTORICAL_END_DATE = new Date("2015-1-1");
