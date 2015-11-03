(function () {
  if (typeof AlienDestroyer === "undefined") {
    window.AlienDestroyer = {};
  }

  var Aliens = AlienDestroyer.Aliens = function (options) {
    options.vel = Util.randomAlienVec((Math.random() * Aliens.SPEED)+ 2);
    options.radius = Math.random() * Aliens.RADIUS + 10;
    options.color = Aliens.COLOR;
    AlienDestroyer.MovingObject.call(this, options);
  };

  Aliens.COLOR = "#248424";
  Aliens.RADIUS = 3;
  Aliens.SPEED = 2;

  Util.inherits(Aliens, AlienDestroyer.MovingObject);

})();
