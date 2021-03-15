"use strict";

const settings = {
  rowsCount: 21,
  colsCount: 21,
  speed: 2,
  winFoodCount: 50,
};

const config = {
  settings,

  init(userSettings) {
    Object.assign(this.settings, userSettings);
  },

  getRowsCount() {
    return this.settings.rowsCount;
  },

  getColsCount() {
    return this.settings.colsCount;
  },

  getSpeed() {
    return this.settings.speed;
  },

  getWinFoodCount() {
    return this.settings.winFoodCount;
  },

  validate() {
    const result = {
      isValid: true,
      error: [],
    };

    if (this.getRowsCount() < 10 || this.getRowsCount() > 30) {
      result.isValid = false;
      result.errors.push('Неверные настройки, значение rowsCount должно быть в диапазоне [10, 30].');
    }

    if (this.getColsCount() < 10 || this.getColsCount() > 30) {
      result.isValid = false;
      result.errors.push('Неверные настройки, значение colsCount должно быть в диапазоне [10, 30].');
    }

    if (this.getSpeed() < 1 || this.getSpeed() > 10) {
      result.isValid = false;
      result.errors.push('Неверные настройки, значение speed должно быть в диапазоне [1, 10].');
    }

    if (this.getWinFoodCount() < 5 || this.getWinFoodCount() > 50) {
      result.isValid = false;
      result.errors.push('Неверные настройки, значение winFoodCount должно быть в диапазоне [5, 50].');
    }

    return result;
  },
};

const map = {
  cells: null,
  usedCells: null,

  init(rowsCount, colsCount) {
    const table = document.getElementById('game');
    table.innerHTML = '';

    this.cells = {};  // {x1_y1: td, x1_y2: td}
    this.usedCells = [];

    for (let row = 0; row < rowsCount; row++) {
      const tr = document.createElement('tr');
      tr.classList.add('row');
      table.appendChild(tr);

      for (let col = 0; col < colsCount; col++) {
        const td = document.createElement('td');
        td.classList.add('cell');
        tr.appendChild(td);

        this.cells[`x${col}_y${row}`] = td;
      }
    }
    console.log(this.cells);
  },

  render(snakePointsArray, foodPoint, wallPoint) {
    for (const cell of this.usedCells) {
      cell.className = 'cell';
    }

    this.usedCells = [];


    snakePointsArray.forEach((point, index) => {
      const snakeCell = this.cells[`x${point.x}_y${point.y}`];
      console.log('point', point);
      snakeCell.classList.add(index === 0 ? 'snakeHead' : 'snakeBody');
      this.usedCells.push(snakeCell);
    });

    const foodCell = this.cells[`x${foodPoint.x}_y${foodPoint.y}`];
    foodCell.classList.add('food');
    this.usedCells.push(foodCell);

    //добавлена отрисовка стен
    const wallCell = this.cells[`x${wallPoint.x}_y${wallPoint.y}`];
    // console.log(wallPoint);
    // console.log(wallCell);
    wallCell.classList.add('wall');
    this.usedCells.push(wallCell);
  },
};

const counterFood = {
  //countFood: 0, //количество съеденной еды
  countFood_div: null,
  init() {
    //создание поля для вывода счетчика еды
    const game_wrap = document.getElementById('game-wrap');
    this.countFood_div = document.createElement('div');
    this.countFood_div.classList.add('countFood');
    game_wrap.appendChild(this.countFood_div);
    //this.countFood_div.textContent = `Количество съеденной еды = ${this.countFood}`;
  },

  render(countFood) {
    console.log('countF',countFood);
    console.log(this.countFood_div.textContent);
    this.countFood_div.textContent = `Количество съеденной еды = ${countFood}`;
  }
};

const snake = {
  config,
  //counterFood,
  body: null,
  direction: null,
  lastStepDirection: null,

  init(startBody, direction) {
    this.body = startBody;
    this.direction = direction;
    this.lastStepDirection = direction;
    //counterFood.countFood = 0;
  },

  getBody() {
    return this.body;
  },

  getLastStepDirection() {
    return this.lastStepDirection;
  },

  isOnPoint(point) {
    return this.body.some((snakePoint) => snakePoint.x === point.x && snakePoint.y === point.y);
  },

  makeStep() {
    this.lastStepDirection = this.direction;
    this.body.unshift(this.getNextStepHeadPoint()); // [p3, p2, p1] => [p4, p3, p2]
    this.body.pop();
  },

  growUp() {
    const lastBodyIndex = this.body.length - 1;
    const lastBodyPoint = this.body[lastBodyIndex];
    this.body.push(lastBodyPoint);
    //counterFood.countFood = counterFood.countFood + 1;//подсчет количества съеденного
    counterFood.render(this.body.length-1);
    console.log('2', this.body.length-1)

  },

  getNextStepHeadPoint() {
    const headPoint = this.body[0];
    //пересчет координат при пересечении границ поля
    switch (this.direction) {
      case 'up':    return{x: headPoint.x, y: (headPoint.y === 0)  ? this.config.getColsCount()-1 : headPoint.y - 1}
      case 'right': return {x: (headPoint.x === this.config.getRowsCount()-1)  ? 0 : headPoint.x + 1, y: headPoint.y};
      case 'down':  return {x: headPoint.x, y: (headPoint.y === this.config.getColsCount()-1)  ? headPoint.y = 0 : headPoint.y + 1};
      case 'left':  return {x: (headPoint.x === 0)  ? headPoint.x = this.config.getRowsCount()-1 : headPoint.x - 1, y: headPoint.y};
    }
  },

  setDirection(direction) {
    this.direction = direction;
  },
};

const food = {
  x: null,
  y: null,

  getCoordinates() {
    return {
      x: this.x,
      y: this.y,
    };
  },

  setCoordinates(point) {
    this.x = point.x;
    this.y = point.y;
  },

  isOnPoint(point) {
    return this.x === point.x && this.y === point.y;
  },
};
//объект стена, генерируется на определенное время lifeTime
const wall = {
  x: null,
  y: null,
  lifeTime: 10,

  getCoordinates() {
    return {
      x: this.x,
      y: this.y,
    };
  },

  setCoordinates(point) {
    this.x = point.x;
    this.y = point.y;
  },

  isOnPoint(point) {
    return this.x === point.x && this.y === point.y;
  },
};


const status = {
  condition: null,

  setPlaying() {
    this.condition = 'playing';
  },

  setStopped() {
    this.condition = 'stopped';
  },

  setFinished() {
    this.condition = 'finished';
  },

  isPlaying() {
    return this.condition === 'playing';
  },

  isStopped() {
    return this.condition === 'stopped';
  },
};

const game = {
  config,
  map,
  counterFood,
  snake,
  food,
  status,
  wall,
  tickInterval: null,

  init(userSettings) {
    this.config.init(userSettings);
    const validation = this.config.validate();

    if (!validation.isValid) {
      for (const err of validation.errors) {
        console.log(err);
      }

      return;
    }

    this.map.init(this.config.getRowsCount(), this.config.getColsCount());
    this.counterFood.init();

    this.setEventHandlers();
    this.reset();
  },

  setEventHandlers() {
    document.getElementById('playButton').addEventListener('click', () => {
      this.playClickHandler();
    });
    document.getElementById('newGameButton').addEventListener('click', () => {
      this.newGameClickHandler();
    });
    // document.getElementById('newGameButton').addEventListener('click', this.newGameClickHandler.bind(this));
    document.addEventListener('keydown', (event) => {
      this.keyDownHandler(event);
    });
  },

  playClickHandler() {
    if (this.status.isPlaying()) this.stop();
    else if (this.status.isStopped()) this.play();
  },

  newGameClickHandler() {
    this.reset();
  },

  keyDownHandler(event) {
    if (!this.status.isPlaying()) return;

    const direction = this.getDirectionByCode(event.code);

    if (this.canSetDirection(direction)) this.snake.setDirection(direction);
  },

  getDirectionByCode(code) {
    switch (code) {
      case 'KeyW':
      case 'ArrowUp':
        return 'up';
      case 'KeyD':
      case 'ArrowRight':
        return 'right';
      case 'KeyS':
      case 'ArrowDown':
        return 'down';
      case 'KeyA':
      case 'ArrowLeft':
        return 'left';
      default:
        return '';
    }
  },

  canSetDirection(direction) {
    const lastStepDirection = this.snake.getLastStepDirection();

    return direction === 'up' && lastStepDirection !== 'down' ||
        direction === 'right' && lastStepDirection !== 'left' ||
        direction === 'down' && lastStepDirection !== 'up' ||
        direction === 'left' && lastStepDirection !== 'right';
  },

  reset() {
    console.log('reset');
    this.stop();
    this.snake.init(this.getStartSnakeBody(), 'up');
    this.food.setCoordinates(this.getRandomFreeCoordinates());

    // this.counterFood.countFood = 0; //обнуление счетчика еды
    // this.counterFood.render(this.counterFood.countFood);
    counterFood.render(this.snake.body.length-1);
    this.wall.setCoordinates(this.getRandomFreeCoordinates()); //генерация координат стены
    this.render();
  },

  getStartSnakeBody() {
    return [
      {
        x: Math.floor(this.config.getColsCount() / 2),
        y: Math.floor(this.config.getRowsCount() / 2),
      }
    ];
  },

  getRandomFreeCoordinates() {
    const exclude = [this.food.getCoordinates(), ...this.snake.getBody(), this.wall.getCoordinates()];
    // without ... -  [{}, [{}, {}, {}]] => with ... [{}, {}, {}, {}];
    while (true) {
      const rndPoint = {
        x: Math.floor(Math.random() * this.config.getColsCount()),
        y: Math.floor(Math.random() * this.config.getRowsCount()),
      };

      if (!exclude.some((exPoint) => {
        return rndPoint.x === exPoint.x && rndPoint.y === exPoint.y;
      })) return rndPoint;
    }
  },

  render() {
    this.map.render(this.snake.getBody(), this.food.getCoordinates(), this.wall.getCoordinates());

  },

  play() {
    this.status.setPlaying();
    this.tickInterval = setInterval(() => {
      this.tickHandler();
    }, 1000 / this.config.getSpeed());
    this.setPlayButton('Стоп');
  },

  stop() {
    this.status.setStopped();
    clearInterval(this.tickInterval);
    this.setPlayButton('Старт');
  },

  finish() {
    this.status.setFinished();
    clearInterval(this.tickInterval);
    this.setPlayButton('Игра закончена', true);
  },

  setPlayButton(text, isDisabled = false) {
    const playButton = document.getElementById('playButton');

    playButton.textContent = text;
    isDisabled ? playButton.classList.add('disabled') : playButton.classList.remove('disabled');
  },

  tickHandler() {
    console.log('canMakeStep', this.canMakeStep());
    if (!this.canMakeStep()) return this.finish();

    if (this.food.isOnPoint(this.snake.getNextStepHeadPoint())) {
      this.snake.growUp();
      this.food.setCoordinates(this.getRandomFreeCoordinates());
      //this.counterFood.render(this.countFood);
      if (this.isGameWon()) this.finish();
    }

    this.snake.makeStep();
    //время жизни стены
    --this.wall.lifeTime;
    if (this.wall.lifeTime <= 0) {
    this.wall.lifeTime = 10;
    this.wall.setCoordinates(this.getRandomFreeCoordinates());
    };

    this.render();
  },

  canMakeStep() {
    const nextStepPoint = this.snake.getNextStepHeadPoint();
    console.log(this.snake.isOnPoint(nextStepPoint));
    console.log(this.wall.isOnPoint(nextStepPoint));
    return !this.snake.isOnPoint(nextStepPoint) &&
        // nextStepPoint.x < this.config.getColsCount() &&
        // nextStepPoint.y < this.config.getRowsCount() &&
        // nextStepPoint.x >= 0 &&
        // nextStepPoint.y >= 0 &&
        !this.wall.isOnPoint(nextStepPoint); //переопределение условий шага
  },

  isGameWon() {
    return this.snake.getBody().length > this.config.getWinFoodCount();
  },
};

game.init({speed: 5});
