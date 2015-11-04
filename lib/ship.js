(function () {
  if (typeof AlienDestroyer === "undefined") {
    window.AlienDestroyer = {};
  }

  var Ship = AlienDestroyer.Ship = function (options) {
    options.radius = Ship.RADIUS;
    options.color = "#00C";
    options.pos = [400,585];
    AlienDestroyer.MovingObject.call(this, options);
    this.vel = [0,0]
    this.gunCooldown;
  };

  // Ship.gunCooldown = 1 second * 60FPS
  Ship.RADIUS = 15;
  Ship.BULLETSPEED = 10;
  Util.inherits(Ship, AlienDestroyer.MovingObject);

  Ship.prototype.move = function () {
      this.pos[1] += this.vel[1];
      this.pos[0] += this.vel[0];
      this.setBounds();
  };

  Ship.prototype.setCooldowns = function (FPS) {
    if (this.gunCooldown === undefined) {
      this.gunCooldown = FPS;
      this.fireSpeed = FPS/4;
    } else if (this.gunCooldown !== FPS) {
      this.gunCooldown += 1;
    }
  }

  Ship.prototype.fireBullet = function () {
    if (this.gunCooldown >= this.fireSpeed) {
      var speed = [0, -(Ship.BULLETSPEED + this.vel[1])];
      var bullet = new AlienDestroyer.Bullet({
        pos: this.pos.slice(),
        color: this.color,
        game: this.game,
        vel: speed,
        mark: "Ship"
      });
      this.game.addBullet(bullet);
      this.gunCooldown = 0;
    }
  };

  Ship.prototype.power = function (impulse) {
    this.vel[0] = 2 * impulse[0];
    this.vel[1] = 2 * impulse[1];
  };

  Ship.prototype.setBounds = function () {
    if(this.pos[0] + this.radius > this.game.xDim) {
      this.pos[0] = this.game.xDim - this.radius;
    } else if(this.pos[0] - this.radius < 0) {
      this.pos[0] = this.radius;
    }

    if (this.pos[1] + this.radius > this.game.yDim) {
      this.pos[1] = this.game.yDim - this.radius;
    } else if (this.pos[1] - this.radius < 0) {
      this.pos[1] = this.radius;
    }
  };

  Ship.prototype.relocate = function () {
    this.pos = [400,585];
  }
})();
