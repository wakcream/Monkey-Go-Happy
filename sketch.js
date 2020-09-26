var monkey, monkey_running;
var bananaImage;
var obstacleImage;
var score;
var ground;
var backgrounds, backgroundImage;
var foodGroup, obstacleGroup;


function preload() {
  monkey_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");

  backImage = loadImage("jungle.jpg");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");

}

function setup() {
  createCanvas(400, 400);
  backgrounds = createSprite(200, 200, 400, 400);
  backgrounds.addImage("jungle.jpg", backImage);
  backgrounds.velocityX = -5;
  
  ground = createSprite(200, 390, 400, 10);
  ground.visible = false;
  
  monkey = createSprite(100, 300, 20, 20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  score = 0;
  
  foodGroup = new Group();
  obstacleGroup = new Group();
}

function draw() {
  background(220);

  if(backgrounds.x < 0){
    backgrounds.x = backgrounds.width / 2;
  }
  
  if(keyDown("space")){
    monkey.velocityY = -5;
  }
  
  monkey.velocityY = monkey.velocityY + 0.4;
  monkey.collide(ground);
  
  if(foodGroup.isTouching(monkey)){
   score = score + 2; 
    foodGroup.destroyEach();
  }
  
   
  switch(score){
    case 10: monkey.scale=0.12;
      break;
      case 20: monkey.scale=0.14;
      break;
      case 30: monkey.scale=0.16;
      break;
      case 40: monkey.scale=0.18;
      break;
      default: break;
  }
  
  spawnFruit();
  spawnObstacles();
  
  if(obstacleGroup.isTouching(monkey)){
   monkey.scale = 0.08;
    
  }
  
  drawSprites();
  
stroke("white");
textSize(20);
fill("white");
text("Score: " + score, 300,50);
  
}

function spawnFruit() {
  if (frameCount % 100 === 0) {
    var banana = createSprite(400, 120, 20, 20);
    banana.y = Math.round(random(20, 380));
    banana.addImage("banana.png", bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    banana.lifetime = 200;
    foodGroup.add(banana);
  }
}

function spawnObstacles() {
  if (frameCount % 80 === 0) {
    var obstacle = createSprite(400, 380, 20, 20);
    obstacle.addImage("stone.png",obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -3;
    obstacle.lifetime = 200;
    obstacleGroup.add(obstacle);
  }

}

