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
    this.map = {};
  };

   GameView.prototype.start = function () {
    this.timerId = window.setInterval((function () {
      this.reset();
      this.game.render(this.ctx);
      this.game.handleKeys(this.map);
      this.game.moveObjects();
      this.game.setCooldowns(FPS);
      this.game.checkCollisions();
      this.game.incrementAliens(FPS);
      if(this.game.gameOver) {
        this.game.renderEnd(this.ctx);
        this.stop();
      }
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
    onkeydown = onkeyup = function(e){
        e = e || event; // to deal with IE
        this.map[e.keyCode] = e.type == 'keydown';
        /*insert conditional here*/
    }.bind(this)
  };

  GameView.prototype.stop = function () {
    clearInterval(this.timerId);
  };

  GameView.prototype.reset = function () {
    this.ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
  }

  GameView.prototype.filler = function () {
    this.game.fill(this.ctx);
  }

})();
