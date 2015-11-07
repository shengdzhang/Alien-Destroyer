(function () {
  if (typeof AlienDestroyer === "undefined") {
    window.AlienDestroyer = {};
  }

  var Game = AlienDestroyer.Game = function (xDim, yDim) {
    this.xDim = xDim;
    this.yDim = yDim;
<<<<<<< HEAD
    this.NUM_ALIENS = [5, 0, 5, 6, 7, 7, 7, 8, "B", 0, "B"];
    this.NUM2_ALIENS = [4, 0, 5, 7, 8, 10, 0, "BB"];
=======
    this.NUM_ALIENS = [8, 0, 10, 10, 0, 10, 12, 0, "B", "B"];
    this.NUM2_ALIENS = [0, 10, 12, 12, 12, 12, 0, "BB"];
>>>>>>> 759bd729144e1241711a649a709c522bebd68efd
    this.aliens = this.addAliens();
    this.ship = this.addShip();
    this.bullets = [];
    this.bombs = [];
    this.powerUps = [];
    this.count = 0;
    this.score = 0;
    this.gameOver = false;
    this.win = false;
    this.emp = false;
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

  Game.prototype.addBomb = function(bomb) {
    this.bombs.push(bomb);
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
     return [].concat(this.ship, this.aliens, this.bullets, this.powerUps, this.bombs);
   };

  Game.prototype.render = function (ctx) {
    if (this.emp) {
<<<<<<< HEAD
      ctx.fillStyle = "Blue";
=======
      ctx.fillStyle = "white";
>>>>>>> 759bd729144e1241711a649a709c522bebd68efd
      ctx.fillRect(0, 0, this.xDim, this.yDim);
      setTimeout(function () {
        this.emp = false;
      }.bind(this), 200);
    }
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
      if (map["32"]) { //spacebar
        this.ship.fireBullet();
      }
      if (map["74"]) { //j
        this.ship.fireBomb();
      }
      if (map["75"]) { //k
        this.ship.emitEMP();
      }
      this.ship.power(impulse);
    }
  };

  Game.prototype.randomPower = function () {
    var r = Math.floor(Math.random() * 100);
    if(r >= 90) {
      return "H";
    } else if (r >= 82) {
      return "S";
    } else if (r >= 72) {
      return "W";
    } else if (r >= 67) {
      return "E";
    } else if (r >= 64) {
      return "G";
    } else if (r >= 57) {
      return "I";
    } else if (r >= 50) {
      return "B";
    }
    return false;
  };

  Game.prototype.remove = function(object){
    var i;
    if (object instanceof AlienDestroyer.Aliens) {
      if(object.reduceHealth()) {
        i = this.aliens.indexOf(object);
        this.aliens.splice(i, 1);
        this.score += 10;
        var power = this.randomPower();
        if(power) {
          this.powerUps.push(new AlienDestroyer.PowerUp({pos: object.pos, mark: power, game: this}));
        }
      }
    } else if (object instanceof AlienDestroyer.Bullet) {
      i = this.bullets.indexOf(object);
      this.bullets.splice(i, 1);
    } else if (object instanceof AlienDestroyer.Bomb) {
      i = this.bombs.indexOf(object);
      this.bombs.splice(i, 1);
    } else if (object instanceof AlienDestroyer.Ship){
      this.ship.reduceHealth();
    } else if (object instanceof AlienDestroyer.PowerUp){
      i = this.powerUps.indexOf(object);
      this.powerUps.splice(i, 1);
    } else if (object instanceof AlienDestroyer.Boss) {
      if(object.reduceHealth()) {
        i = this.aliens.indexOf(object);
        this.aliens.splice(i, 1);
        if(this.aliens.length === 0) {
          if(this.NUM2_ALIENS.length > 0) {
            this.NUM_ALIENS = this.NUM2_ALIENS;
<<<<<<< HEAD
            this.count = 0;
=======
            this.count = 60;
>>>>>>> 759bd729144e1241711a649a709c522bebd68efd
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
<<<<<<< HEAD
    ctx.fillStyle = "blue";
=======
    ctx.fillStyle = "white";
    if (this.emp) {
      ctx.fillStyle = "black";
    }
>>>>>>> 759bd729144e1241711a649a709c522bebd68efd
    ctx.font = "bold 16px Arial";
    var text = "Score: " + this.score;
    var text2 = "Lives: " + this.ship.lives;
    var text3 = "Bombs: " + this.ship.bombs;
    var text4 = "EMP: " + this.ship.emp;
    ctx.fillText(text, 10, 20);
    ctx.fillText(text2, 10, 40);
    ctx.fillText(text3, 10, 60);
    ctx.fillText(text4, 10, 80);
  };

  Game.prototype.renderEnd = function (ctx) {
<<<<<<< HEAD
    ctx.fillStyle = "blue";
=======
    ctx.fillStyle = "yellow";
>>>>>>> 759bd729144e1241711a649a709c522bebd68efd
    ctx.font = "bold 48px Arial";
    if(this.win) {
      var text = "YOU WIN!!"
    } else {
      var text = "GAME OVER";
    }
    ctx.fillText(text, 250, 300);
  };

  Game.prototype.loseGame = function () {
    this.gameOver = true;
  };

  Game.prototype.fill = function (ctx) {
<<<<<<< HEAD
    ctx.fillStyle = "black";
=======
    ctx.fillStyle = "white";
>>>>>>> 759bd729144e1241711a649a709c522bebd68efd
    ctx.font = "bold 30px Arial";
    var text = "Click Start to play.";
    ctx.fillText(text, 200, 220);
    text = "W to go up. A to go left.";
    ctx.fillText(text, 200, 260);
    text = "S to go down. D to go right.";
    ctx.fillText(text, 200, 300);
    text = "J to fire bomb.";
    ctx.fillText(text, 200, 340);
    text = "K to use EMP.";
    ctx.fillText(text, 200, 380);
    text = "Click Reset to clear the screen.";
    ctx.fillText(text, 200, 420);
  };

  Game.prototype.bombExplosion = function (bomb) {
    var game = this;
    this.allObjects().forEach(function (obj1) {
      if (!(obj1 instanceof AlienDestroyer.Bomb) && obj1.isCollidedWith(bomb)) {
        if (!(obj1 instanceof AlienDestroyer.Ship) && !(obj1 instanceof AlienDestroyer.PowerUp)){
          game.remove(obj1);
        }
      }
    });
  };

  Game.prototype.EMP = function () {
    this.bullets = [];
    this.emp = true;
  }
})();
