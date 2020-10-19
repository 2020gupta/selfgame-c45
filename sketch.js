
var gameOver,restartImage;
var babyboy,boyimage
var slide
var object
var coins,flippy
var gameState="PLAY"
var backgroundImage
var x=80
  var y=60
  var score=0
  var coinsgroup;
  var obstaclegroup
  var obstacle,obstacle1,obstacle2,obstacle3

function preload(){
  boyimage=loadImage("boy.png");
  flippy=loadImage("flippycoin.png")
   obstacle1=loadImage("spikes1.png")
   obstacle2=loadImage("thorhammer.jpg")
   restartImage=loadImage("reset.png")
   backgroundImage=loadImage("background.jpg")
}

function setup() {
  createCanvas(1000, 1000);
  
 slide=createSprite(700,500,1000,1000)
  slide.addImage(backgroundImage)
  slide.scale=2
  slide.velocityY=-2
  

  babyboy=createSprite(200,200,10,10)
  babyboy.addImage(boyimage)
  babyboy.scale=0.5

  object=createSprite(500,500,20,20)
  object.addImage(restartImage)
  object.scale=0.3
  object.visible=false

  coinsgroup=new Group()
  obstaclegroup=new Group()
}


  function draw() {


  background("white");
 if(slide.y<0){
slide.y=slide.height/2
 }

  if(keyDown(UP_ARROW)){
    babyboy.velocityY=-2;
    babyboy.velocityX=0
  }
 
  if(keyDown(RIGHT_ARROW)){
    babyboy.velocityX=2;
    babyboy.velocityY=0
  }
  if(keyDown(LEFT_ARROW)){
    babyboy.velocityX=-2;
    babyboy.velocityY=0
  }
  console.log(gameState)
  for(var i=0;i<obstaclegroup.length;i++){
    
    if(obstaclegroup.get(i).isTouching(babyboy)&&gameState!=="level2"){
    
      
      obstaclegroup.get(i).destroy()
      babyboy.scale=0.2
      gameState="level2"
 
   }
  }

  console.log(obstaclegroup.length);

    
    if(obstaclegroup.collide(babyboy)&&(gameState==="level2")){
      obstaclegroup.destroyEach();
      gameState="END";
   }
  
 if(mousePressedOver(object)){
   object.visible=false
   gameState="PLAY"
   score=0
   babyboy.scale=0.5
   slide.velocityY=-2
 }
  
  for(var i=0;i<coinsgroup.length;i++){
    if(coinsgroup.get(i).isTouching(babyboy)){
   coinsgroup.get(i).destroy()
      score=score+1
      
  }

    
  }
  

  if(gameState==="END"){
       console.log("in END");
      restartfunction()
      slide.velocityY=0;
  }

edges=createEdgeSprites()
babyboy.bounceOff(edges[1])
babyboy.bounceOff(edges[2])
babyboy.bounceOff(edges[3])
babyboy.bounceOff(edges[0])

if(gameState!=="END"){
spawncoins();
spawnobstacle();
}

  drawSprites();
  textSize(18);
  fill("red")
  text("score:"+score,800,100)
  
}



function spawncoins(){
  
  if(frameCount % 60===0){
    var coins=createSprite(500+x,y,10,10)
    coins.addImage(flippy)
    coins.scale=0.1;
    coinsgroup.add(coins)
    x=x+random(-20,-150)
    y=y+random(40,80)
    if(coins.x>850){
    coins.x=850
    }
    if(coins.y>850){
      coins.y=850
      }
  }
  
}

function spawnobstacle(){
  
  if(frameCount % 60===0){
    var obstacle=createSprite(50,0,10,10)
    obstacle.addImage(obstacle1)
    obstacle.scale=0.5;
    obstaclegroup.add(obstacle)
    obstacle.x=random(200,800)
  //  obstacle.y=random(50,800)
    obstacle.velocityY=4;
    
  }
  
}
function restartfunction(){
  object.visible=true
  obstaclegroup.setVelocityYEach(0)
  babyboy.velocityX=0
  babyboy.velocityY=0

}
