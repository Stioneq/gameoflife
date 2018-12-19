export function* getGeneration(cells): any {

  while (true) {
    const copy = JSON.parse(JSON.stringify(cells));
    for (let i = 0; i < cells.length; i++) {
      for (let j = 0; j < cells[i].length; j++) {
        const nbrs = getAliveNeighbours(cells, i, j);
        if (cells[i][j] === 1) {
          if (nbrs < 2 || nbrs > 3) {
            copy[i][j] = 0;
          } else {
            copy[i][j] = 1;
          }
        } else if (nbrs === 3) {
          copy[i][j] = 1;
        } else {
          copy[i][j] = 0;
        }
      }
    }
    cells = copy;
    yield cells;
  }
}

function getValue(cells, i, j) {
  if (i < 0) {
    i = cells.length - 1;
  }
  if (i >= cells.length) {
    i = 0;
  }
  if (j < 0) {
    j = cells[i].length - 1;
  }
  if (j >= cells[i].length) {
    j = 0;
  }
  return cells[i][j];
}


function getAliveNeighbours(cells, i, j) {
  return getValue(cells, i + 1, j - 1) +
    getValue(cells, i + 1, j) +
    getValue(cells, i + 1, j + 1) +
    getValue(cells, i, j + 1) +
    getValue(cells, i - 1, j + 1) +
    getValue(cells, i - 1, j) +
    getValue(cells, i - 1, j - 1) +
    getValue(cells, i, j - 1);
}

