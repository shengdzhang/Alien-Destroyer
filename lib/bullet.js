(function () {
  if (typeof AlienDestroyer === "undefined") {
    window.AlienDestroyer = {};
  }

  var Bullet = AlienDestroyer.Bullet = function (options) {
    options.radius = Bullet.RADIUS;
    AlienDestroyer.MovingObject.call(this, options);
  };

  Bullet.RADIUS = 2;

  Util.inherits(Bullet, AlienDestroyer.MovingObject);

  Bullet.prototype.move = function () {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    if (this.outOfYBounds() || this.outOfXBounds()) {
      this.game.remove(this);
    }
  };

  Bullet.prototype.collision = function (otherObject) {
    if (otherObject instanceof AlienDestroyer.Aliens && this.mark !== "Alien") {
      this.game.remove(this);
      this.game.remove(otherObject);
    } else if (otherObject instanceof AlienDestroyer.Ship && this.mark !== "Ship") {
      this.game.remove(this);
      this.game.remove(otherObject);
    } else if (otherObject instanceof AlienDestroyer.Boss && this.mark !== "Alien") {
      this.game.remove(this);
      this.game.remove(otherObject);
    }
  };

})();
