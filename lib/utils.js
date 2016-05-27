/**
 * Utils/decorators
 */

// Output shares
export function printShares(name, shares, price, total) {
  return `${name}: ${shares} at $${price.toFixed(2)} ea. -- $${total.toFixed(2)}`;
}


// Output total
export function printTotal(total) {
  return `Total: $${total.toFixed(2)}`;
}


// Output shares + total
export function printAllShares(funds, total) {
  let output = [];
  for (let f in funds) {
    let currentFund = funds[f];
    output.push(printShares(currentFund.name, currentFund.shares, currentFund.price, currentFund.total));
  }

  output.push(printTotal(total));
  return output.join('\n');
}


// Output assetClass
export function printAssetClass(name, percent) {
  return `  ${name}: ${(percent*100).toFixed(2)}%`;
}


// Output spec asset class breakdown
export function printAssetClassBreakdown(assetClassBreakdown) {
  let output = ['Asset Class Breakdown'];
  for (let a in assetClassBreakdown) {
    let assetClass = assetClassBreakdown[a];
    output.push(printAssetClass(assetClass.name, assetClass.percent));
  }
  return output.join('\n');
}


// Format date
export function formatDate(date) {
  return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;
}


// Format allocation date
export function formatAllocationDate(date) {
  return `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
}


// Find date or closest previous date
export function findDate(date, dateList) {
  // make sure we have dates and sort ascending
  date = new Date(date);
  dateList = dateList.map((d) => new Date(d)).sort((a,b) => a-b);

  for (let i = 0; i < dateList.length; i++) {
    let currentDate = dateList[i];
    if (date.getTime() === currentDate.getTime()) {
      return date;                     // It equals, we're done
    } else
    if (date > currentDate) {          // We want a date in the future, so check:
      if (i < (dateList.length - 1)) { // - do we have more dates in our list?
        continue;                      // -- then keep going
      } else {                         // - otherwise
        return currentDate;            // -- return the last date in the list
      }
    } else
    if (date < currentDate) {          // We asked for a date earlier than the current one, so check:
      if (i === 0) {                   // - is this the first date in our list?
        return dateList[0];            // -- then return the first date in our list (keep the bounds simple)
      } else {
        return dateList[i-1];          // otherwise return the previous date
      }
    }
  }
}
