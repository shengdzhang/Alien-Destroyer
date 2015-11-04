(function () {
  if (typeof AlienDestroyer === "undefined") {
    window.AlienDestroyer = {};
  }

  var Ship = AlienDestroyer.Ship = function (options) {
    options.radius = Ship.RADIUS;
    options.color = Ship.COLOR;
    options.pos = [400,585];
    AlienDestroyer.MovingObject.call(this, options);
    this.vel = [0,0]
    this.gunCooldown;
    this.invincible = false;
    this.lives = 3;
  };

  Ship.COLOR = "#00C"
  Ship.RADIUS = 10;
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
  };

  Ship.prototype.fireBullet = function () {
    if (this.gunCooldown >= this.fireSpeed) {
      var speed = [0, -(Ship.BULLETSPEED + this.vel[1])];
      var bullet = new AlienDestroyer.Bullet({
        pos: this.pos.slice(),
        color: Ship.COLOR,
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

  Ship.prototype.reduceHealth = function () {
    if(!this.invincible) {
      this.lives -= 1;
      if (this.lives < 0) {
        this.game.loseGame();
      } else {
        this.relocate();
        this.invincible = true;
        this.color = "#000";
        setTimeout(function(){
          this.color = Ship.COLOR;
          this.invincible = false;
        }.bind(this), 3000);
      }
    }
  };

  Ship.prototype.relocate = function () {
    this.pos = [400,585];
  }

})();
