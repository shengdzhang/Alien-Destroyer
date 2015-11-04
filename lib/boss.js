(function () {
  if (typeof AlienDestroyer === "undefined") {
    window.AlienDestroyer = {};
  }

  var Boss = AlienDestroyer.Boss = function(options) {
    options.vel = Util.randomAlienVec((Math.random()*Boss.SPEED)+2);
    options.radius = Math.floor(Math.random() * 50) + Boss.RADIUS;
    options.color = Boss.COLOR;
    AlienDestroyer.MovingObject.call(this, options);
    this.weaponCooldown;
  }

  Boss.SPEED = 3;
  Boss.RADIUS = 40;
  Boss.COLOR = "#C14242";
  Boss.WEAPONSPEED = 1;

  Util.inherits(Boss, AlienDestroyer.MovingObject);

  Boss.prototype.move = function () {
    this.pos[0] = this.pos[0] + this.vel[0]*5;
    this.pos[1] = this.pos[1] + this.vel[1]/10;
    if(this.outOfYBounds()){
      this.pos = [this.pos[0], 0];
    } else if (this.pos[0] + this.radius > this.game.xDim){
      this.pos[0] = this.game.xDim - this.radius;
      this.vel[0] = -this.vel[0];
    } else if (this.pos[0] - this.radius < 0) {
      this.pos[0] = this.radius;
      this.vel[0] = -this.vel[0];
    }
  }

  Boss.prototype.reduceHealth = function () {
    this.radius -= 3;
    if(this.radius <= 10) {
      return true;
    }
    return false;
  }

  Boss.prototype.setCooldowns = function (FPS) {
    if (this.weaponCooldown === undefined) {
      this.weaponCooldown = FPS;
      this.fireSpeed = FPS/this.radius * 10;
    } else if (this.weaponCooldown !== FPS) {
      this.weaponCooldown += 1;
    }
  }

  Boss.prototype.fireWeapon = function () {
    if (this.weaponCooldown >= this.fireSpeed * 2) {
      var speed = [],
          pos = [];
      speed = Util.findFireAngle(this.pos, this.game.ship.pos);
      speed[0] = speed[0] * Boss.WEAPONSPEED;
      speed[1] = speed[1] * Boss.WEAPONSPEED;
      var pos1 = this.pos.slice();
      pos2 = [pos1[0] + this.radius, pos1[1]];
      pos3 = [pos1[0] - this.radius, pos1[1]];
      var bullet1 = new AlienDestroyer.Bullet({
        pos: pos1,
        color: this.color,
        game: this.game,
        vel: speed,
        mark: "Alien"
      });

      var bullet2 = new AlienDestroyer.Bullet({
        pos: pos2,
        color: this.color,
        game: this.game,
        vel: speed,
        mark: "Alien"
      });

      var bullet3 = new AlienDestroyer.Bullet({
        pos: pos3,
        color: this.color,
        game: this.game,
        vel: speed,
        mark: "Alien"
      });
      this.game.addBullet(bullet1);
      this.game.addBullet(bullet2);
      this.game.addBullet(bullet3);
      this.weaponCooldown = 0;
    }
  }

  Boss.prototype.collision = function (otherObject) {
    if(otherObject instanceof AlienDestroyer.Ship) {
      this.game.remove(otherObject);
    } else if (otherObject instanceof AlienDestroyer.Aliens) {
      this.game.remove(otherObject);
    }
  };

})();
