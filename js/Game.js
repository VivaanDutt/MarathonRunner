class Game {
    constructor(){
  
    }
  
    getState(){
      var gameStateRef  = database.ref('gameState');
      gameStateRef.on("value",function(data){
         gameState = data.val();
      })
  
    }
  
    update(state){
      database.ref('/').update({
        gameState: state
      });
    }
  
    async start(){
      if(gameState === 0){
        player = new Player();
        var playerCountRef = await database.ref('playerCount').once("value");
        if(playerCountRef.exists()){
          playerCount = playerCountRef.val();
          player.getCount();
        }
        form = new Form()
        form.display();
      }
  
      runner1 = createSprite(100,200);
      runner2 = createSprite(300,200);
      runner3 = createSprite(500,200);
      runner4 = createSprite(700,200);
      runners = [runner1, runner2, runner3, runner4];
    }
  
    play(){
      form.hide();
      
      Player.getPlayerInfo();
      player.getRunnersAtEnd();
      
      if(allPlayers !== undefined) {
        background("bgbg.jpeg");
        image(track, -displayWidth*4, 0,displayWidth * 5, displayHeight);
        var index = 0;
        var x;
        var y = 175;
  
        for(var plr in allPlayers) {
          index += 1;
          x += 200;
          y = displayHeight - allPlayers[plr].distance;
          runners[index-1].x = x;
          runners[index-1].y = y;
  
          if (index === player.index) {
            stroke(10);
            fill("red");
            ellipse(x, y, 60, 60);
            noFill();
            runners[index - 1].shapeColor = rgb(random(1, 255), random(1, 255), random(1, 255));
            camera.position.x = runners[index - 1].y;
            camera.position.y = displayHeight/2;
          } 
        }
      }
  
      if(keyIsDown(UP_ARROW) && player.index !== null){
        player.distance += 10
        player.update();
      }
  
      if(player.distance > 3860){
        gameState = 2;
        player.rank += 1;
        Player.updateRunnersAtEnd(player.rank)
      }
     
      drawSprites();
    }
  
  }