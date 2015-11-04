(function () {
  if (typeof AlienDestroyer === "undefined") {
    window.AlienDestroyer = {};
  }

  var Game = AlienDestroyer.Game = function (xDim, yDim) {
    this.xDim = xDim;
    this.yDim = yDim;
    this.NUM_ALIENS = [2, 2, 2, 5, 5, 5, 5, 5, 5, 5];
    this.aliens = this.addAliens();
    this.ship = this.addShip();
    this.bullets = [];
    this.count = 0;

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
      for (var i = 0; i < this.NUM_ALIENS[(this.count/fps)]; i++) {
        this.aliens.push(new AlienDestroyer.Aliens({pos: this.randomAlienPosition(), game: this}));
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
        if (obj1 !== obj2) {
          obj1.isCollidedWith(obj2);
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
  }

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
    } else if (object instanceof AlienDestroyer.Bullet) {
      i = this.bullets.indexOf(object);
      this.bullets.splice(i, 1);
    } else if (object instanceof AlienDestroyer.Ship){
      this.ship.relocate();
    }
  };


})();
