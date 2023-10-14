import { Player } from './board';
import { AircraftCarrier } from './boats/AircraftCarrier';
import { Cruise } from './boats/Cruise';
import { DIRECTIONS } from './constants';
import inquirer from 'inquirer';

const play = async () => {
  const name1 = await inquirer.prompt({
    type: 'input',
    name: 'name',
    message: 'Player 1 name:',
  });

  const name2 = await inquirer.prompt({
    type: 'input',
    name: 'name',
    message: 'Player 2 name:',
  });

  const player1 = new Player(name1.name);
  const player2 = new Player(name2.name);

  const aircraftCarrier1 = new AircraftCarrier(1);

  const boats = [aircraftCarrier1];

  for await (let boat of boats) {
    const { x, y, direction } = await inquirer.prompt([
      {
        type: 'number',
        name: 'x',
        message: `${player1.name} enter x coordinate for ${boat.Name}:`,
      },
      {
        type: 'number',
        name: 'y',
        message: `${player1.name} enter y coordinate for ${boat.Name}:`,
      },
      {
        type: 'list',
        name: 'direction',
        message: `${player1.name} enter direction for ${boat.Name}:`,
        choices: Object.values(DIRECTIONS),
      },
    ]);

    player1.board.addBoat(boat, { x, y, direction });
  }

  for await (let boat of boats) {
    const { x, y, direction } = await inquirer.prompt([
      {
        type: 'number',
        name: 'x',
        message: `${player2.name} enter x coordinate for ${boat.Name}:`,
      },
      {
        type: 'number',
        name: 'y',
        message: `${player2.name} enter y coordinate for ${boat.Name}:`,
      },
      {
        type: 'list',
        name: 'direction',
        message: `${player2.name} enter direction for ${boat.Name}:`,
        choices: Object.values(DIRECTIONS),
      },
    ]);

    player2.board.addBoat(boat, { x, y, direction });
  }
  console.log({ payer1: player1.board, player2: player2.board });
  let currentPlayer = player1;
  let win = false;

  while (!win) {
    const { x, y } = await inquirer.prompt([
      {
        type: 'number',
        name: 'x',
        message: `${currentPlayer.name} enter x coordinate:`,
      },
      {
        type: 'number',
        name: 'y',
        message: `${currentPlayer.name} enter y coordinate:`,
      },
    ]);

    let result;

    if (currentPlayer === player1) {
      result = player2.attack({ x, y });
    } else {
      result = player1.attack({ x, y });
    }

    console.log({ result });

    if (result === 'GAME_WON') {
      console.log(`${currentPlayer.name} won the game!`);
      win = true;
    }

    if (result === 'MISS') {
      currentPlayer = currentPlayer === player1 ? player2 : player1;
    }
  }

  console.log('Winner is: ', currentPlayer.name);
};

play();
// console.log(player1.attack({ x: 0, y: 0 }));
// console.log(player1.attack({ x: 0, y: 1 }));

// console.log(player1.attack({ x: 1, y: 3 }));
// console.log(player1.attack({ x: 1, y: 4 }));

// console.log(player1.attack({ x: 5, y: 1 }));
// console.log(player1.attack({ x: 5, y: 2 }));
// console.log(player1.attack({ x: 5, y: 3 }));
// console.log(player1.attack({ x: 5, y: 4 }));
// console.log(player1.attack({ x: 5, y: 5 }));
// console.log(player1.attack({ x: 5, y: 6 }));
// console.log(player1.attack({ x: 5, y: 7 }));
// console.log(player1.attack({ x: 5, y: 8 }));
// console.log(player1.attack({ x: 5, y: 9 }));

// console.log({ state: player1.board.state });
