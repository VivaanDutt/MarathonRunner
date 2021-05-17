class Form {

    constructor() {
      this.input = createInput("Name");
      this.button = createButton('Play');
      this.reset = createButton('Reset');
      this.greeting = createElement('h2');
      this.title = createElement('h1');
    }
    hide(){
      this.greeting.hide();
      this.button.hide();
      this.input.hide();
      this.title.hide();
    }
  
    display(){
      this.title.html("Marathon Runner");
      this.title.position(displayWidth/2 - 50, 0);
  
      this.input.position(displayWidth/2 - 40 , displayHeight/2 - 80);
      this.button.position(displayWidth/2 + 30, displayHeight/2);
      this.reset.position(displayWidth - 100, 20);
  
      this.reset.mousePressed(() => {
        game.update(0);
        player.updateCount(0);
      })
  
      this.button.mousePressed(()=>{
        this.input.hide();
        this.button.hide();
        player.name = this.input.value();
        playerCount+=1;
        player.index = playerCount;
        player.update();
        player.updateCount(playerCount);
        this.greeting.html("Hello " + player.name + ", and welome to this marathon!")
        this.greeting.position(displayWidth/2 - 70, displayHeight/4);
      });
  
    }
  }
  