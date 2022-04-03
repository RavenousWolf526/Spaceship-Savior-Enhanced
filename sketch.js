//Variables
var asteroid, asteroid2, astronaut, ufo, spaceship, space;
var spaceImg, spaceshipImg, astronautImg, asteroidImg, asteroid2Img, ufoImg;
var astronautCollection = 0;
var astronautG, asteroidG, asteroid2G, ufoG;
var score;
var restartImg;
var restart;
var abductionSound, explosionSound, collectionSound, spaceshipSound;
var gameOver;

//Game States
var PLAY = 1;
var END = 0;
var PAUSE = 3;
var gameState = PLAY;

function preload() {
  spaceImg = loadImage("space(pixelated).png");
  spaceshipImg = loadImage("spaceship(pixelated).png");
  astronautImg = loadImage("astronaut(pixelated).png");
  asteroidImg = loadImage("asteroid(pixelated).png");
  asteroid2Img = loadImage("asteroid2(pixelated).png");
  ufoImg = loadImage("ufo(pixelated).png");
  endImg = loadImage("gameoverretro.png");
  restartImg = loadImage("bluerestart.png");
  abductionSound = loadSound("abduction.wav");
  explosionSound = loadSound("explosion.wav");
  collectionSound = loadSound("collection.wav");
}

function setup() {
  //playSound("");
  //create a canvas

  createCanvas(windowWidth, windowHeight);

  //Scaling
  // Moving background

  space = createSprite(width / 2, height / 2);
  space.addImage(spaceImg);
  space.velocityY = 5;
  space.scale = 1.5;


  spaceship = createSprite(width / 2, height - 20, 20, 20);
  spaceship.addImage(spaceshipImg);
  spaceship.scale = 0.25;

  restart = createSprite(width / 2, height / 1.3);
  restart.addImage(restartImg);
  restart.visible = false;

  gameOver = createSprite(width / 2, height / 1.8);
  gameOver.addImage(endImg);
  gameOver.visible = false;

  astronautG = new Group();

  asteroidG = new Group();

  asteroid2G = new Group();

  ufoG = new Group();

  edges = createEdgeSprites();
}

function draw() {
  background("black");

  

  if (gameState === PLAY) {
    
    restartImg.visible = false;
    spaceship.x = World.mouseX;
    spaceship.collide(edges);
    //code to reset the background
    if (space.y > height / 0.6) {
      space.y = height / 8;
    }
    createAstronaut();
    createAsteroid();
    createAsteroid2();
    createUfo();


    if (astronautG.isTouching(spaceship)) {
       collectionSound.play();
       collectionSound.setVolume(0.6);
      astronautCollection = astronautCollection + 1;
      astronautG.destroyEach()
    }

    if (ufoG.isTouching(spaceship)) {
      abductionSound.play();
      abductionSound.setVolume(1)
    //  spaceship.remove()
      gameState = END;
    }

    if (asteroidG.isTouching(spaceship)) {
      explosionSound.play();
      explosionSound.setVolume(1)
    //  spaceship.remove()
      gameState = END;
    }

    if (asteroid2G.isTouching(spaceship)) {
      explosionSound.play();
      explosionSound.setVolume(0.6)
    //  spaceship.remove()
      gameState = END;
    }

  } else if (gameState === END) {
    if (space.y > height / 0.5) {
      space.y = height / 8;
    }
    restart.visible = true;
    //spaceship.addImage(endImg);
    // spaceship.x = width / 2;
    // spaceship.y = height / 2;
    // spaceship.scale = 0.6;
    gameOver.visible = true

    astronautG.destroyEach();
    asteroidG.destroyEach();
    asteroid2G.destroyEach();
    ufoG.destroyEach();

    astronautG.setVelocityYEach(0);
    asteroidG.setVelocityYEach(0);
    asteroid2G.setVelocityYEach(0);
    ufoG.setVelocityYEach(0);

    // spaceship.destroy();
    if(keyDown("space")) {
      reset();
    }
  

    if (mousePressedOver(restart)) {
      reset();
    }
  }

  drawSprites();

  textSize(15)
  textFont("Roboto")
  fill("blue")
  stroke("white")
  strokeWeight(2)
  text("Created by TheRavenousWolf526", width - 1520, 20)

  textFont("Consolas")
  textSize(20);
  fill("blue")
  stroke("white")
  strokeWeight(2)
  text("Get the highest score possible by saving the astronauts without dying! Good Luck!", width - 1250, 30)

  textSize(25);
  fill("blue")
  stroke("white")
  strokeWeight(2)
  text("Astronauts Saved: " + astronautCollection, width - 300, 30);

}

function reset() {
  gameState = PLAY
  gameOver.visible = false;
  restart.visible = false;

  ufoG.destroyEach()
  asteroidG.destroyEach()
  asteroid2G.destroyEach()
  astronautG.destroyEach()
  astronautCollection = 0
}

function createAsteroid() {
  if (World.frameCount % 150 == 0) {
    var asteroid = createSprite(Math.round(random(50, width - 150), 40, 10, 10));
    asteroid.addImage(asteroidImg);
    asteroid.scale = 1;
    asteroid.velocityY = 8;
    asteroid.velocityX = -1;
    asteroid.lifetime = 200;
    asteroidG.add(asteroid);
    asteroid.setCollider("circle", 0, 0, 75);
  }
}

function createAsteroid2() {
  if (World.frameCount % 80 == 0) {
    var asteroid2 = createSprite(Math.round(random(50, width - 50), 40, 10, 10));
    asteroid2.addImage(asteroid2Img);
    asteroid2.scale = 0.5;
    asteroid2.velocityY = 12;
    asteroid2.lifetime = 200;
    asteroid2G.add(asteroid2);
    asteroid2.setCollider("circle", 0, 0, 60);
  }
}

function createUfo() {
  if (World.frameCount % 300 == 0) {
    var ufo = createSprite(Math.round(random(50, width - 50), 40, 10, 10));
    ufo.addImage(ufoImg);
    ufo.scale = 0.8;
    ufo.velocityY = 3;
    ufo.lifetime = 300;
    ufoG.add(ufo);
    ufo.setCollider("circle", 0, 0, 100);
    ufo.debug = true
  }
}

function createAstronaut() {
  if (World.frameCount % 600 == 0) {
    var astronaut = createSprite(Math.round(random(50, width - 50), 40, 10, 10));
    astronaut.addImage(astronautImg);
    astronaut.scale = 0.575;
    astronaut.velocityY = 5;
    astronaut.velocityX = -0.5;
    astronaut.lifetime = 200;
    astronautG.add(astronaut);
    astronaut.setCollider("circle", 0, 0, 30);
  }
}