(function () {
  if (typeof AlienDestroyer === "undefined") {
    window.AlienDestroyer = {};
  }

  var MovingObject = AlienDestroyer.MovingObject = function (pos, vel, radius, color, game) {
    this.pos = pos;
    this.vel = vel;
    this.radius = radius;
    this.color = color;
    this.game = game;
    this.moveCount = 0;
  };

  MovingObject.prototype.render = function (ctx) {
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
    // ctx.fillStyle = "red";
    // ctx.fillRect(100,100,400,300);
    ctx.fill();
  };

  MovingObject.prototype.move = function () {
    this.moveCount += 1;
    this.pos[0]= this.pos[0] + this.vel[0];
    this.pos[1]= this.pos[1] + this.vel[1];
    if(this.outOfBounds()){
      this.game.remove(this);
    } else if (this.pos[0] > this.game.xDim){
      this.pos[0] = this.game.xDim;
      this.vel[0] = -this.vel[0];
    } else if (this.pos[0] < 0) {
      this.pos[0] = 0;
      this.vel[0] = -this.vel[0];
    }
    if (this.moveCount >= 240) {
      // debugger;
      this.moveCount = 0;
      this.vel[0] = -this.vel[0];
      //swap x direction
    }
  };

  MovingObject.prototype.outOfBounds = function () {
    if (this.pos[1] > this.game.yDim) {
       return true;
    } else {
      return false;
    }
  };

  MovingObject.prototype.isCollidedWith = function (otherObject) {
    var dist = Math.sqrt(Math.pow((this.pos[0] - otherObject.pos[0]),2) + Math.pow((this.pos[1] - otherObject.pos[1]),2));
    if (dist < (this.radius + otherObject.radius)){
      if (this instanceof AlienDestroyer.Aliens && otherObject instanceof AlienDestroyer.Aliens) {

      } else {
        this.game.remove(this);
        this.game.remove(otherObject);
      }
    }
  };

})();
