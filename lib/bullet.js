(function () {
  if (typeof AlienDestroyer === "undefined") {
    window.AlienDestroyer = {};
  }

  var Bullet = AlienDestroyer.Bullet = function (options) {
    options.radius = Bullet.RADIUS;
    AlienDestroyer.MovingObject.call(this, options);
  };

  Bullet.RADIUS = 2;
  Bullet.SPEED = 15;

  Util.inherits(Bullet, AlienDestroyer.MovingObject);

  Bullet.prototype.move = function () {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
  }

  // Bullet.prototype.collideWith = function (otherObject) {
  //   if (otherObject instanceof AlienDestroyer.Aliens) {
  //     this.remove();
  //     otherObject.remove();
  //   }
  // };

})();
