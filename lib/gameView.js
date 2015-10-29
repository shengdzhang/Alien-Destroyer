(function () {
  if (typeof AlienDestroyer === "undefined") {
    window.AlienDestroyer = {};
  }

  FPS = 60;

  var GameView = AlienDestroyer.GameView = function (canvasEl) {
    var ctx = canvasEl.getContext("2d");
    this.game = new AlienDestroyer.Game(canvasEl.width, canvasEl.height);
    this.ctx = ctx;
 };

 GameView.prototype.start = function () {
   window.setInterval((function () {
     this.game.render(this.ctx);
     this.game.moveObjects();
     this.game.checkCollisions();
     this.game.incrementAliens(FPS);
   }).bind(this), 1000/FPS);
 }

})();
