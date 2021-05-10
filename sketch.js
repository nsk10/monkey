var monkey,screen,ground;
var  bananaImg, obstacleImg, obstacleGroup, bg,score,monkeyImg;
var groundImg, foodGroup, obstaclesGroup;
var gameState ="play";

function preload(){
  bananaImg=loadImage("banana.png");
    obstacleImg=loadImage("stone.png");
    bg=loadImage("jungle.jpg");
    monkeyImg=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
   
}
function setup() {
  createCanvas(600,300);
  
  
   screen=createSprite(300,150,600,300);
  screen.addImage(bg);
  screen.x=screen.width/2;
  screen.velocityX=-2;
  
  monkey=createSprite(20,280,10,20);
  monkey.addAnimation("running",monkeyImg);
  monkey.scale=0.1;
  
   ground=(300,290,600,20);
  ground.visible=false;
  
  foodGroup = new Group();
  obstacleGroup = new Group();
  score=0;
}

function draw(){
  background(255); 
   
    if(screen.x<0) {
      screen.x=screen.width/2;
    }
    
    if(keyDown("space") ) {
      monkey.velocityY = -12;
    }
    
      monkey.velocityY = monkey.velocityY + 0.8;
    monkey.collide(ground); 
    
    camera.position.x = monkey.x;
    camera.position.y = monkey.y;
    spawnFood();
    spawnObstacles();
    
    if(foodGroup.isTouching(monkey))
    {
      score=score+2;
      foodGroup.destroyEach();
    }
    switch(score)
    {
        case 10: monkey.scale=0.13;
              break;
        case 20: monkey.scale=0.16;
              break;
        case 30: monkey.scale=0.19;
              break;
        case 40: monkey.scale=0.21;
              break;
        case 50: monkey.scale=0.25;
        
              break;
        default:break;
    }
    
    if(obstaclesGroup.isTouching(monkey))
    {
      monkey.scale=0.11;
      //score=score-10;
    }
    
    drawSprites();
 
   stroke("black");
   textSize(20);
   fill("black");
        
   
   text("Score: "+ score, 500,50);
   
 }
 function spawnFood() {
   
   if (frameCount % 80 === 0) {
     var banana = createSprite(600,250,40,10);
     banana.addImage(bananaImg);
     banana.scale=0.05;
     
     banana.y = random(120,200);    
     
     banana.velocityX = -5;
     
     banana.lifetime = 120;
     
     monkey.depth = banana.depth + 1;
   
     foodGroup.add(banana);
   }
 }
 
 function spawnObstacles() {
   if(frameCount % 200 === 0) {
     var obstacle = createSprite(600,320,10,40);
     obstacle.addImage(obstacleImg);
     obstacle.scale=0.15;
     
     obstacle.velocityX = -6;
        
     obstacle.lifetime = 100;
     
     obstacleGroup.add(obstacle);
   }
 }