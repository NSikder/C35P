//Create variables here
var dog2, happyDog, database, foodS, foodStock, lastFed;
var newStock, foodObj, hour;

function preload()
{
  //load images here
  getHour();
  dog2 = loadImage("images/dogImg1.png")
  happyDog = loadImage("images/dogImg.png")
}

function setup() {
  database = firebase.database();
	createCanvas(1250, 500);
  
  foodStock = database.ref("Food");
  foodStock.on("value",readStock);

  console.log(foodS)
  dog = createSprite(250,250,10,10);
  dog.addImage(happyDog);
  dog.addImage(dog2);
  dog.scale = 1/4;

  feed = createButton('Feed');
  feed.position(525,135);
  feed.mousePressed(feedDog);

  addFood = createButton('Add Food');
  addFood.position(625,135);
  addFood.mousePressed(addFood1);

  foodObj = new FoodC(foodStock);
}


function draw() {  
  background(46, 139, 87);

  textSize(24);
  fill(255,255,255);
  text("Food Remaining: "+foodS,150,150);
  textSize(20)
  text("Press the Up Arrow to Feed the Dog Milk",75,50)
  foodObj.display();

  textSize(15);
  if(lastFed>=12){
    text("Last Feed: "+ lastFed%12 + "PM",10,15);
  }else if (lastFed ===0){
    text("Last Feed: 12 AM",10,15)
  }else{
    text("Last Feed: "+ lastFed%12 + "AM",10,15)
  }

  drawSprites();
  //add styles here

}

function readStock(data){
  foodS=data.val();
}

function addFood1(){
  foodObj.getFoodStock();
  foodObj.updateFoodStock(foodObj.stock);
  foodObj.addFood();
}

function feedDog(){
  foodObj.getFoodStock();
  foodObj.updateFoodStock(foodObj.stock);

  if (foodS>0){
    foodObj.deductFood();
    dog.addImage(happyDog);
    lastFed = hour;
    console.log(lastFed)
  }
}

async function getHour(){
  var response = await fetch("http://worldclockapi.com/api/json/est/now");
    var responseJSON = await response.json();
    //console.log(responseJSON);
    var dateTime = responseJSON.currentDateTime;
    //console.log(dateTime);
    hour = dateTime.slice(11,13);
    console.log(hour);
}