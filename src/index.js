import { play } from '2048_functional';

function fromEngineToHTML(array) {
  const result = array.reduce((acc, elem, i) => {
    const node = document.createElement('div');
    node.classList.add('row', `row-index-${i}`);
    return acc.concat(elem.reduce((parentNode, value, j) => {
      const tileNode = document.createElement('div');
      tileNode.classList.add('cell', `cell-index-${j}`, 'tile', `tile-${value}`);
      tileNode.textContent = value;
      parentNode.appendChild(tileNode);
      return parentNode;
    }, node));
  }, []);
  return result;
}

function fromHTMLtoEngine(node) {
  const getArrayOfChildren = nd => Array.from(nd.childNodes);
  const arr = getArrayOfChildren(node)
    .map(row => getArrayOfChildren(row)
      .map(cell => Number(cell.textContent)));
  return arr;
}

const gameFieldHandler = (event) => {
  const selector = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
  };

  const gameNode = document.querySelector('.game-field');
  const prevField = fromHTMLtoEngine(gameNode);
  const direction = selector[event.keyCode];
  if (!direction) return;
  const game = play({ prevField, direction });
  const newNode = fromEngineToHTML(game.nextField);
  while (gameNode.lastChild) { gameNode.removeChild(gameNode.lastChild); }
  newNode.forEach(item => gameNode.appendChild(item));
};

const newGameButtonHandler = () => {
  const gameNode = document.querySelector('.game-field');
  const game = play({ isNewGame: true });
  const newField = fromEngineToHTML(game.nextField);
  while (gameNode.lastChild) { gameNode.removeChild(gameNode.lastChild); }
  newField.forEach(item => gameNode.appendChild(item));
};

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.game-field').textContent = 'loaded';
  document.addEventListener('keydown', gameFieldHandler);
  document.querySelector('.new-game').addEventListener('click', newGameButtonHandler);
});
