import { CELL } from './../constants';

/**
 * Takes a generation and builds a new generation based on the rules
 * of the Game of Life.
 * @see https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
 * 
 * Rules:
 *  - Any live cell with two or three live neighbours survives.
 *  - Any dead cell with three live neighbours becomes a live cell.
 *  - All other live cells die in the next generation. Similarly,
 *    all other dead cells stay dead.
 * @param currentGen Current generation
 * @returns A new generation
 */
export function getNextGen(gen: number[][]) {
  const rowSize = gen.length;
  const colSize = gen[0].length;

  const nextGen = buildEmptyGen(rowSize, colSize);

  for (let row = 0; row < rowSize; ++row) {
    for (let col = 0; col < colSize; ++col) {
      const currentCell = getCell(gen, row, col);
      const liveNeighboursCount = getLiveNeighboursCount(gen, row, col);

      if (shouldDeadCellRevive(currentCell, liveNeighboursCount)) {
        reviveCell(nextGen, row, col);
        continue;
      }

      if (shouldLiveCellSurvive(currentCell, liveNeighboursCount)) {
        reviveCell(nextGen, row, col);
        continue;
      }

      // All other cells die or stay dead in the next generation
      killCell(nextGen, row, col);
    }
  }

  return nextGen;
}

/**
 * Builds a generation of dead cells with a given size.
 * @param rowSize Number of rows for the generation.
 * @param colSize Number of columns for the generation.
 */
export function buildEmptyGen(rowSize: number, colSize: number) {
  const gen: CELL[][] = [];

  for (let row = 0; row < rowSize; ++row) {
    const emptyRow: CELL[] = [];
    gen.push(emptyRow);

    for (let col = 0; col < colSize; ++col) {
      emptyRow.push(getDeadCell());
    }
  }

  return gen;
}

/**
 * Creates a copy of a generation by value.
 * @param gen Current generation.
 */
export function cloneGen(gen: CELL[][]) {
  const newGen: CELL[][] = [];
  const rowSize = gen.length;
  const colSize = gen[0].length;

  for (let row = 0; row < rowSize; ++row) {
    const emptyRow: CELL[] = [];
    newGen.push(emptyRow);

    for (let col = 0; col < colSize; ++col) {
      emptyRow.push(getCell(gen, row, col));
    }
  }

  return newGen;
}

/**
 * Verifies if a dead cell should revive.
 * - Any dead cell with three live neighbours becomes a live cell.
 * @param cell Either a dead or live cell.
 * @param liveNeighbours Number of live neighbours of the given `cell`.
 */
function shouldDeadCellRevive(cell: CELL, liveNeighbours: number) {
  return isCellDead(cell) && liveNeighbours === 3;
}

/**
 * Verifies if an alive cell should survive.
 * - Any live cell with two or three live neighbours survives
 * @param cell Either a dead or live cell.
 * @param liveNeighbours  Number of live neighoubrs of the given `cell`.
 */
function shouldLiveCellSurvive(cell: CELL, liveNeighbours: number) {
  return isCellAlive(cell) && (liveNeighbours === 2 || liveNeighbours === 3);
}

/**
 * Sets `state` in a given position of a generation of cells.
 * @warning Side effect. `gen` is modified by reference.
 * @param gen Generation
 * @param row Row position
 * @param col Column position
 * @param state New state, either a dead or live cell.
 */
function setGenState(gen: CELL[][], row: number, col: number, state: CELL) {
  gen[row][col] = state;
}

/**
 * Change state to dead for a given position of a generation of cells.
 * @param gen Generation
 * @param row Row position
 * @param col Column position
 */
export function killCell(gen: CELL[][], row: number, col: number) {
  const newGen = cloneGen(gen);
  setGenState(newGen, row, col, getDeadCell());
  return newGen;
}

/**
 * Change state to alive for a given position of a generation of cells.
 * @param gen Generation
 * @param row Row position
 * @param col Column position
 */
export function reviveCell(gen: CELL[][], row: number, col: number) {
  const newGen = cloneGen(gen);
  setGenState(newGen, row, col, getLiveCell());
  return newGen;
}

/**
 * Gets the value of a given cell position.
 * If the cell does not exists, assume it is dead.
 * @param gen Generation.
 * @param row Row position.
 * @param col Col position.
 * @returns Either a live or dead cell value.
 */
export function getCell(gen: CELL[][], row: number, col: number) {
  return gen?.[row]?.[col] ?? CELL.DEAD;
}

/**
 * Returns a dead cell.
 */
function getDeadCell() {
  return CELL.DEAD;
}

/**
 * Returns a live cell.
 */
function getLiveCell() {
  return CELL.LIVE;
}

/**
 * Verifies if a given `cell` is dead.
 * @param cell Either a live or dead cell.
 */
export function isCellDead(cell: CELL) {
  return cell === getDeadCell();
}

/**
 * Verifies if a given `cell` is alive.
 * @param cell Either a live or dead cell.
 */
export function isCellAlive(cell: CELL) {
  return !isCellDead(cell);
}

/**
 * Counts number of live neighbours for the given position.
 * @param gen Generation.
 * @param row Row position.
 * @param col Column position.
 */
function getLiveNeighboursCount(gen: CELL[][], row: number, col: number) {
  let liveNeighbourCount = 0;

  const topLeftNeighbour = getCell(gen, row - 1, col - 1);
  if (isCellAlive(topLeftNeighbour)) {
    liveNeighbourCount++;
  }

  const topNeighbour = getCell(gen, row - 1, col);
  if (isCellAlive(topNeighbour)) {
    liveNeighbourCount++;
  }

  const topRightNeighbour = getCell(gen, row - 1, col + 1);
  if (isCellAlive(topRightNeighbour)) {
    liveNeighbourCount++;
  }

  const leftNeighbour = getCell(gen, row, col - 1);
  if (isCellAlive(leftNeighbour)) {
    liveNeighbourCount++;
  }

  const rightNeighbour = getCell(gen, row, col + 1);
  if (isCellAlive(rightNeighbour)) {
    liveNeighbourCount++;
  }

  const bottomLeftNeighbour = getCell(gen, row + 1, col - 1);
  if (isCellAlive(bottomLeftNeighbour)) {
    liveNeighbourCount++;
  }

  const bottomNeighbour = getCell(gen, row + 1, col);
  if (isCellAlive(bottomNeighbour)) {
    liveNeighbourCount++;
  }

  const bottomRightNeighbour = getCell(gen, row + 1, col + 1);
  if (isCellAlive(bottomRightNeighbour)) {
    liveNeighbourCount++;
  }

  return liveNeighbourCount;
}

/**
 * Print generation to console for testing purposes.
 * @param gen 
 */
export function printGeneration(gen: CELL[][]) {
  console.log('--'.repeat(gen[0].length));

  for (let row of gen) {
    console.log(JSON.stringify(row));
  }
}
