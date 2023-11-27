type WinningCombinationsResult = [number, number[]][];

function call(lines: number[]): WinningCombinationsResult {
  const payingSymbols = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const wildSymbol = 0;

  const result: WinningCombinationsResult = [];

  for (let i = 0; i <= lines.length - 3; i++) {
    const [symbolA, symbolB, symbolC] = lines.slice(i, i + 3);

    const isPayLineWithWild =
      symbolA === wildSymbol &&
      payingSymbols.includes(symbolB) &&
      payingSymbols.includes(symbolC);

    const isPayLine =
      payingSymbols.includes(symbolA) &&
      ((symbolA === symbolB && symbolB === symbolC) || isPayLineWithWild);

    if (isPayLine) {
      const uniqueSymbols = [symbolA, symbolB, symbolC].filter(
        (symbol, index, arr) => arr.indexOf(symbol) === index
      );

      const payLineSymbol = uniqueSymbols.find(
        (symbol) => symbol !== wildSymbol && payingSymbols.includes(symbol)
      );

      if (payLineSymbol !== undefined) {
        const existingIndex = result.findIndex(([num]) => num === payLineSymbol);

        if (existingIndex === -1) {
          result.push([payLineSymbol, uniqueSymbols]);
        } else {
          const existingSymbols = result[existingIndex][1];
          const isNewCombinationBetter =
            uniqueSymbols.length > existingSymbols.length ||
            (uniqueSymbols.length === existingSymbols.length &&
              uniqueSymbols.join('') < existingSymbols.join(''));

          if (isNewCombinationBetter) {
            result[existingIndex] = [payLineSymbol, uniqueSymbols];
          }
        }
      }
    }
  }

  return result.filter(([symbol]) => symbol !== wildSymbol);
}

export const WinningCombinations = { call };
