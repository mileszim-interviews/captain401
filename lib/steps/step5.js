import Portfolio from '../models/portfolio';
import { printAllShares, printAssetClassBreakdown } from '../utils';



/**
 * Step 5
 */
export default function step5(date) {
  let portfolio = Portfolio.loadHistorical(date);
  let funds = portfolio.fundsList();
  let assetBreakdown = portfolio.assetClassBreakdown();

  let outputShares = printAllShares(funds, portfolio.total);
  let outputAssets = printAssetClassBreakdown(assetBreakdown);

  return new Promise((resolve) => {
    resolve(outputShares + '\n\n' + outputAssets);
  });
}
