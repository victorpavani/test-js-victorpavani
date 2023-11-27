type AnticipatorConfig = {
  columnSize: number;
  minToAnticipate: number;
  maxToAnticipate: number;
  anticipateCadence: number;
  defaultCadence: number;
};

type SlotCoordinate = {
  column: number;
  row: number;
};

type SpecialSymbol = { specialSymbols: Array<SlotCoordinate> };

type RoundsSymbols = {
  roundOne: SpecialSymbol;
  roundTwo: SpecialSymbol;
  roundThree: SpecialSymbol;
};

type SlotCadence = Array<number>;

type RoundsCadences = {
  roundOne: SlotCadence;
  roundTwo: SlotCadence;
  roundThree: SlotCadence;
};

const anticipatorConfig: AnticipatorConfig = {
  columnSize: 5,
  minToAnticipate: 2,
  maxToAnticipate: 3,
  anticipateCadence: 2,
  defaultCadence: 0.25,
};

const gameRounds: RoundsSymbols = {
  roundOne: {
    specialSymbols: [
      { column: 0, row: 2 },
      { column: 1, row: 3 },
      { column: 3, row: 4 },
    ],
  },
  roundTwo: {
    specialSymbols: [
      { column: 0, row: 2 },
      { column: 0, row: 3 },
    ],
  },
  roundThree: {
    specialSymbols: [
      { column: 4, row: 2 },
      { column: 4, row: 3 },
    ],
  },
};

const slotMachineCadences: RoundsCadences = { roundOne: [], roundTwo: [], roundThree: [] };

function slotCadence(symbols: SlotCoordinate[]): SlotCadence {
  const maxColumns = anticipatorConfig.columnSize;
  const minToAnticipate = anticipatorConfig.minToAnticipate;
  const maxToAnticipate = anticipatorConfig.maxToAnticipate;
  const anticipateCadence = anticipatorConfig.anticipateCadence;
  const defaultCadence = anticipatorConfig.defaultCadence;

  const cadences: SlotCadence = [];

  for (let col = 0; col < maxColumns; col++) {
    let hasSpecialSymbol = false;

    for (let row = 0; row < maxColumns; row++) {
      const symbol = symbols.find((s) => s.column === col && s.row === row);

      if (symbol) {
        hasSpecialSymbol = true;
        break;
      }
    }

    const columnCadence = hasSpecialSymbol ? anticipateCadence : defaultCadence;
    cadences.push(columnCadence);
  }

  const totalSpecialSymbols = symbols.length;
  if (totalSpecialSymbols < minToAnticipate || totalSpecialSymbols > maxToAnticipate) {
    for (let i = 0; i < cadences.length; i++) {
      cadences[i] = defaultCadence;
    }
  }

  return cadences;
}

function handleCadences(rounds: RoundsSymbols): RoundsCadences {
  slotMachineCadences.roundOne = slotCadence(rounds.roundOne.specialSymbols);
  slotMachineCadences.roundTwo = slotCadence(rounds.roundTwo.specialSymbols);
  slotMachineCadences.roundThree = slotCadence(rounds.roundThree.specialSymbols);

  return slotMachineCadences;
}

console.log('Round One Cadence:', slotCadence(gameRounds.roundOne.specialSymbols));
console.log('Round Two Cadence:', slotCadence(gameRounds.roundTwo.specialSymbols));
console.log('Round Three Cadence:', slotCadence(gameRounds.roundThree.specialSymbols));

console.log('CADENCES:', handleCadences(gameRounds));
