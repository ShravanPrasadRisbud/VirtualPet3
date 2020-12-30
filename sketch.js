var dog, happyDog, database;
var foodS, foodStock;
var feed, addFood;
var readState;
var bedroomImg, gardenImg, washroomImg;

function preload()
{
  dog = loadImage("Dog.png");
  happyDog = loadImage("happydog.png")
}

function setup() {
  database = firebase.database();
  console.log(database);
  createCanvas(500, 500);
  
  dog = createSprite(250,250,70,70);

  foodstck = database.ref('Food');
  foodStock.on("value",readstock);

  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  
  //read game state from database
  readState = database.ref('gameState');
  readState.on("value", function(data){
  gameState = data.val();
});
  
}


function draw() {
  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogHappy);
  }

  fedTime=database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed=data.val();
  });

  //function to update gamestates in database
  function update(state){
  database.ref('/').update({
      gameState: state
  });

  drawSprites();
  //add styles here
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 350, 30);
  }else if(lastFed==0){
    text("Last Feed : 12 AM", 350, 30);
  }else{
    text("Last Feed : 12 AM", 350, 30);
  }
}

//Function to write values in DB
function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }


  database.ref('/').update({
    Food:x
  })
}
/*
https://console.firebase.google.com/project/virtual-pet-7f953/database/virtual-pet-7f953-default-rtdb/data
*/

//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

//function add food in stock
function addFoods(){
  foodA++;
  database.ref('/').update({
    Food:foodS
  })
}
