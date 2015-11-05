(function () {
  if (typeof AlienDestroyer === "undefined") {
    window.AlienDestroyer = {};
  }

  var Game = AlienDestroyer.Game = function (xDim, yDim) {
    this.xDim = xDim;
    this.yDim = yDim;
    this.NUM_ALIENS = [4, 3, 7, 8 , "B", "B"];
    this.NUM2_ALIENS = [4, 5, "BB"];
    this.aliens = this.addAliens();
    this.ship = this.addShip();
    this.bullets = [];
    this.count = 0;
    this.score = 0;
    this.gameOver = false;
    this.win = false;
  };

  Game.prototype.addAliens = function () {
    var aliens = [];
    for (var i = 0; i < this.NUM_ALIENS[0]; i++){
      aliens.push(new AlienDestroyer.Aliens({pos: this.randomAlienPosition(), game: this}));
    }
    return aliens;
  };

  Game.prototype.addShip = function () {
    return new AlienDestroyer.Ship({game: this});
  };

  Game.prototype.addBullet = function(bullet) {
    this.bullets.push(bullet);
  };

  Game.prototype.returnShip = function () {
    return this.ship;
  };

  Game.prototype.incrementAliens = function (fps) {
    fps = fps * 6
    this.count += 1;
    if(this.count !== 0 && this.count % fps === 0 && this.count/fps < this.NUM_ALIENS.length) {
      if (this.NUM_ALIENS[(this.count/fps)] === "B") {
        this.aliens.push(new AlienDestroyer.Boss({pos: this.randomAlienPosition(), game: this}));
      } else if (this.NUM_ALIENS[(this.count/fps)] === "BB"){
        this.aliens.push(new AlienDestroyer.SuperBoss({pos:this.randomAlienPosition(), game:this}));
      } else {
        for (var i = 0; i < this.NUM_ALIENS[(this.count/fps)]; i++) {
            this.aliens.push(new AlienDestroyer.Aliens({pos: this.randomAlienPosition(), game: this}));
          }
      }
    }
  };

  Game.prototype.randomAlienPosition = function () {
      var randX = Math.random() * this.xDim/2 + this.xDim/4;
      return [randX, 0];
  };

  Game.prototype.allObjects = function () {
     return [].concat(this.ship, this.aliens, this.bullets);
   };

  Game.prototype.render = function (ctx) {
    ctx.clearRect(0, 0, this.xDim, this.yDim);
    this.renderScore(ctx);
    this.allObjects().forEach(function (el) {
      el.render(ctx);
    });
  };

  Game.prototype.moveObjects = function () {
    this.allObjects().forEach(function (el) {
      el.move();
    });
  };

  Game.prototype.checkCollisions = function (){
    var game = this;
    this.allObjects().forEach(function (obj1) {
      game.allObjects().forEach(function (obj2) {
        if (obj1 !== obj2 && obj1.isCollidedWith(obj2)) {
          obj1.collision(obj2);
        }
      });
    });
  };

  Game.prototype.setCooldowns = function (FPS) {
    this.ship.setCooldowns(FPS);
    this.aliens.forEach(function(alien) {
      alien.setCooldowns(FPS);
      alien.fireWeapon();
    })
  };

  Game.prototype.handleKeys = function (map) {
    if (Object.keys(map).length > 0) {
      var impulse = [0,0];
      if (map["65"]) { // a
        impulse[0] += -1;
      }
      if (map["87"]) { //w
        impulse[1] += -1;
      }
      if (map["83"]) { //s
        impulse[1] += 1;
      }
      if (map["68"]) { //d
        impulse[0] +=1;
      }
      if (map["32"]) {
        this.ship.fireBullet();
      }
      this.ship.power(impulse);
    }
  };

  Game.prototype.remove = function(object){
    var i;
    if (object instanceof AlienDestroyer.Aliens) {
      i = this.aliens.indexOf(object);
      this.aliens.splice(i, 1);
      this.score += 10;
    } else if (object instanceof AlienDestroyer.Bullet) {
      i = this.bullets.indexOf(object);
      this.bullets.splice(i, 1);
    } else if (object instanceof AlienDestroyer.Ship){
      this.ship.reduceHealth();
    } else if (object instanceof AlienDestroyer.Boss) {
      if(object.reduceHealth()) {
        i = this.aliens.indexOf(object);
        this.aliens.splice(i, 1);
        if(this.aliens.length === 0) {
          if(this.NUM2_ALIENS.length > 0) {
            this.NUM_ALIENS = this.NUM2_ALIENS;
            this.count = 0;
            this.NUM2_ALIENS = [];
          } else {
            this.win = true;
            this.gameOver = true;
          }
        }
        this.score += 100;
      }
    }
  };

  Game.prototype.renderScore = function (ctx) {
    ctx.fillStyle = "blue";
    ctx.font = "bold 16px Arial";
    var text = "Score: " + this.score;
    var text2 = "Lives: " + this.ship.lives;
    ctx.fillText(text, 10, 20);
    ctx.fillText(text2, 10, 40);
  }

  Game.prototype.renderEnd = function (ctx) {
    ctx.fillStyle = "blue";
    ctx.font = "bold 48px Arial";
    if(this.win) {
      var text = "YOU WIN!!"
    } else {
      var text = "GAME OVER";
    }
    ctx.fillText(text, 250, 300);
  }

  Game.prototype.loseGame = function () {
    this.gameOver = true;
  }

  Game.prototype.fill = function (ctx) {
    ctx.fillStyle = "black";
    ctx.font = "bold 30px Arial";
    var text = "Click Start to play.";
    ctx.fillText(text, 200, 250);
    text = "W to go up. A to go left.";
    ctx.fillText(text, 200, 300);
    text = "S to go down. D to go right.";
    ctx.fillText(text, 200, 340);
    text = "Click Reset to clear the screen.";
    ctx.fillText(text, 200, 390);
  }

})();
