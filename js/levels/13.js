var one_three = Mario.one_three = function() {
  level = new Mario.Level({
    playerPos: [40, 160],
    loader: Mario.one_three,
    background: "#5c94fc",
    scrolling: true,
    exit: 180,
    // --- Sky/Platform Sprites ---
    floorSprite: new Mario.Sprite('sprites/tiles.png', [0, 0], [16, 16], 0), // orange ground
    wallSprite: new Mario.Sprite('sprites/tiles.png', [0, 0], [16, 16], 0), // same as floor
    brickSprite: new Mario.Sprite('sprites/tiles.png', [16, 0], [16, 16], 0), // brown brick
    brickBounceSprite: new Mario.Sprite('sprites/tiles.png', [32, 0], [16, 16], 0),
    rubbleSprite: function () {
      return new Mario.Sprite('sprites/items.png', [64, 0], [8, 8], 3, [0, 1]);
    },
    ublockSprite: new Mario.Sprite('sprites/tiles.png', [48, 0], [16, 16], 0),
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
    cloudSprite: new Mario.Sprite('sprites/tiles.png', [0, 320], [48, 32], 0),
    cloudSprites: [
      new Mario.Sprite('sprites/tiles.png', [0, 320], [16, 32], 0),
      new Mario.Sprite('sprites/tiles.png', [16, 320], [16, 32], 0),
      new Mario.Sprite('sprites/tiles.png', [32, 320], [16, 32], 0)
    ],
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

  // Layout based on image1
  // Starting platform
  level.putFloor(0, 10);
  // Sky platforms (sample positions)
  level.putWall(14, 7, 4); // left column
  level.putWall(22, 5, 8); // tall platform center
  level.putWall(35, 6, 5); // right tall
  // Sample coins on floating platforms
  level.putCoin(15, 5);
  level.putCoin(16, 5);
  level.putCoin(17, 5);
  level.putQBlock(18, 5, new Mario.Bcoin([18*16,5*16]));
  // More platforms and coins
  level.putWall(45, 8, 3);
  level.putCoin(46, 6);
  level.putCoin(47, 6);
  // Clouds as scenery
  level.putCloud(5, 2);
  level.putCloud(20, 2);
  level.putCloud(35, 3);
  // Add more sky platforms and coins as desired...
  // End platform and flagpole
  level.putFloor(70, 80);
  level.putFlagpole(78);

  // Add a few enemies for challenge
  level.putGoomba(25, 12);
  level.putGoomba(52, 12);
  level.putKoopa(65, 10);

  music.underground.pause();
  music.underground.currentTime = 0;
  music.overworld.currentTime = 0;
  music.overworld.play();
};