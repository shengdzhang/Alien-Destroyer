(function () {
  if (typeof AlienDestroyer === "undefined") {
    window.AlienDestroyer = {};
  }

  var Bomb = AlienDestroyer.Bomb = function (options) {
    options.radius = Bomb.INITIALRADIUS;
    AlienDestroyer.Bullet.call(this, options);
  };

  Bomb.INITIALRADIUS = 10;
  Bomb.BLASTRADIUS = 50;

  Util.inherits(Bomb, AlienDestroyer.Bullet);

  Bomb.prototype.collision = function (otherObject) {
    if (otherObject instanceof AlienDestroyer.Aliens) {
      this.radius = Bomb.BLASTRADIUS;
      this.vel = [0, 0];
      // this.game.checkBombCollision(this);
      setTimeout(function(){
        this.game.remove(this);
      }.bind(this), 500);
    }
  };

})();
