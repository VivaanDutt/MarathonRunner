var canvas, welcomeImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var runners, runner1, runner2, runner3, runner4;

var track;

var runimg1, runimg2, runimg3, rungimg4;

function preload(){
  track = loadImage("track.jpg");
  welcomeImage = loadImage("bgbg.jpeg");
  runimg1 = loadImage("pixil-frame-0 (10).png");
  runimg2 = loadImage("pixil-frame-0 (11).png");
  runimg3 = loadImage("pixil-frame-0 (12).png");
  runimg4 = loadImage("pixil-frame-0 (13).png");
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight - 30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
  }
}
