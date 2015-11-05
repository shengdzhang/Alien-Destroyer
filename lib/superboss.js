(function () {
  if (typeof AlienDestroyer === "undefined") {
    window.AlienDestroyer = {};
  }

  var SuperBoss = AlienDestroyer.SuperBoss = function(options) {
    options.vel = Util.randomAlienVec(SuperBoss.SPEED);
    options.radius = SuperBoss.RADIUS;
    options.color = SuperBoss.COLOR;
    AlienDestroyer.Boss.call(this, options);
    this.weaponCooldown;
  }

  SuperBoss.SPEED = 2;
  SuperBoss.RADIUS = 100;
  SuperBoss.COLOR = "black";

  Util.inherits(SuperBoss, AlienDestroyer.Boss);

  SuperBoss.prototype.getWeaponPos = function () {
    var positions = [];
    var pos1 = this.pos.slice();
    positions.push(pos1);
    positions.push([pos1[0] + this.radius, pos1[1]]);
    positions.push([pos1[0] - this.radius, pos1[1]]);
    positions.push([pos1[0] + this.radius, pos1[1] + this.radius]);
    positions.push([pos1[0] + this.radius, pos1[1] - this.radius]);
    positions.push([pos1[0] - this.radius, pos1[1] + this.radius]);
    positions.push([pos1[0] - this.radius, pos1[1] - this.radius]);
    positions.push([pos1[0] - this.radius, pos1[1] + this.radius]);
    positions.push([pos1[0], pos1[1] + this.radius]);
    positions.push([pos1[0], pos1[1] - this.radius]);
    return positions;
  };

  SuperBoss.prototype.reduceHealth = function () {
    this.radius -= 1;
    if(this.radius <= 10) {
      return true;
    }
    return false;
  }
})();
