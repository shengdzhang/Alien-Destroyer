(function () {
  if (typeof AlienDestroyer === "undefined") {
    window.AlienDestroyer = {};
  }

  FPS = 60;

  var GameView = AlienDestroyer.GameView = function (canvasEl) {
    var ctx = canvasEl.getContext("2d");
    this.game = new AlienDestroyer.Game(canvasEl.width, canvasEl.height);
    this.ctx = ctx;
    this.ship = this.game.returnShip();
    this.timerId = null;
 };

 GameView.prototype.start = function () {
   window.setInterval((function () {
     this.game.render(this.ctx);
     this.game.moveObjects();
     this.game.checkCollisions();
     this.game.incrementAliens(FPS);
   }).bind(this), 1000/FPS);

   this.bindKeyHandlers();
 };

 GameView.MOVES = {
  "w": [ 0, -1],
  "a": [-1,  0],
  "s": [ 0,  1],
  "d": [ 1,  0],
};

GameView.prototype.bindKeyHandlers = function () {
  var ship = this.ship;

  Object.keys(GameView.MOVES).forEach(function (k) {
    var move = GameView.MOVES[k];
    key(k, function () { ship.power(move); });
  });
  key("space", function () { ship.fireBullet() });
};

GameView.prototype.stop = function () {
  clearInterval(this.timerId);
};

})();
