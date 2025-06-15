var requestAnimFrame = (function(){
  return window.requestAnimationFrame       ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    window.oRequestAnimationFrame      ||
    window.msRequestAnimationFrame     ||
    function(callback){
      window.setTimeout(callback, 1000 / 60);
    };
})();

// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext('2d');
var updateables = [];
var fireballs = [];
var player = new Mario.Player([0,0]);

canvas.width = 762;
canvas.height = 720;
ctx.scale(3,3);
document.body.appendChild(canvas);

// Viewport
var vX = 0,
    vY = 0,
    vWidth = 256,
    vHeight = 240;

// Load our images (JS files are loaded via script tags in HTML)
resources.load([
  'sprites/player.png',
  'sprites/enemy.png',
  'sprites/tiles.png',
  'sprites/playerl.png',
  'sprites/items.png',
  'sprites/enemyr.png',
]);

resources.onReady(init);

var level;
var sounds;
var music;
var levels; // <-- Declare globally, assign in init()
var currentLevelIndex = 0;

// Run the current level
function loadCurrentLevel() {
  console.log("loadCurrentLevel called with index:", currentLevelIndex);
  console.log("Level function:", levels[currentLevelIndex]);
  
  if (!levels[currentLevelIndex]) {
    console.error("Level not found at index:", currentLevelIndex);
    return;
  }
  
  if (typeof levels[currentLevelIndex] !== 'function') {
    console.error("Level at index", currentLevelIndex, "is not a function:", typeof levels[currentLevelIndex]);
    return;
  }
  
  player = new Mario.Player([0,0]);
  levels[currentLevelIndex]();
  console.log("Level loaded successfully");
}

function onLevelComplete() {
  console.log("Level completed! Current index:", currentLevelIndex);
  console.log("Total levels:", levels.length);
  
  if (currentLevelIndex < levels.length - 1) {
    currentLevelIndex++;
    console.log("Loading level index:", currentLevelIndex);
    loadCurrentLevel();
  } else {
    showGameWinScreen();
  }
}

function showGameWinScreen() {
  alert("Congratulations! You beat all the levels!");
  currentLevelIndex = 0;
  loadCurrentLevel();
}

// Initialize
var lastTime;
function init() {
  // Check what's available in Mario namespace
  console.log("Mario object:", Mario);
  console.log("Mario.oneone exists:", typeof Mario.oneone);
  console.log("Mario.one_two exists:", typeof Mario.one_two);
  console.log("Mario.one_three exists:", typeof Mario.one_three); // Update this to match your actual function name
  
  // Now that all level scripts are loaded, define the levels array
  levels = [
    Mario.oneone,
    Mario.one_two,
    Mario.one_three, // Update this to match what's actually in your 13.js file
    // Add more levels here as you create them
  ];
  
  console.log("Available levels:", levels.length);
  console.log("Level 0 (Mario.oneone):", levels[0]);
  console.log("Level 1 (Mario.one_two):", levels[1]);
  console.log("Level 2 (Mario.one_three):", levels[2]); // Update this to match your actual function name
  
  currentLevelIndex = 0;

  music = {
    overworld: new Audio('sounds/aboveground_bgm.ogg'),
    underground: new Audio('sounds/underground_bgm.ogg'),
    clear: new Audio('sounds/stage_clear.wav'),
    death: new Audio('sounds/mariodie.wav')
  };
  sounds = {
    smallJump: new Audio('sounds/jump-small.wav'),
    bigJump: new Audio('sounds/jump-super.wav'),
    breakBlock: new Audio('sounds/breakblock.wav'),
    bump: new Audio('sounds/bump.wav'),
    coin: new Audio('sounds/coin.wav'),
    fireball: new Audio('sounds/fireball.wav'),
    flagpole: new Audio('sounds/flagpole.wav'),
    kick: new Audio('sounds/kick.wav'),
    pipe: new Audio('sounds/pipe.wav'),
    itemAppear: new Audio('sounds/itemAppear.wav'),
    powerup: new Audio('sounds/powerup.wav'),
    stomp: new Audio('sounds/stomp.wav')
  };
  loadCurrentLevel();
  lastTime = Date.now();
  main();
}

var gameTime = 0;

// Set up the game loop
function main() {
  var now = Date.now();
  var dt = (now - lastTime) / 1000.0;

  update(dt);
  render();

  lastTime = now;
  requestAnimFrame(main);
}

function update(dt) {
  gameTime += dt;

  handleInput(dt);
  updateEntities(dt, gameTime);

  checkCollisions();
}

function handleInput(dt) {
  if (player.piping || player.dying || player.noInput) return; //don't accept input

  if (input.isDown('RUN')){
    player.run();
  } else {
    player.noRun();
  }
  if (input.isDown('JUMP')) {
    player.jump();
  } else {
    player.noJump();
  }

  if (input.isDown('DOWN')) {
    player.crouch();
  } else {
    player.noCrouch();
  }

  if (input.isDown('LEFT')) {
    player.moveLeft();
  }
  else if (input.isDown('RIGHT')) {
    player.moveRight();
  } else {
    player.noWalk();
  }
}

// Update all the moving stuff
function updateEntities(dt, gameTime) {
  player.update(dt, vX);
  updateables.forEach (function(ent) {
    ent.update(dt, gameTime);
  });

  if (player.exiting) {
    if (player.pos[0] > vX + 96)
      vX = player.pos[0] - 96
  }else if (level.scrolling && player.pos[0] > vX + 80) {
    vX = player.pos[0] - 80;
  }

  if (player.powering.length !== 0 || player.dying) { return; }
  level.items.forEach (function(ent) {
    ent.update(dt);
  });

  level.enemies.forEach (function(ent) {
    ent.update(dt, vX);
  });

  fireballs.forEach(function(fireball) {
    fireball.update(dt);
  });
  level.pipes.forEach (function(pipe) {
    pipe.update(dt);
  });
}

// Scan for collisions
function checkCollisions() {
  if (player.powering.length !== 0 || player.dying) { return; }
  player.checkCollisions();

  level.items.forEach(function(item) {
    item.checkCollisions();
  });
  level.enemies.forEach (function(ent) {
    ent.checkCollisions();
  });
  fireballs.forEach(function(fireball){
    fireball.checkCollisions();
  });
  level.pipes.forEach (function(pipe) {
    pipe.checkCollisions();
  });
}

// Draw the game!
function render() {
  updateables = [];
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = level.background;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Scenery gets drawn first to get layering right.
  for(var i = 0; i < 15; i++) {
    for (var j = Math.floor(vX / 16) - 1; j < Math.floor(vX / 16) + 20; j++){
      if (level.scenery[i][j]) {
        renderEntity(level.scenery[i][j]);
      }
    }
  }

  // Then items
  level.items.forEach (function (item) {
    renderEntity(item);
  });

  level.enemies.forEach (function(enemy) {
    renderEntity(enemy);
  });

  fireballs.forEach(function(fireball) {
    renderEntity(fireball);
  });

  // Then we draw every static object.
  for(var i = 0; i < 15; i++) {
    for (var j = Math.floor(vX / 16) - 1; j < Math.floor(vX / 16) + 20; j++){
      if (level.statics[i][j]) {
        renderEntity(level.statics[i][j]);
      }
      if (level.blocks[i][j]) {
        renderEntity(level.blocks[i][j]);
        updateables.push(level.blocks[i][j]);
      }
    }
  }

  // Then the player
  if (player.invincibility % 2 === 0) {
    renderEntity(player);
  }

  // Mario goes INTO pipes, so naturally they go after.
  level.pipes.forEach (function(pipe) {
    renderEntity(pipe);
  });
}

function renderEntity(entity) {
  entity.render(ctx, vX, vY);
}

// Expose level completion logic globally if needed
window.onLevelComplete = onLevelComplete;