var one_two = Mario.one_two = function() {
  level = new Mario.Level({
    playerPos: [40,192],
    loader: Mario.one_two,
    background: "#003087",
    scrolling: true,
    exit: 250,
    // --- Underground Sprites ---
    floorSprite: new Mario.Sprite('sprites/tiles.png', [0, 64], [16, 16], 0), // blue brick floor
    wallSprite: new Mario.Sprite('sprites/tiles.png', [16, 64], [16, 16], 0), // blue wall brick
    brickSprite: new Mario.Sprite('sprites/tiles.png', [16, 64], [16, 16], 0),
    brickBounceSprite: new Mario.Sprite('sprites/tiles.png', [32, 64], [16, 16], 0),
    rubbleSprite: function () {
      return new Mario.Sprite('sprites/items.png', [80, 0], [8, 8], 3, [0, 1]);
    },
    ublockSprite: new Mario.Sprite('sprites/tiles.png', [48, 64], [16, 16], 0),
    superShroomSprite: new Mario.Sprite('sprites/items.png', [0, 0], [16, 16], 0),
    fireFlowerSprite: new Mario.Sprite('sprites/items.png', [0, 32], [16, 16], 20, [0, 1, 2, 3]),
    starSprite: new Mario.Sprite('sprites/items.png', [0, 48], [16, 16], 20, [0, 1, 2, 3]),
    coinSprite: function() {
      return new Mario.Sprite('sprites/items.png', [0, 96], [16, 16], 6, [0, 0, 0, 0, 1, 2, 1]);
    },
    pipeLEndSprite: new Mario.Sprite('sprites/tiles.png', [0, 128], [16, 16], 0),
    pipeREndSprite: new Mario.Sprite('sprites/tiles.png', [16, 128], [16, 16], 0),
    pipeLMidSprite: new Mario.Sprite('sprites/tiles.png', [0, 144], [16, 16], 0),
    pipeRMidSprite: new Mario.Sprite('sprites/tiles.png', [16, 144], [16, 16], 0),
    pipeUpMid: new Mario.Sprite('sprites/tiles.png', [0, 144], [32, 16], 0),
    pipeSideMid: new Mario.Sprite('sprites/tiles.png', [48, 128], [16, 32], 0),
    pipeLeft: new Mario.Sprite('sprites/tiles.png', [32, 128], [16, 32], 0),
    pipeTop: new Mario.Sprite('sprites/tiles.png', [0, 128], [32, 16], 0),
    qblockSprite: new Mario.Sprite('sprites/tiles.png', [384, 0], [16, 16], 8, [0, 0, 0, 0, 1, 2, 1]),
    bcoinSprite: function() {
      return new Mario.Sprite('sprites/items.png', [0, 112], [16, 16], 20, [0, 1, 2, 3]);
    },
    // Underground has minimal scenery
    cloudSprite: null,
    cloudSprites: [],
    hillSprites: [],
    bushSprite: null,
    bushSprites: [],
    goombaSprite: function() {
      return new Mario.Sprite('sprites/enemy.png', [0, 16], [16, 16], 3, [0, 1]);
    },
    koopaSprite: function() {
      return new Mario.Sprite('sprites/enemy.png', [96, 0], [16, 32], 2, [0, 1]);
    },
    flagPoleSprites: [
      new Mario.Sprite('sprites/tiles.png', [256, 128], [16, 16], 0),
      new Mario.Sprite('sprites/tiles.png', [256, 144], [16, 16], 0),
      new Mario.Sprite('sprites/items.png', [128, 32], [16, 16], 0)
    ]
  });

  // Layout based on the image (image2)
  // Floor
  level.putFloor(0, 14);
  level.putFloor(16, 30);
  level.putFloor(32, 46);
  level.putFloor(48, 56);
  level.putFloor(58, 68);
  level.putFloor(70, 88);
  level.putFloor(92, 114);
  // Platforms and stairs (sample)
  level.putWall(6, 13, 2); // small step
  level.putWall(7, 13, 3);
  level.putWall(8, 13, 4);
  level.putWall(9, 13, 5);
  level.putWall(10, 13, 6);
  // Pipes
  level.putPipe(18, 13, 3);
  level.putPipe(28, 13, 4);
  level.putPipe(54, 13, 3);
  level.putPipe(60, 13, 2);
  // Coins and blocks in patterns
  for(let x=8; x<=12; x++) level.putCoin(x,9);
  level.putQBlock(20,9,new Mario.Bcoin([20*16,9*16]));
  level.putQBlock(21,9,new Mario.Mushroom([21*16,9*16]));
  level.putBrick(22,9,null);
  for(let x=40;x<=43;x++) level.putCoin(x,7);
  for(let x=64;x<=68;x++) level.putCoin(x,9);
  // Enemies
  level.putGoomba(23, 12);
  level.putGoomba(30, 12);
  level.putKoopa(35, 11);
  level.putGoomba(60, 12);
  // Warp zone pipes at the end
  level.putPipe(108, 13, 4);
  level.putPipe(112, 13, 4);
  level.putPipe(116, 13, 4);
  // Exit stairs and flagpole
  for(let x=120; x<=125; x++) level.putWall(x,13,x-119);
  level.putFlagpole(130);

  music.overworld.pause();
  music.overworld.currentTime = 0;
  music.underground.currentTime = 0;
  music.underground.play();
};