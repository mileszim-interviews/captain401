import Portfolio from '../models/portfolio';
import { printAssetClassBreakdown } from '../utils';


/**
 * Step 3
 */
export default function step3() {
  let portfolio = Portfolio.load();
  let assetBreakdown = portfolio.assetClassBreakdown();

  let output = printAssetClassBreakdown(assetBreakdown);

  return new Promise((resolve) => {
    resolve(output);
  });
}
