import Portfolio from '../models/portfolio';
import { printAllShares } from '../utils';


/**
 * Step 2
 */
export default function step2() {
  let portfolio = Portfolio.load();
  let funds = portfolio.fundsList();

  let output = printAllShares(funds, portfolio.total);

  return new Promise((resolve) => {
    resolve(output);
  });
}
