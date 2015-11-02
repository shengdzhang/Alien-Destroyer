(function () {
  if (typeof AlienDestroyer === "undefined") {
    window.AlienDestroyer = {};
  }

  var Ship = AlienDestroyer.Ship = function (game) {
    this.radius = Ship.RADIUS;
    this.moves = [];
    this.color = "#00C";
    this.pos = [400,585];
    this.game = game;
  };

  Ship.RADIUS = 15;
  AlienDestroyer.Util.inherits(Ship, AlienDestroyer.MovingObject);

  Ship.prototype.move = function () {
    if(this.moves.length !== 0) {
      // debugger;
      var next = this.moves.shift();
      this.pos[1] += next[1];
      this.pos[0] += next[0];
      this.setBounds();
    }
  };

  Ship.prototype.fireBullet = function () {
    // var norm = AlienDestroyer.Util.norm(this.vel);
    // debugger;
    // var relVel = AlienDestroyer.Util.scale(
    //   AlienDestroyer.Util.dir(this.vel),
    //   AlienDestroyer.Bullet.SPEED
    // );
    //
    // var bulletVel = [
    //   relVel[0] + this.vel[0], relVel[1] + this.vel[1]
    // ];

    var bullet = new AlienDestroyer.Bullet({
      pos: this.pos.slice(),
      color: this.color,
      game: this.game,
      vel: [0, -15]
    });
    this.game.addBullet(bullet);
  };

  Ship.prototype.power = function (impulse) {

    if(impulse[1] !== 0) {
      this.moves.push([0,5 * impulse[1]]);
    } else {
      this.moves.push([5*impulse[0], 0]);
    }
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
