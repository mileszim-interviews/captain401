import {
  printShares,
  printTotal,
  printAllShares,
  printAssetClass,
  printAssetClassBreakdown,
  formatDate,
  formatAllocationDate,
  findDate
} from '../lib/utils';



describe("printShares", function() {
  it("returns a string for outputting share info", function() {
    let output = printShares("Test Fund", 2, 2.0, 4.0);
    expect(output).toEqual("Test Fund: 2 at $2.00 ea. -- $4.00");
  });
});


describe("printTotal", function() {
  it("returns a string for outputting total share value", function() {
    let output = printTotal(10.0);
    expect(output).toEqual("Total: $10.00");
  });
});


describe("printAllShares", function() {
  it("formats shares and share totals for output", function() {
    let output = printAllShares([{ name: "Test Fund", shares: 2, price: 2.0, total: 4.0 }], 4.0);
    expect(output).toEqual("Test Fund: 2 at $2.00 ea. -- $4.00\nTotal: $4.00");
  });
});


describe("printAssetClass", function() {
  it("returns a string for outputting asset class percentage", function() {
    let output = printAssetClass("Some Asset Class", 0.1);
    expect(output).toEqual("  Some Asset Class: 10.00%");
  });
});


describe("printAssetClassBreakdown", function() {
  it("returns a string for outputting all asset class percentages", function() {
    let output = printAssetClassBreakdown([{ name: "Some Asset Class", percent: 0.1 }]);
    expect(output).toEqual("Asset Class Breakdown\n  Some Asset Class: 10.00%");
  });
});


describe("formatDate", function() {
  it("formats a date to find historical pricing", function() {
    let output = formatDate(new Date("1-1-2012"));
    expect(output).toEqual("2012-01-01");
  });
});


describe("formatAllocationDate", function() {
  it("formats a date to find allocation sets", function() {
    let output = formatAllocationDate(new Date("2012-1-1"));
    expect(output).toEqual("1-1-2012");
  });
});


describe("findDate", function() {
  it("finds a date in a list of dates", function() {
    let date = new Date("1-1-2012");
    let dates = [new Date("1-2-2010"), new Date("10-12-2014"), new Date("1-1-2012"), new Date("11-24-2016")];
    expect(findDate(date, dates).getTime()).toEqual(date.getTime());
  });

  it("finds the closest previous date in a list of dates", function() {
    let date = new Date("1-2-2012");
    let dates = [new Date("1-2-2010"), new Date("10-12-2014"), new Date("1-1-2012"), new Date("11-24-2016")];
    expect(findDate(date, dates).getTime()).toEqual((new Date("1-1-2012")).getTime());
  });

  it("returns the first date of a list of dates when requested date before earliest date in list", function() {
    let date = new Date("1-1-2009");
    let dates = [new Date("1-2-2010"), new Date("10-12-2014"), new Date("1-1-2012"), new Date("11-24-2016")];
    expect(findDate(date, dates).getTime()).toEqual((new Date("1-2-2010")).getTime());
  });

  it("returns the last date of a list of dates when requested date later than last date in list", function() {
    let date = new Date("1-1-2017");
    let dates = [new Date("1-2-2010"), new Date("10-12-2014"), new Date("1-1-2012"), new Date("11-24-2016")];
    expect(findDate(date, dates).getTime()).toEqual((new Date("11-24-2016")).getTime());
  });
});
