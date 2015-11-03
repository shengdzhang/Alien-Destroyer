(function () {
  if (typeof AlienDestroyer === "undefined") {
    window.AlienDestroyer = {};
  }

  var Ship = AlienDestroyer.Ship = function (options) {
    options.radius = Ship.RADIUS;
    options.color = "#00C";
    options.pos = [400,585];
    AlienDestroyer.MovingObject.call(this, options);
    this.moves = [];
  };

  Ship.RADIUS = 15;
  Util.inherits(Ship, AlienDestroyer.MovingObject);

  Ship.prototype.move = function () {
    if(this.moves.length !== 0) {
      // debugger;
      var move = this.moves.shift();
      for(var i = 0; i < this.moves.length; i++) {
        move[0] += this.moves[i][0];
        move[1] += this.moves[i][1];
      }
      this.moves = [];
      this.pos[1] += move[1];
      this.pos[0] += move[0];
      this.setBounds();
    }
  };

  Ship.prototype.fireBullet = function () {
    // var norm = Util.norm(this.vel);
    // debugger;
    // var relVel = Util.scale(
    //   Util.dir(this.vel),
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
