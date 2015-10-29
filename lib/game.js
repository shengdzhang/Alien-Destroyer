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
    this.count = 0;

  };

  Game.prototype.addAliens = function () {
    var aliens = [];
    for (var i = 0; i < this.NUM_ALIENS[0]; i++){
      aliens.push(new AlienDestroyer.Aliens(this.randomAlienPosition(), this));
    }
    return aliens;
  }

  Game.prototype.addShip = function () {
    return new AlienDestroyer.Ship();
  }

  Game.prototype.incrementAliens = function (fps) {
    fps = fps * 3
    this.count += 1;
    if(this.count !== 0 && this.count % fps === 0 && this.count/fps < this.NUM_ALIENS.length) {
      for (var i = 0; i < this.NUM_ALIENS[(this.count/fps)]; i++) {
        this.aliens.push(new AlienDestroyer.Aliens(this.randomAlienPosition(), this));
      }
    }
  }

  Game.prototype.randomAlienPosition = function () {
      var randX = Math.random() * this.xDim/2 + this.xDim/4;
      return [randX, 0];
  }

  Game.prototype.render = function (ctx) {
    ctx.clearRect(0, 0, this.xDim, this.yDim);
    var objects = this.aliens.concat(this.ship);
    objects.forEach(function (el) {
      el.render(ctx);
    });
  };

  Game.prototype.moveObjects = function () {
    var objects = this.aliens.concat(this.ship);
    objects.forEach(function (el) {
      el.move();
    });
  };

  Game.prototype.checkCollisions = function(){
    var that = this;
    that.aliens.forEach(function (el) {
      that.aliens.forEach(function (el2) {
        if (el !== el2){
          (el.isCollidedWith(el2));
          // alert("COLLISION");
        }
      });
    });
  };

  Game.prototype.remove = function(alien){
    var i = this.aliens.indexOf(alien);
    this.aliens.splice(i, 1);
  };


})();
