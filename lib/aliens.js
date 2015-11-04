(function () {
  if (typeof AlienDestroyer === "undefined") {
    window.AlienDestroyer = {};
  }

  var Aliens = AlienDestroyer.Aliens = function (options) {
    options.vel = Util.randomAlienVec((Math.random() * Aliens.SPEED)+ 2);
    options.radius = Math.random() * Aliens.RADIUS + 10;
    options.color = Aliens.COLOR;
    AlienDestroyer.MovingObject.call(this, options);
    this.weaponCooldown;
  };

  Aliens.COLOR = "#248424";
  Aliens.RADIUS = 3;
  Aliens.SPEED = 1;
  Aliens.WEAPONSPEED = 2;

  Util.inherits(Aliens, AlienDestroyer.MovingObject);

  Aliens.prototype.move = function () {
    this.moveCount += 1;
    this.pos[0] = this.pos[0] + this.vel[0];
    this.pos[1] = this.pos[1] + this.vel[1];
    if(this.outOfYBounds()){
      this.game.remove(this);
    } else if (this.pos[0] + this.radius > this.game.xDim){
      this.pos[0] = this.game.xDim - this.radius;
      this.vel[0] = -this.vel[0];
    } else if (this.pos[0] - this.radius < 0) {
      this.pos[0] = this.radius;
      this.vel[0] = -this.vel[0];
    }
    if (this.moveCount >= 240) {
      // debugger;
      this.moveCount = 0;
      this.vel[0] = -this.vel[0];
      //swap x direction
    }
  };

  Aliens.prototype.setCooldowns = function (FPS) {
    if (this.weaponCooldown === undefined) {
      this.weaponCooldown = FPS;
      this.fireSpeed = FPS/this.radius * 10;
    } else if (this.weaponCooldown !== FPS) {
      this.weaponCooldown += 1;
    }
  };

  Aliens.prototype.fireWeapon = function () {
    if (this.weaponCooldown >= this.fireSpeed) {
      var speed = [];
      speed = Util.findFireAngle(this.pos, this.game.ship.pos);
      speed[0] = speed[0] * Aliens.WEAPONSPEED;
      speed[1] = speed[1] * Aliens.WEAPONSPEED;
      var bullet = new AlienDestroyer.Bullet({
        pos: this.pos.slice(),
        color: this.color,
        game: this.game,
        vel: speed,
        mark: "Alien"
      });
      this.game.addBullet(bullet);
      this.weaponCooldown = 0;
    }
  };

  Aliens.prototype.collision = function (otherObject) {
    if(otherObject instanceof AlienDestroyer.Ship) {
      this.game.remove(otherObject);
    }
  };

})();
