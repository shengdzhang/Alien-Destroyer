(function () {
  if (typeof AlienDestroyer === "undefined") {
    window.AlienDestroyer = {};
  }


  var PowerUp = AlienDestroyer.PowerUp = function (options) {
    options.vel = [0,1];
    options.radius = PowerUp.RADIUS;
    options.color = PowerUp.COLOR;
    AlienDestroyer.MovingObject.call(this, options);
  };

  PowerUp.COLOR = "#888";
  PowerUp.RADIUS = 10;
  PowerUp.SPEED = 1;

  Util.inherits(PowerUp, AlienDestroyer.MovingObject);

  PowerUp.prototype.move = function () {
    this.pos[1] += this.vel[1];
    if(this.outOfYBounds()) {
      this.game.remove(this);
    }
  }

  PowerUp.prototype.render = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );
    ctx.fill();
    ctx.fillStyle = "black";
    ctx.font = "bold 10px Arial";
    var posx = this.pos[0]-this.radius/2 + 2
    var posy = this.pos[1]+this.radius/2 - 2
    if (this.mark === "I") {
      posx += 2
    }
    ctx.fillText(this.mark, posx , posy);
  }

  PowerUp.prototype.collision = function (otherObject) {
    if(otherObject instanceof AlienDestroyer.Ship) {
      this.game.remove(this);
      otherObject.powerUp(this.mark);
    }
  };



})();
