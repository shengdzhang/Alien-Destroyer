(function () {
  if (typeof AlienDestroyer === "undefined") {
    window.AlienDestroyer = {};
  }

  var Aliens = AlienDestroyer.Aliens = function (pos, game) {
    this.pos = pos;
    this.vel = AlienDestroyer.Util.randomAlienVec((Math.random() * Aliens.SPEED)+ 2);
    this.radius = Math.random() * Aliens.RADIUS + 10;
    this.color = Aliens.COLOR;
    this.game = game;
    this.moveCount = 0;
  };

  Aliens.COLOR = "#248424";
  Aliens.RADIUS = 3;
  Aliens.SPEED = 2;

  AlienDestroyer.Util.inherits(Aliens, AlienDestroyer.MovingObject);

})();
