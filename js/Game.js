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
        image(welcomeImage, (displayWidth-20)/10014, (displayHeight-30)/10014, displayWidth-20, displayHeight-30);
        player = new Player();
        var playerCountRef = await database.ref('playerCount').once("value");
        if(playerCountRef.exists()){
          playerCount = playerCountRef.val();
          player.getCount();
        }
        form = new Form()
        form.display();
      }
  
      runner1 = createSprite(20,100);
      runner1.addImage(runimg1);
      runner1.scale = 5;
      runner2 = createSprite(20,300);
      runner2.addImage(runimg2);
      runner2.scale = 5;
      runner3 = createSprite(20,500);
      runner3.addImage(runimg3);
      runner3.scale = 5;
      runner4 = createSprite(20,700);
      runner4.addImage(runimg4);
      runner4.scale = 5;
      runners = [runner1, runner2, runner3, runner4];
    }
  
    play(){
      form.hide();

      Player.getPlayerInfo();
      if(allPlayers !== undefined) {
        image(track, -displayWidth/10, 0, displayWidth * 5, displayHeight);
        var index = 0;
        var x;
        var y = 175;
  
        for(var plr in allPlayers) {
          index += 1;
          x = displayWidth - allPlayers[plr].distance;
          y += 200;
          runners[index-1].x = x;
          runners[index-1].y = y;
  
          if (index === player.index) {
            stroke(10);
            fill("red");
            ellipse(x, y, 60, 60);
            noFill();
            runners[index - 1].shapeColor = rgb(random(1, 255), random(1, 255), random(1, 255));
            camera.position.x = runners[index - 1].x;
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
    
      player.getRunnersAtEnd();
      drawSprites();
    }
  
  }