(function () {
  if (typeof AlienDestroyer === "undefined") {
    window.AlienDestroyer = {};
  }

  var Bomb = AlienDestroyer.Bomb = function (options) {
    options.radius = Bomb.INITIALRADIUS;
    AlienDestroyer.Bullet.call(this, options);
  };

  Bomb.INITIALRADIUS = 10;
  Bomb.BLASTRADIUS = 100;

  Util.inherits(Bomb, AlienDestroyer.MovingObject);

  Bomb.prototype.move = function () {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    if (this.outOfYBounds()) {
      this.game.remove(this);
    }
  };

  Bomb.prototype.collision = function (otherObject) {
    if (otherObject instanceof AlienDestroyer.Aliens || otherObject instanceof AlienDestroyer.Boss) {
      this.radius = Bomb.BLASTRADIUS;
      this.vel = [0, 0];
      this.game.bombExplosion(this);
      setTimeout(function(){
        this.game.remove(this);
      }.bind(this), 500);
    }
  };

})();
