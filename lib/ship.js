(function () {
  if (typeof AlienDestroyer === "undefined") {
    window.AlienDestroyer = {};
  }

  function randomColor() {
    var hexDigits = "0123456789ABCDEF";

    var color = "#";
    for (var i = 0; i < 3; i ++) {
      color += hexDigits[Math.floor((Math.random() * 16))];
    }

    return color;
  }

  var Ship = AlienDestroyer.Ship = function () {
    this.radius = Ship.RADIUS;
    this.vel = [0, 0];
    this.color = randomColor();
    this.pos = [400,585];
  };

  Ship.RADIUS = 15;
  AlienDestroyer.Util.inherits(Ship, AlienDestroyer.MovingObject);

  // Ship.prototype.fireBullet = function () {
  //   var norm = Asteroids.Util.norm(this.vel);
  //
  //   if (norm == 0) {
  //     // Can't fire unless moving.
  //     return;
  //   }
  //
  //   var relVel = Asteroids.Util.scale(
  //     Asteroids.Util.dir(this.vel),
  //     Asteroids.Bullet.SPEED
  //   );
  //
  //   var bulletVel = [
  //     relVel[0] + this.vel[0], relVel[1] + this.vel[1]
  //   ];
  //
  //   var bullet = new Asteroids.Bullet({
  //     pos: this.pos,
  //     vel: bulletVel,
  //     color: this.color,
  //     game: this.game
  //   });
  //
  //   this.game.add(bullet);
  // };

  Ship.prototype.power = function (impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  };
  //
  // Ship.prototype.relocate = function () {
  //   this.pos = this.game.randomPosition();
  //   this.vel = [0, 0];
  // };
})();
